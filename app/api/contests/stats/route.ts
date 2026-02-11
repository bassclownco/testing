import { NextRequest } from 'next/server'
import { db, contests, contestApplications, contestSubmissions } from '@/lib/db'
import { eq, count, sql } from 'drizzle-orm'
import { requireAuth } from '@/lib/auth'
import { successResponse, handleApiError } from '@/lib/api-response'

export const dynamic = 'force-dynamic';

// GET - Get contest statistics
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    // Total contests
    const [totalContests] = await db
      .select({ count: count() })
      .from(contests)

    // Active contests
    const [activeContests] = await db
      .select({ count: count() })
      .from(contests)
      .where(eq(contests.status, 'open'))

    // Total applications
    const [totalApplications] = await db
      .select({ count: count() })
      .from(contestApplications)

    // Total submissions
    const [totalSubmissions] = await db
      .select({ count: count() })
      .from(contestSubmissions)

    return successResponse({
      totalContests: totalContests.count,
      activeContests: activeContests.count,
      totalApplications: totalApplications.count,
      totalSubmissions: totalSubmissions.count,
    }, 'Contest statistics retrieved successfully')

  } catch (error) {
    return handleApiError(error)
  }
}
