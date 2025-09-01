import { db } from '@/lib/db';
import { w9Forms, w9FormSubmissions, w9FormVerifications, w9FormNotifications, users } from '@/lib/db/schema';
import { eq, and, gte, lte, desc, asc } from 'drizzle-orm';
import { EmailService } from '@/lib/email-service';
import crypto from 'crypto';

export interface W9FormData {
  // Business information
  businessName?: string;
  businessType: 'individual' | 'sole_proprietor' | 'partnership' | 'corporation' | 'llc' | 's_corp' | 'trust' | 'estate' | 'other';
  taxClassification?: string;
  payeeName: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Tax identification
  tinType: 'ssn' | 'ein';
  taxIdNumber: string;
  
  // Backup withholding
  isSubjectToBackupWithholding?: boolean;
  backupWithholdingReason?: string;
  
  // Certification
  isCertified: boolean;
  signature?: string; // base64 encoded signature
}

export interface W9FormSubmissionData {
  submissionType: 'contest_win' | 'giveaway_win' | 'payment_request';
  contextId?: string;
  prizeValue?: number;
}

export interface W9FormValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface W9VerificationRequest {
  w9FormId: string;
  verificationType: 'tin_match' | 'name_match' | 'address_verification';
  verificationProvider?: string;
}

export class W9FormService {
  private emailService: EmailService;
  private encryptionKey: string;

  constructor() {
    this.emailService = new EmailService();
    this.encryptionKey = process.env.W9_ENCRYPTION_KEY || 'default-key-change-in-production';
  }

  private encrypt(text: string): string {
    try {
      const algorithm = 'aes-256-cbc';
      const key = Buffer.from(this.encryptionKey.padEnd(32, '0').slice(0, 32));
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  private decrypt(encryptedText: string): string {
    try {
      const algorithm = 'aes-256-cbc';
      const key = Buffer.from(this.encryptionKey.padEnd(32, '0').slice(0, 32));
      const textParts = encryptedText.split(':');
      const iv = Buffer.from(textParts.shift()!, 'hex');
      const encryptedData = textParts.join(':');
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  // Create a new W9 form
  async createW9Form(
    userId: string,
    formData: W9FormData,
    contestId?: string,
    giveawayId?: string
  ): Promise<any> {
    try {
      // Encrypt sensitive data
      const encryptedTaxId = this.encrypt(formData.taxIdNumber);

      // Calculate expiration date (3 years from now)
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 3);

      const [w9Form] = await db.insert(w9Forms).values({
        userId,
        contestId,
        giveawayId,
        businessName: formData.businessName,
        businessType: formData.businessType,
        taxClassification: formData.taxClassification,
        payeeName: formData.payeeName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        tinType: formData.tinType,
        taxIdNumber: encryptedTaxId,
        isSubjectToBackupWithholding: formData.isSubjectToBackupWithholding || false,
        backupWithholdingReason: formData.backupWithholdingReason,
        isCertified: formData.isCertified,
        signature: formData.signature,
        certificationDate: formData.isCertified ? new Date() : null,
        status: 'draft',
        expirationDate,
        isValid: false
      }).returning();

      // Send notification about form creation
      await this.sendNotification(w9Form.id, userId, 'form_created', {
        subject: 'W9 Form Created',
        message: 'Your W9 form has been created and is ready for submission.'
      });

      return w9Form;
    } catch (error) {
      console.error('Error creating W9 form:', error);
      throw error;
    }
  }

  // Update an existing W9 form
  async updateW9Form(w9FormId: string, userId: string, formData: Partial<W9FormData>): Promise<any> {
    try {
      // Check if user owns the form
      const existingForm = await this.getW9FormById(w9FormId);
      if (!existingForm || existingForm.userId !== userId) {
        throw new Error('W9 form not found or access denied');
      }

      // Don't allow updates to submitted forms
      if (existingForm.status !== 'draft') {
        throw new Error('Cannot update submitted W9 form');
      }

      const updateData: any = { ...formData, updatedAt: new Date() };

      // Encrypt tax ID if provided
      if (formData.taxIdNumber) {
        updateData.taxIdNumber = this.encrypt(formData.taxIdNumber);
      }

      // Update certification date if form is being certified
      if (formData.isCertified && !existingForm.isCertified) {
        updateData.certificationDate = new Date();
      }

      const [updatedForm] = await db
        .update(w9Forms)
        .set(updateData)
        .where(eq(w9Forms.id, w9FormId))
        .returning();

      return updatedForm;
    } catch (error) {
      console.error('Error updating W9 form:', error);
      throw error;
    }
  }

  // Submit W9 form for review
  async submitW9Form(w9FormId: string, userId: string): Promise<any> {
    try {
      const form = await this.getW9FormById(w9FormId);
      if (!form || form.userId !== userId) {
        throw new Error('W9 form not found or access denied');
      }

      if (form.status !== 'draft') {
        throw new Error('W9 form has already been submitted');
      }

      // Validate form before submission
      const formData = this.decryptFormData(form);
      const validation = this.validateW9Form(formData);
      if (!validation.isValid) {
        throw new Error(`W9 form validation failed: ${validation.errors.join(', ')}`);
      }

      // Update form status
      const [submittedForm] = await db
        .update(w9Forms)
        .set({
          status: 'submitted',
          submittedAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(w9Forms.id, w9FormId))
        .returning();

      // Send notification about submission
      await this.sendNotification(w9FormId, userId, 'form_submitted', {
        subject: 'W9 Form Submitted',
        message: 'Your W9 form has been submitted for review. You will be notified once it has been processed.'
      });

      // Notify administrators
      await this.notifyAdministrators(w9FormId, 'form_submitted');

      // Start verification process
      await this.initiateVerification(w9FormId);

      return submittedForm;
    } catch (error) {
      console.error('Error submitting W9 form:', error);
      throw error;
    }
  }

  // Review W9 form (admin function)
  async reviewW9Form(
    w9FormId: string,
    reviewerId: string,
    action: 'approve' | 'reject',
    notes?: string
  ): Promise<any> {
    try {
      const form = await this.getW9FormById(w9FormId);
      if (!form) {
        throw new Error('W9 form not found');
      }

      if (form.status !== 'submitted') {
        throw new Error('W9 form is not in submitted status');
      }

      const newStatus = action === 'approve' ? 'approved' : 'rejected';
      const isValid = action === 'approve';

      const [reviewedForm] = await db
        .update(w9Forms)
        .set({
          status: newStatus,
          isValid,
          reviewedAt: new Date(),
          reviewedBy: reviewerId,
          reviewNotes: notes,
          lastVerifiedAt: action === 'approve' ? new Date() : null,
          updatedAt: new Date()
        })
        .where(eq(w9Forms.id, w9FormId))
        .returning();

      // Send notification to user
      const notificationType = action === 'approve' ? 'form_approved' : 'form_rejected';
      const subject = action === 'approve' ? 'W9 Form Approved' : 'W9 Form Rejected';
      const message = action === 'approve' 
        ? 'Your W9 form has been approved and is now valid for tax reporting purposes.'
        : `Your W9 form has been rejected. Reason: ${notes || 'Please review and resubmit.'}`;

      await this.sendNotification(w9FormId, form.userId, notificationType, {
        subject,
        message
      });

      return reviewedForm;
    } catch (error) {
      console.error('Error reviewing W9 form:', error);
      throw error;
    }
  }

  // Create W9 form submission record
  async createW9Submission(
    w9FormId: string,
    userId: string,
    submissionData: W9FormSubmissionData
  ): Promise<any> {
    try {
      // Verify W9 form is valid
      const form = await this.getW9FormById(w9FormId);
      if (!form || form.userId !== userId) {
        throw new Error('W9 form not found or access denied');
      }

      if (!form.isValid || form.status !== 'approved') {
        throw new Error('W9 form is not valid or approved');
      }

      // Create submission record
      const [submission] = await db.insert(w9FormSubmissions).values({
        w9FormId,
        userId,
        submissionType: submissionData.submissionType,
        contextId: submissionData.contextId,
        prizeValue: submissionData.prizeValue ? submissionData.prizeValue.toString() : null,
        needsReporting: submissionData.prizeValue ? submissionData.prizeValue >= 600 : false,
        reportingYear: new Date().getFullYear()
      }).returning();

      // Send notification
      await this.sendNotification(w9FormId, userId, 'submission_created', {
        subject: 'W9 Form Submission Created',
        message: 'Your W9 form submission has been recorded.'
      });

      // Schedule 1099 processing if needed
      if (submission.needsReporting) {
        await this.schedule1099Processing(submission.id);
      }

      return submission;
    } catch (error) {
      console.error('Error creating W9 submission:', error);
      throw error;
    }
  }

  // Get W9 form by ID
  async getW9FormById(w9FormId: string): Promise<any> {
    try {
      const [form] = await db.select().from(w9Forms).where(eq(w9Forms.id, w9FormId));
      return form;
    } catch (error) {
      console.error('Error getting W9 form:', error);
      throw error;
    }
  }

  // Get all W9 forms for a user
  async getUserW9Forms(userId: string): Promise<any[]> {
    try {
      const forms = await db.select().from(w9Forms).where(eq(w9Forms.userId, userId)).orderBy(desc(w9Forms.createdAt));
      return forms;
    } catch (error) {
      console.error('Error getting user W9 forms:', error);
      throw error;
    }
  }

  // Get valid W9 form for user
  async getValidW9Form(userId: string): Promise<any | null> {
    try {
      const [form] = await db
        .select()
        .from(w9Forms)
        .where(
          and(
            eq(w9Forms.userId, userId),
            eq(w9Forms.isValid, true),
            eq(w9Forms.status, 'approved'),
            gte(w9Forms.expirationDate, new Date())
          )
        )
        .orderBy(desc(w9Forms.lastVerifiedAt));

      return form || null;
    } catch (error) {
      console.error('Error getting valid W9 form:', error);
      throw error;
    }
  }

  // Check if W9 form is required for a user
  async checkW9Requirement(
    userId: string,
    submissionType: string,
    prizeValue?: number
  ): Promise<{ required: boolean; reason?: string; existingForm?: any }> {
    try {
      // W9 is required for prizes >= $600
      const required = prizeValue ? prizeValue >= 600 : false;
      
      if (!required) {
        return { required: false };
      }

      // Check if user has a valid W9 form
      const existingForm = await this.getValidW9Form(userId);
      
      if (existingForm) {
        return { required: false, existingForm };
      }

      return {
        required: true,
        reason: 'W9 form is required for prizes valued at $600 or more for tax reporting purposes.'
      };
    } catch (error) {
      console.error('Error checking W9 requirement:', error);
      throw error;
    }
  }

  // Validate W9 form data
  private validateW9Form(formData: W9FormData): W9FormValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!formData.payeeName?.trim()) {
      errors.push('Payee name is required');
    }

    if (!formData.address?.trim()) {
      errors.push('Address is required');
    }

    if (!formData.city?.trim()) {
      errors.push('City is required');
    }

    if (!formData.state?.trim()) {
      errors.push('State is required');
    }

    if (!formData.zipCode?.trim()) {
      errors.push('ZIP code is required');
    }

    if (!formData.taxIdNumber?.trim()) {
      errors.push('Tax ID number is required');
    }

    if (!formData.tinType) {
      errors.push('TIN type is required');
    }

    if (!formData.businessType) {
      errors.push('Business type is required');
    }

    if (!formData.isCertified) {
      errors.push('Form must be certified');
    }

    // Validate tax ID format
    if (formData.taxIdNumber) {
      const cleanTaxId = formData.taxIdNumber.replace(/\D/g, '');
      
      if (formData.tinType === 'ssn') {
        if (cleanTaxId.length !== 9) {
          errors.push('SSN must be 9 digits');
        }
      } else if (formData.tinType === 'ein') {
        if (cleanTaxId.length !== 9) {
          errors.push('EIN must be 9 digits');
        }
      }
    }

    // Validate ZIP code
    if (formData.zipCode) {
      const cleanZip = formData.zipCode.replace(/\D/g, '');
      if (cleanZip.length !== 5 && cleanZip.length !== 9) {
        errors.push('ZIP code must be 5 or 9 digits');
      }
    }

    // Business type specific validations
    if (formData.businessType === 'individual' && formData.businessName) {
      warnings.push('Business name is typically not needed for individual taxpayers');
    }

    if (formData.businessType !== 'individual' && !formData.businessName) {
      warnings.push('Business name is recommended for non-individual taxpayers');
    }

    // Backup withholding validation
    if (formData.isSubjectToBackupWithholding && !formData.backupWithholdingReason) {
      warnings.push('Backup withholding reason should be provided when applicable');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Decrypt form data for processing
  private decryptFormData(form: any): W9FormData {
    try {
      return {
        ...form,
        taxIdNumber: this.decrypt(form.taxIdNumber)
      };
    } catch (error) {
      console.error('Error decrypting form data:', error);
      throw new Error('Failed to decrypt form data');
    }
  }

  // Send notification to user
  private async sendNotification(
    w9FormId: string,
    userId: string,
    notificationType: string,
    content: { subject: string; message: string },
    metadata?: any
  ): Promise<void> {
    try {
      // Create notification record
      await db.insert(w9FormNotifications).values({
        w9FormId,
        userId,
        notificationType,
        subject: content.subject,
        message: content.message,
        metadata: metadata ? JSON.stringify(metadata) : null
      });

      // Get user details for email
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (user && user.email) {
        // Send email notification
        await this.emailService.sendNotification(user.id, 'w9_notification', {
          subject: content.subject,
          message: content.message,
          userName: user.name || undefined
        });

        // Update notification as sent
        await db
          .update(w9FormNotifications)
          .set({ 
            notificationStatus: 'sent', 
            sentAt: new Date() 
          })
          .where(
            and(
              eq(w9FormNotifications.w9FormId, w9FormId),
              eq(w9FormNotifications.userId, userId),
              eq(w9FormNotifications.notificationType, notificationType)
            )
          );
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      // Don't throw here to avoid breaking the main flow
    }
  }

  // Generate email template
  private generateEmailTemplate(message: string, firstName?: string): string {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Bass Clown Co - W9 Form Notification</h2>
          </div>
          
          ${firstName ? `<p>Hello ${firstName},</p>` : '<p>Hello,</p>'}
          
          <p>${message}</p>
          
          <p>If you have any questions, please contact our support team.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Best regards,<br>Bass Clown Co Team</p>
          </div>
        </body>
      </html>
    `;
  }

  // Notify administrators
  private async notifyAdministrators(w9FormId: string, eventType: string): Promise<void> {
    try {
      // Get admin users
      const adminUsers = await db.select().from(users).where(eq(users.role, 'admin'));
      
      for (const admin of adminUsers) {
        await this.sendNotification(
          w9FormId,
          admin.id,
          `admin_${eventType}`,
          {
            subject: `W9 Form ${eventType.replace('_', ' ')} - Admin Notification`,
            message: `A W9 form requires your attention. Form ID: ${w9FormId}`
          }
        );
      }
    } catch (error) {
      console.error('Error notifying administrators:', error);
    }
  }

  // Initiate verification process
  private async initiateVerification(w9FormId: string): Promise<void> {
    try {
      // For now, just create a verification record
      // In production, this would integrate with IRS TIN matching service
      await db.insert(w9FormVerifications).values({
        w9FormId,
        verificationType: 'tin_match',
        verificationProvider: 'internal',
        verificationResult: 'pending'
      });
    } catch (error) {
      console.error('Error initiating verification:', error);
    }
  }

  // Verify TIN with IRS (placeholder)
  private async verifyTIN(w9FormId: string): Promise<void> {
    try {
      // This would integrate with IRS TIN matching service
      // For now, we'll just mark as verified after basic validation
      
      const form = await this.getW9FormById(w9FormId);
      if (!form) {
        throw new Error('W9 form not found');
      }

      const formData = this.decryptFormData(form);
      const validation = this.validateW9Form(formData);
      
      const verificationResult = validation.isValid ? 'verified' : 'failed';
      
      await db
        .update(w9FormVerifications)
        .set({
          verificationResult,
          verificationData: JSON.stringify(validation),
          verifiedAt: new Date()
        })
        .where(eq(w9FormVerifications.w9FormId, w9FormId));

      // Update form status based on verification
      if (verificationResult === 'verified') {
        await db
          .update(w9Forms)
          .set({
            isValid: true,
            lastVerifiedAt: new Date(),
            updatedAt: new Date()
          })
          .where(eq(w9Forms.id, w9FormId));
      }
    } catch (error) {
      console.error('Error verifying TIN:', error);
    }
  }

  // Schedule 1099 processing
  private async schedule1099Processing(submissionId: string): Promise<void> {
    try {
      // Mark submission for 1099 processing
      await db
        .update(w9FormSubmissions)
        .set({
          needsReporting: true,
          reportingYear: new Date().getFullYear(),
          updatedAt: new Date()
        })
        .where(eq(w9FormSubmissions.id, submissionId));

      // In production, this would add to a job queue for year-end processing
      console.log(`Scheduled 1099 processing for submission ${submissionId}`);
    } catch (error) {
      console.error('Error scheduling 1099 processing:', error);
    }
  }

  // Get W9 submissions for reporting
  async getW9SubmissionsForReporting(year: number): Promise<any[]> {
    try {
      const submissions = await db
        .select()
        .from(w9FormSubmissions)
        .where(
          and(
            eq(w9FormSubmissions.needsReporting, true),
            eq(w9FormSubmissions.reportingYear, year),
            eq(w9FormSubmissions.form1099Sent, false)
          )
        )
        .orderBy(asc(w9FormSubmissions.createdAt));

      return submissions;
    } catch (error) {
      console.error('Error getting W9 submissions for reporting:', error);
      throw error;
    }
  }

  // Generate 1099 forms (placeholder)
  async generate1099Forms(year: number): Promise<{ processed: number; errors: string[] }> {
    try {
      const submissions = await this.getW9SubmissionsForReporting(year);
      const errors: string[] = [];
      let processed = 0;

      for (const submission of submissions) {
        try {
          // In production, this would generate actual 1099 forms
          // For now, just mark as processed
          await db
            .update(w9FormSubmissions)
            .set({
              form1099Sent: true,
              form1099SentAt: new Date(),
              updatedAt: new Date()
            })
            .where(eq(w9FormSubmissions.id, submission.id));

          processed++;
        } catch (error) {
          errors.push(`Error processing submission ${submission.id}: ${error}`);
        }
      }

      return { processed, errors };
    } catch (error) {
      console.error('Error generating 1099 forms:', error);
      throw error;
    }
  }

  // Get W9 statistics
  async getW9Statistics(): Promise<{
    totalForms: number;
    submittedForms: number;
    approvedForms: number;
    rejectedForms: number;
    expiredForms: number;
    pendingReview: number;
    submissionsRequiring1099: number;
  }> {
    try {
      const stats = {
        totalForms: 0,
        submittedForms: 0,
        approvedForms: 0,
        rejectedForms: 0,
        expiredForms: 0,
        pendingReview: 0,
        submissionsRequiring1099: 0
      };

      // This would be implemented with proper aggregation queries
      // For now, returning empty stats
      return stats;
    } catch (error) {
      console.error('Error getting W9 statistics:', error);
      throw error;
    }
  }
}

export const w9FormService = new W9FormService();
