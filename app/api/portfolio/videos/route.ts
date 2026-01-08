import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { portfolioVideos } from '@/lib/db/schema'
import { eq, desc, and, asc } from 'drizzle-orm'
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const published = searchParams.get('published') !== 'false' // default to true

    // Apply filters
    const conditions = []
    if (published) {
      conditions.push(eq(portfolioVideos.published, true))
    }
    if (featured) {
      conditions.push(eq(portfolioVideos.featured, true))
    }
    if (category) {
      conditions.push(eq(portfolioVideos.category, category))
    }

    let query = db.select().from(portfolioVideos)

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    // Order by featured order (for featured), then display order, then created date
    if (featured) {
      query = query.orderBy(
        asc(portfolioVideos.featuredOrder),
        asc(portfolioVideos.displayOrder),
        desc(portfolioVideos.createdAt)
      )
    } else {
      query = query.orderBy(
        asc(portfolioVideos.displayOrder),
        desc(portfolioVideos.createdAt)
      )
    }

    // Apply limit
    if (limit) {
      query = query.limit(limit)
    }

    const videos = await query

    return successResponse({ videos }, 'Portfolio videos fetched successfully')
  } catch (error) {
    return handleApiError(error)
  }
}

