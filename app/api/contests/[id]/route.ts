import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db, contests, users, contestApplications, contestSubmissions } from '@/lib/db'
import { eq, count, and } from 'drizzle-orm'
import { requireAuth, requireAdmin } from '@/lib/auth'
import { successResponse, errorResponse, validationErrorResponse, notFoundResponse, handleApiError } from '@/lib/api-response'

const updateContestSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255, 'Title is too long').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  shortDescription: z.string().max(500, 'Short description is too long').optional(),
  image: z.string().url('Invalid image URL').optional(),
  prize: z.string().min(1, 'Prize is required').max(255, 'Prize description is too long').optional(),
  startDate: z.string().datetime('Invalid start date').optional(),
  endDate: z.string().datetime('Invalid end date').optional(),
  applicationDeadline: z.string().datetime('Invalid application deadline').optional(),
  submissionDeadline: z.string().datetime('Invalid submission deadline').optional(),
  status: z.enum(['draft', 'open', 'closed', 'judging', 'completed']).optional(),
  category: z.string().min(1, 'Category is required').max(100, 'Category is too long').optional(),
  requirements: z.array(z.string()).optional(),
  judges: z.array(z.string()).optional(),
  maxParticipants: z.number().int().positive('Max participants must be positive').optional(),
  rules: z.string().optional(),
  submissionGuidelines: z.string().optional()
})

export const dynamic = 'force-dynamic';

// GET - Get specific contest
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: contestId } = await params
    const user = await requireAuth(request)

    // Get contest with creator info
    const [contest] = await db
      .select({
        id: contests.id,
        title: contests.title,
        description: contests.description,
        shortDescription: contests.shortDescription,
        image: contests.image,
        prize: contests.prize,
        startDate: contests.startDate,
        endDate: contests.endDate,
        applicationDeadline: contests.applicationDeadline,
        submissionDeadline: contests.submissionDeadline,
        status: contests.status,
        category: contests.category,
        requirements: contests.requirements,
        judges: contests.judges,
        maxParticipants: contests.maxParticipants,
        currentParticipants: contests.currentParticipants,
        rules: contests.rules,
        submissionGuidelines: contests.submissionGuidelines,
        createdBy: contests.createdBy,
        createdAt: contests.createdAt,
        updatedAt: contests.updatedAt,
        creatorName: users.name
      })
      .from(contests)
      .leftJoin(users, eq(contests.createdBy, users.id))
      .where(eq(contests.id, contestId))
      .limit(1)

    if (!contest) {
      return notFoundResponse('Contest not found')
    }

    // Get application count
    const [applicationCount] = await db
      .select({ count: count() })
      .from(contestApplications)
      .where(eq(contestApplications.contestId, contestId))

    // Get submission count
    const [submissionCount] = await db
      .select({ count: count() })
      .from(contestSubmissions)
      .where(eq(contestSubmissions.contestId, contestId))

    // Check if user has applied
    const [userApplication] = await db
      .select()
      .from(contestApplications)
      .where(and(
        eq(contestApplications.contestId, contestId),
        eq(contestApplications.userId, user.id)
      ))
      .limit(1)

    const contestWithStats = {
      ...contest,
      stats: {
        applicationCount: applicationCount.count,
        submissionCount: submissionCount.count,
        userHasApplied: !!userApplication,
        userApplicationStatus: userApplication?.status || null
      }
    }

    return successResponse(contestWithStats, 'Contest retrieved successfully')

  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH - Update contest
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: contestId } = await params
    const user = await requireAdmin(request)
    const body = await request.json()

    // Validate input
    const validation = updateContestSchema.safeParse(body)
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors
      return validationErrorResponse(errors)
    }

    const updateData = validation.data

    // Check if contest exists
    const [existingContest] = await db
      .select()
      .from(contests)
      .where(eq(contests.id, contestId))
      .limit(1)

    if (!existingContest) {
      return notFoundResponse('Contest not found')
    }

    // Additional validation for date fields
    let processedUpdateData: any = { ...updateData }
    
    if (updateData.startDate || updateData.endDate || updateData.applicationDeadline || updateData.submissionDeadline) {
      const startDate = updateData.startDate ? new Date(updateData.startDate) : existingContest.startDate
      const endDate = updateData.endDate ? new Date(updateData.endDate) : existingContest.endDate
      const applicationDeadline = updateData.applicationDeadline ? new Date(updateData.applicationDeadline) : existingContest.applicationDeadline
      const submissionDeadline = updateData.submissionDeadline ? new Date(updateData.submissionDeadline) : existingContest.submissionDeadline

      if (startDate >= endDate) {
        return validationErrorResponse({ endDate: ['End date must be after start date'] })
      }

      if (applicationDeadline >= submissionDeadline) {
        return validationErrorResponse({ 
          submissionDeadline: ['Submission deadline must be after application deadline'] 
        })
      }

      if (submissionDeadline >= endDate) {
        return validationErrorResponse({ 
          submissionDeadline: ['Submission deadline must be before end date'] 
        })
      }

      // Convert dates to proper Date objects
      if (updateData.startDate) processedUpdateData.startDate = startDate
      if (updateData.endDate) processedUpdateData.endDate = endDate
      if (updateData.applicationDeadline) processedUpdateData.applicationDeadline = applicationDeadline
      if (updateData.submissionDeadline) processedUpdateData.submissionDeadline = submissionDeadline
    }

    // Update contest
    const [updatedContest] = await db
      .update(contests)
      .set({
        ...processedUpdateData,
        updatedAt: new Date()
      })
      .where(eq(contests.id, contestId))
      .returning()

    return successResponse(updatedContest, 'Contest updated successfully')

  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE - Delete contest
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: contestId } = await params
    const user = await requireAdmin(request)

    // Check if contest exists
    const [existingContest] = await db
      .select()
      .from(contests)
      .where(eq(contests.id, contestId))
      .limit(1)

    if (!existingContest) {
      return notFoundResponse('Contest not found')
    }

    // Check if contest has applications or submissions
    const [applicationCount] = await db
      .select({ count: count() })
      .from(contestApplications)
      .where(eq(contestApplications.contestId, contestId))

    if (applicationCount.count > 0) {
      return errorResponse('Cannot delete contest with existing applications', 400)
    }

    // Delete contest
    await db
      .delete(contests)
      .where(eq(contests.id, contestId))

    return successResponse(null, 'Contest deleted successfully')

  } catch (error) {
    return handleApiError(error)
  }
} 