import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db, giveaways, giveawayEntries, users, pointsTransactions } from '@/lib/db'
import { eq, count, and, desc, max } from 'drizzle-orm'
import { requireAuth } from '@/lib/auth'
import { successResponse, errorResponse, validationErrorResponse, notFoundResponse, handleApiError } from '@/lib/api-response'

export const dynamic = 'force-dynamic';

const giveawayEntrySchema = z.object({
  entryMethod: z.enum(['points', 'social_media', 'referral', 'newsletter']).optional(),
  socialProof: z.string().url().optional(), // URL for social media post
  referralCode: z.string().optional()
})

// POST - Enter giveaway
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: giveawayId } = await params
    const user = await requireAuth(request)
    const body = await request.json()

    // Validate input
    const validation = giveawayEntrySchema.safeParse(body)
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors
      return validationErrorResponse(errors)
    }

    const entryData = validation.data

    // Check if giveaway exists
    const [giveaway] = await db
      .select()
      .from(giveaways)
      .where(eq(giveaways.id, giveawayId))
      .limit(1)

    if (!giveaway) {
      return notFoundResponse('Giveaway not found')
    }

    // Check if giveaway is active and within entry period
    const now = new Date()
    if (giveaway.status !== 'active' || giveaway.startDate > now || giveaway.endDate <= now) {
      return errorResponse('Giveaway is not currently accepting entries', 400)
    }

    // Check if user has already entered
    const [existingEntry] = await db
      .select()
      .from(giveawayEntries)
      .where(and(
        eq(giveawayEntries.giveawayId, giveawayId),
        eq(giveawayEntries.userId, user.id)
      ))
      .limit(1)

    if (existingEntry) {
      return errorResponse('You have already entered this giveaway', 400)
    }

    // Check if giveaway has reached max entries
    if (giveaway.maxEntries) {
      const [currentEntries] = await db
        .select({ count: count() })
        .from(giveawayEntries)
        .where(eq(giveawayEntries.giveawayId, giveawayId))

      if (currentEntries.count >= giveaway.maxEntries) {
        return errorResponse('This giveaway has reached the maximum number of entries', 400)
      }
    }

    // Check if user has enough points (if entry requires points)
    const entryCost = 10 // Default entry cost, this could come from giveaway settings
    
    if (entryData.entryMethod === 'points') {
      // Get user's current points from database
      const [userData] = await db
        .select({ pointsBalance: users.pointsBalance })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1)

      if (!userData || (userData.pointsBalance || 0) < entryCost) {
        return errorResponse('Insufficient points to enter this giveaway', 400)
      }
    }

    // Get next entry number
    const [maxEntryNumber] = await db
      .select({ maxEntry: max(giveawayEntries.entryNumber) })
      .from(giveawayEntries)
      .where(eq(giveawayEntries.giveawayId, giveawayId))

    const nextEntryNumber = (maxEntryNumber.maxEntry || 0) + 1

    // Create entry
    const [newEntry] = await db
      .insert(giveawayEntries)
      .values({
        giveawayId,
        userId: user.id,
        entryNumber: nextEntryNumber,
        status: 'entered'
      })
      .returning({
        id: giveawayEntries.id,
        giveawayId: giveawayEntries.giveawayId,
        userId: giveawayEntries.userId,
        entryNumber: giveawayEntries.entryNumber,
        status: giveawayEntries.status,
        createdAt: giveawayEntries.createdAt
      })

    // If entry used points, deduct them and create transaction
    if (entryData.entryMethod === 'points') {
      // Get current points again for the update
      const [currentUser] = await db
        .select({ pointsBalance: users.pointsBalance })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1)

      if (currentUser) {
        await db
          .update(users)
          .set({ 
            pointsBalance: (currentUser.pointsBalance || 0) - entryCost,
            updatedAt: new Date()
          })
          .where(eq(users.id, user.id))

        // Create points transaction record
        await db
          .insert(pointsTransactions)
          .values({
            userId: user.id,
            type: 'spent',
            amount: -entryCost,
            description: `Giveaway entry: ${giveaway.title}`,
            referenceId: giveawayId,
            referenceType: 'giveaway'
          })
      }
    }

    return successResponse({
      entry: newEntry,
      giveaway: {
        id: giveaway.id,
        title: giveaway.title,
        endDate: giveaway.endDate
      },
      pointsDeducted: entryData.entryMethod === 'points' ? entryCost : 0
    }, 'Successfully entered giveaway')

  } catch (error) {
    return handleApiError(error)
  }
}

// GET - Get user's entry status
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: giveawayId } = await params
    const user = await requireAuth(request)

    // Check if giveaway exists
    const [giveaway] = await db
      .select({
        id: giveaways.id,
        title: giveaways.title,
        status: giveaways.status,
        startDate: giveaways.startDate,
        endDate: giveaways.endDate,
        maxEntries: giveaways.maxEntries
      })
      .from(giveaways)
      .where(eq(giveaways.id, giveawayId))
      .limit(1)

    if (!giveaway) {
      return notFoundResponse('Giveaway not found')
    }

    // Get user's entry if exists
    const [userEntry] = await db
      .select()
      .from(giveawayEntries)
      .where(and(
        eq(giveawayEntries.giveawayId, giveawayId),
        eq(giveawayEntries.userId, user.id)
      ))
      .limit(1)

    // Get total entries count
    const [totalEntries] = await db
      .select({ count: count() })
      .from(giveawayEntries)
      .where(eq(giveawayEntries.giveawayId, giveawayId))

    const now = new Date()
    const canEnter = !userEntry && 
                    giveaway.status === 'active' && 
                    giveaway.startDate <= now && 
                    giveaway.endDate > now &&
                    (!giveaway.maxEntries || totalEntries.count < giveaway.maxEntries)

    return successResponse({
      giveaway,
      userEntry: userEntry || null,
      canEnter,
      totalEntries: totalEntries.count,
      timeRemaining: giveaway.endDate > now ? giveaway.endDate.getTime() - now.getTime() : 0
    }, 'Entry status retrieved successfully')

  } catch (error) {
    return handleApiError(error)
  }
} 