import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { successResponse, validationErrorResponse, handleApiError } from '@/lib/api-response';
import { reportsService } from '@/lib/reports-service';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const generateReportSchema = z.object({
  type: z.string(),
  format: z.enum(['pdf', 'excel', 'csv']).optional().default('pdf'),
  dateRange: z.object({
    from: z.string().optional(),
    to: z.string().optional()
  }).optional(),
  filters: z.object({
    contestId: z.string().uuid().optional(),
    giveawayId: z.string().uuid().optional(),
    userRole: z.string().optional(),
    status: z.string().optional()
  }).optional()
})

// GET - Get generated reports list
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
    
    // For now, return empty list - reports would be stored in database in production
    // TODO: Implement report storage/retrieval from database
    return successResponse({
      reports: []
    }, 'Reports retrieved successfully')

  } catch (error) {
    return handleApiError(error)
  }
}

// POST - Generate a new report
export async function POST(request: NextRequest) {
  try {
    const adminUser = await requireAdmin(request)
    const body = await request.json()

    // Validate input
    const validation = generateReportSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error.flatten().fieldErrors)
    }

    const { type, format = 'pdf', dateRange, filters } = validation.data

    // Convert date strings to Date objects
    const reportFilters: any = {
      startDate: dateRange?.from ? new Date(dateRange.from) : undefined,
      endDate: dateRange?.to ? new Date(dateRange.to) : undefined,
      contestId: filters?.contestId,
      giveawayId: filters?.giveawayId,
      userRole: filters?.userRole,
      status: filters?.status
    }

    // Generate report using reports service
    const report = await reportsService.generateAdminReport(reportFilters, format as 'pdf' | 'excel')

    return successResponse({
      reportId: report.fileName.replace(/\.(pdf|excel|xlsx|csv)$/, ''),
      fileName: report.fileName,
      filePath: report.filePath,
      format,
      type,
      generatedAt: new Date().toISOString()
    }, 'Report generated successfully')

  } catch (error) {
    return handleApiError(error)
  }
}

async function generateReportAsync(reportId: string, data: GenerateReportData) {
  const reportIndex = reports.findIndex(r => r.id === reportId);
  if (reportIndex === -1) return;

  try {
    // Simulate report generation with progress updates
    for (let progress = 10; progress <= 90; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      reports[reportIndex].progress = progress;
    }

    // Generate actual report data
    const reportData = await generateReportData(data.type, data.dateRange, data.filters);

    // Simulate final processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mark as completed
    reports[reportIndex].status = 'completed';
    reports[reportIndex].progress = 100;
    reports[reportIndex].size = `${Math.round(Math.random() * 5 + 1)}MB`;
    reports[reportIndex].downloadUrl = `/api/admin/reports/${reportId}/download`;

  } catch (error) {
    console.error('Error generating report:', error);
    reports[reportIndex].status = 'failed';
  }
}

async function generateReportData(type: string, dateRange?: DateRange, filters?: ReportFilters) {
  const fromDate = dateRange?.from ? new Date(dateRange.from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const toDate = dateRange?.to ? new Date(dateRange.to) : new Date();

  const conditions = [
    gte(users.createdAt, fromDate),
    lte(users.createdAt, toDate)
  ];

  switch (type) {
    case 'user-analytics':
      return await generateUserAnalyticsReport(fromDate, toDate, filters);
    case 'contest-performance':
      return await generateContestPerformanceReport(fromDate, toDate, filters);
    case 'financial-summary':
      return await generateFinancialSummaryReport(fromDate, toDate, filters);
    case 'engagement-metrics':
      return await generateEngagementMetricsReport(fromDate, toDate, filters);
    case 'monthly-summary':
      return await generateMonthlySummaryReport(fromDate, toDate);
    case 'user-engagement':
      return await generateUserEngagementReport(fromDate, toDate);
    case 'contest-roi':
      return await generateContestROIReport(fromDate, toDate);
    case 'revenue-breakdown':
      return await generateRevenueBreakdownReport(fromDate, toDate);
    default:
      return await generateDefaultReport(fromDate, toDate);
  }
}

async function generateUserAnalyticsReport(fromDate: Date, toDate: Date, filters?: ReportFilters) {
  // ... (add implementation, using filters if provided)
  console.log('Generating user analytics report with filters:', filters);

  const userStats = await db.select({
    totalUsers: count(users.id),
    newUsers: count(sql<number>`CASE WHEN created_at >= ${fromDate} THEN 1 ELSE NULL END`),
    activeUsers: count(sql<number>`CASE WHEN last_login >= ${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)} THEN 1 ELSE NULL END`),
  }).from(users);

  const userRoles = await db.select({
    role: users.role,
    count: count(users.id)
  }).from(users).groupBy(users.role);

  return { userStats, userRoles };
}

async function generateContestPerformanceReport(fromDate: Date, toDate: Date, filters?: ReportFilters) {
  // ... (add implementation, using filters if provided)
  console.log('Generating contest performance report with filters:', filters);

  const contestStats = await db.select({
    totalContests: count(contests.id),
    activeContests: count(sql<number>`CASE WHEN status = 'active' THEN 1 ELSE NULL END`),
    completedContests: count(sql<number>`CASE WHEN status = 'completed' THEN 1 ELSE NULL END`),
  }).from(contests);

  const submissionsOverTime = await db.select({
    date: sql<string>`DATE_TRUNC('day', created_at)`,
    count: count(contestSubmissions.id)
  }).from(contestSubmissions)
    .where(and(gte(contestSubmissions.createdAt, fromDate), lte(contestSubmissions.createdAt, toDate)))
    .groupBy(sql`DATE_TRUNC('day', created_at)`)
    .orderBy(desc(sql`DATE_TRUNC('day', created_at)`));

  return { contestStats, submissionsOverTime };
}

async function generateFinancialSummaryReport(fromDate: Date, toDate: Date, filters?: ReportFilters) {
  // ... (add implementation, using filters if provided)
  console.log('Generating financial summary report with filters:', filters);

  const revenue = await db.select({
    totalRevenue: sql<number>`SUM(amount)`
  }).from(pointsTransactions)
    .where(and(
      eq(pointsTransactions.type, 'purchased'),
      gte(pointsTransactions.createdAt, fromDate),
      lte(pointsTransactions.createdAt, toDate)
    ));

  const prizePayouts = await db.select({
    totalPayouts: count(contests.id)
  }).from(contests)
    .where(and(
      eq(contests.status, 'completed'),
      gte(contests.endDate, fromDate),
      lte(contests.endDate, toDate)
    ));

  return { revenue, prizePayouts };
}

async function generateEngagementMetricsReport(fromDate: Date, toDate: Date, filters?: ReportFilters) {
  // ... (add implementation, using filters if provided)
  console.log('Generating engagement metrics report with filters:', filters);

  const contestSubmissionsCount = await db.select({
    count: count(contestSubmissions.id)
  }).from(contestSubmissions)
    .where(and(
      gte(contestSubmissions.createdAt, fromDate),
      lte(contestSubmissions.createdAt, toDate)
    ));

  const giveawayEntriesCount = await db.select({
    count: count(giveawayEntries.id)
  }).from(giveawayEntries)
    .where(and(
      gte(giveawayEntries.createdAt, fromDate),
      lte(giveawayEntries.createdAt, toDate)
    ));

  return { contestSubmissionsCount, giveawayEntriesCount };
}

async function generateMonthlySummaryReport(fromDate: Date, toDate: Date) {
  const userGrowth = await db
    .select({
      month: sql<string>`DATE_TRUNC('month', "created_at")`,
      count: count(users.id),
    })
    .from(users)
    .where(and(gte(users.createdAt, fromDate), lte(users.createdAt, toDate)))
    .groupBy(sql`DATE_TRUNC('month', "created_at")`);

  return { userGrowth };
}

async function generateUserEngagementReport(fromDate: Date, toDate: Date) {
  const userEngagement = await db
    .select({
      userId: users.id,
      submissions: count(contestSubmissions.id),
    })
    .from(users)
    .leftJoin(contestSubmissions, eq(users.id, contestSubmissions.userId))
    .where(and(gte(users.createdAt, fromDate), lte(users.createdAt, toDate)))
    .groupBy(users.id);

  return { userEngagement };
}

async function generateContestROIReport(fromDate: Date, toDate: Date) {
  const contestROI = await db
    .select({
      contestId: contests.id,
      revenue: sql<number>`SUM(amount)`,
      prize: contests.prize,
    })
    .from(contests)
    .leftJoin(
      pointsTransactions,
      eq(contests.id, sql`metadata->>'contestId'`)
    )
    .where(and(gte(contests.createdAt, fromDate), lte(contests.createdAt, toDate)))
    .groupBy(contests.id);
  return { contestROI };
}

async function generateRevenueBreakdownReport(fromDate: Date, toDate: Date) {
  const revenueBreakdown = await db
    .select({
      source: pointsTransactions.description,
      total: sql<number>`SUM(amount)`,
    })
    .from(pointsTransactions)
    .where(and(gte(pointsTransactions.createdAt, fromDate), lte(pointsTransactions.createdAt, toDate)))
    .groupBy(pointsTransactions.description);
  return { revenueBreakdown };
}

async function generateDefaultReport(fromDate: Date, toDate: Date) {
  return {
    message: 'This is a default report.',
    fromDate,
    toDate,
  };
}

function getReportTitle(type: string): string {
  switch (type) {
    case 'user-analytics':
      return 'User Analytics Report';
    case 'contest-performance':
      return 'Contest Performance Report';
    case 'financial-summary':
      return 'Financial Summary Report';
    case 'engagement-metrics':
      return 'Engagement Metrics Report';
    case 'monthly-summary':
      return 'Monthly Summary Report';
    case 'user-engagement':
      return 'User Engagement Report';
    case 'contest-roi':
      return 'Contest ROI Analysis';
    case 'revenue-breakdown':
      return 'Revenue Breakdown Report';
    case 'pdf':
      return 'PDF Report';
    case 'excel':
      return 'Excel Report';
    default:
      return 'Custom Report';
  }
}

function getReportDescription(type: string): string {
  switch (type) {
    case 'user-analytics':
      return 'Comprehensive analysis of user behavior and demographics';
    case 'contest-performance':
      return 'Performance metrics and statistics for contests';
    case 'financial-summary':
      return 'Financial overview including revenue and expenses';
    case 'engagement-metrics':
      return 'User engagement and interaction metrics';
    case 'monthly-summary':
      return 'Monthly summary of key platform metrics';
    case 'user-engagement':
      return 'Detailed user engagement analysis';
    case 'contest-roi':
      return 'Return on investment analysis for contests';
    case 'revenue-breakdown':
      return 'Detailed breakdown of revenue sources';
    case 'pdf':
      return 'PDF format report';
    case 'excel':
      return 'Excel format report';
    default:
      return 'Custom generated report';
  }
}

function getReportType(type: string): 'analytics' | 'financial' | 'user' | 'contest' | 'custom' {
  if (['user-analytics', 'contest-performance', 'engagement-metrics'].includes(type)) return 'analytics';
  if (['financial-summary', 'revenue-breakdown'].includes(type)) return 'financial';
  if (['user-engagement'].includes(type)) return 'user';
  if (['contest-roi'].includes(type)) return 'contest';
  return 'custom';
}
