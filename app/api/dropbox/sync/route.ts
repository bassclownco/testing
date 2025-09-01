import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse, handleApiError } from '@/lib/api-response';
import { createDropboxSyncService } from '@/lib/dropbox-sync';

const syncRequestSchema = z.object({
  accessToken: z.string().min(1, 'Access token is required'),
  clientId: z.string().min(1, 'Client ID is required'),
  clientSecret: z.string().min(1, 'Client secret is required'),
  refreshToken: z.string().optional(),
  syncPaths: z.array(z.string()).optional(),
  excludePatterns: z.array(z.string()).optional(),
  maxFileSize: z.number().optional(),
  allowedFileTypes: z.array(z.string()).optional()
});

export const dynamic = 'force-dynamic';

// POST - Start Dropbox sync
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();

    // Validate input
    const validation = syncRequestSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(errors);
    }

    const {
      accessToken,
      clientId,
      clientSecret,
      refreshToken,
      syncPaths,
      excludePatterns,
      maxFileSize,
      allowedFileTypes
    } = validation.data;

    // Create Dropbox sync service
    const dropboxService = createDropboxSyncService({
      accessToken,
      clientId,
      clientSecret,
      refreshToken
    });

    // Initialize sync settings
    await dropboxService.initializeSync(user.id, {
      syncPaths,
      excludePatterns,
      maxFileSize,
      allowedFileTypes
    });

    // Start full sync
    const jobId = await dropboxService.startFullSync(user.id);

    return successResponse({
      jobId,
      message: 'Dropbox sync started successfully'
    }, 'Sync initiated');

  } catch (error) {
    return handleApiError(error);
  }
}

// GET - Get sync status
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    
    // For demo purposes, we'll return mock data since we need actual Dropbox credentials
    const mockStatus = {
      isEnabled: false,
      lastSync: undefined,
      totalFiles: 0,
      syncedFiles: 0,
      pendingFiles: 0,
      errorFiles: 0
    };

    return successResponse(mockStatus, 'Sync status retrieved');

  } catch (error) {
    return handleApiError(error);
  }
} 