'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Contest, ContestSubmissionValues } from '@/lib/types';
import ContestSubmissionForm from '@/components/contests/ContestSubmissionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  FileText, 
  AlertTriangle, 
  ArrowLeft,
  Loader2,
  CheckCircle,
  Upload
} from 'lucide-react';
import Link from 'next/link';

// Mock contest data - in real app would fetch from API
const mockContest: Contest = {
  id: '1',
  title: 'Ultimate Bass Fishing Challenge 2024',
  description: 'Show us your best bass fishing techniques and win amazing prizes! This contest is all about demonstrating skill, creativity, and passion for bass fishing.',
  shortDescription: 'Showcase your bass fishing skills in our biggest contest yet',
  image: '/images/contest-hero.jpg',
  prize: '$5,000 in premium fishing gear + featured video placement',
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-03-15T23:59:59Z',
  applicationDeadline: '2024-02-15T23:59:59Z',
  submissionDeadline: '2024-03-10T23:59:59Z',
  status: 'open',
  category: 'Video Contest',
  requirements: [
    'Must be 18+ years old',
    'Original content only',
    'Video must be 3-10 minutes long',
    'HD quality (1080p minimum)',
    'Must include clear audio'
  ],
  judges: ['John Fisher', 'Sarah Bass', 'Mike Angler'],
  maxParticipants: 100,
  currentParticipants: 45,
  rules: `Contest Rules and Regulations:

1. ELIGIBILITY
   - Open to all participants 18 years or older
   - Must be legal resident of participating countries
   - One entry per person

2. SUBMISSION REQUIREMENTS
   - Original video content only
   - All footage must be shot during contest period
   - No copyrighted music without proper licensing
   - Video must be 2-10 minutes in length
   - HD quality required (1080p minimum)

3. JUDGING CRITERIA
   - Technical skill and fishing technique (30%)
   - Video quality and production (25%)
   - Creativity and storytelling (25%)
   - Educational value (20%)

4. PRIZES
   - First Place: $2,000 in premium fishing gear
   - Second Place: $500 gift card
   - Third Place: $250 gift card
   - People's Choice: $100 gift card

5. RIGHTS AND USAGE
   - Bass Clown Co retains rights to use winning entries for promotional purposes
   - Participants retain original copyright of their work
   - By submitting, you grant Bass Clown Co license to use your content

6. DISQUALIFICATION
   - Plagiarism or stolen content
   - Violation of submission guidelines
   - Inappropriate or offensive content
   - Late submissions will not be accepted`,
  submissionGuidelines: `Video Submission Guidelines:

Technical Requirements:
• Format: MP4, MOV, or AVI
• Resolution: 1080p minimum (4K preferred)
• Frame Rate: 24fps, 30fps, or 60fps
• Audio: Clear, synchronized audio required
• Duration: 2-10 minutes
• File Size: Maximum 500MB

Content Requirements:
• Original footage shot during contest period
• Demonstrate bass fishing techniques or skills
• Include clear narration or captions
• Show respect for environment and fishing regulations
• Must be family-friendly content

Submission Process:
• Upload your video file using the form below
• Provide a compelling title and description
• Include relevant tags for discoverability
• Add any additional notes for judges
• Confirm submission before deadline`,
  createdBy: 'admin-id',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

export default function ContestSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [hasExistingSubmission, setHasExistingSubmission] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    canSubmit: boolean;
    submission?: {
      title: string;
      status: string;
      createdAt: string;
    };
  } | null>(null);

  useEffect(() => {
    const fetchContestAndStatus = async () => {
      setLoading(true);
      try {
        // Fetch contest details
        const contestResponse = await fetch(`/api/contests/${params.id}`);
        if (contestResponse.ok) {
          const contestData = await contestResponse.json();
          setContest(contestData.data);
        } else {
          setContest(mockContest); // Fallback to mock data
        }

        // Fetch submission status
        const statusResponse = await fetch(`/api/contests/${params.id}/submit`);
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          setSubmissionStatus(statusData.data);
          setIsApproved(statusData.data.canSubmit);
          setHasExistingSubmission(!!statusData.data.submission);
        } else {
          // Mock status for demo
          setIsApproved(true);
          setHasExistingSubmission(false);
        }
      } catch (error) {
        console.error('Error fetching contest data:', error);
        setContest(mockContest); // Fallback to mock data
        setIsApproved(true); // Mock approval for demo
        setHasExistingSubmission(false);
      } finally {
        setLoading(false);
      }
    };

    fetchContestAndStatus();
  }, [params.id]);

  const uploadFile = async (file: File): Promise<string> => {
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (isVideo) {
      // Upload video using the video upload API
      const response = await fetch(`/api/upload/video?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload video');
      }
      
      const data = await response.json();
      return data.data.upload.url;
    } else if (isImage) {
      // Upload image using the image upload API
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }
      
      const data = await response.json();
      return data.data.url;
    } else {
      throw new Error('Unsupported file type. Please upload a video or image file.');
    }
  };

  const handleSubmissionSubmit = async (values: ContestSubmissionValues) => {
    try {
      if (!values.file) {
        throw new Error('Please select a file to upload');
      }

      // Show upload progress
      toast({
        title: "Uploading file...",
        description: "Please wait while we upload your submission",
      });

      // Upload the file first
      const fileUrl = await uploadFile(values.file);
      
      // Determine file type
      let fileType: 'video' | 'image' | 'document' = 'document';
      if (values.file.type.startsWith('video/')) {
        fileType = 'video';
      } else if (values.file.type.startsWith('image/')) {
        fileType = 'image';
      }

      // Submit the contest entry
      const submissionData = {
        title: values.title,
        description: values.description,
        fileUrl: fileUrl,
        fileType: fileType,
        tags: values.tags || '',
        additionalNotes: values.additionalNotes || ''
      };

      const response = await fetch(`/api/contests/${params.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit entry');
      }

      const data = await response.json();
      
      toast({
        title: "Success!",
        description: "Your submission has been uploaded successfully",
      });

      // Redirect to contest page or show success state
      router.push(`/contests/${params.id}`);
      
    } catch (error) {
      console.error('Submission upload failed:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload submission",
        variant: "destructive",
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading contest details...</span>
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contest Not Found</h1>
          <p className="text-gray-600 mb-4">The contest you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/contests">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contests
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const now = new Date();
  const submissionDeadline = new Date(contest.submissionDeadline);
  const isSubmissionOpen = now <= submissionDeadline && contest.status === 'open';

  if (hasExistingSubmission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href={`/contests/${contest.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contest
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <CardTitle className="text-green-700">Submission Already Submitted</CardTitle>
              </div>
              <CardDescription>
                You have already submitted an entry for this contest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionStatus?.submission && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Your Submission</h3>
                    <p className="text-gray-600">Title: {submissionStatus.submission.title}</p>
                    <p className="text-gray-600">Status: {submissionStatus.submission.status}</p>
                    <p className="text-gray-600">
                      Submitted: {new Date(submissionStatus.submission.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link href="/dashboard/contests">View My Submissions</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/contests/${contest.id}`}>Back to Contest</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href={`/contests/${contest.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contest
              </Link>
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You need an approved application to submit content for this contest. 
              Please apply for the contest first.
            </AlertDescription>
          </Alert>

          <div className="mt-6">
            <Button asChild>
              <Link href={`/contests/${contest.id}/apply`}>
                Apply for Contest
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isSubmissionOpen) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href={`/contests/${contest.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contest
              </Link>
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {now > submissionDeadline 
                ? 'The submission deadline has passed for this contest.'
                : 'This contest is not currently accepting submissions.'
              }
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href={`/contests/${contest.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contest
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Entry</h1>
              <p className="text-gray-600">Contest: {contest.title}</p>
            </div>
            <Badge variant="secondary">
              <Clock className="w-4 h-4 mr-1" />
              {Math.ceil((submissionDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days left
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ContestSubmissionForm 
              contest={contest} 
              onSubmit={handleSubmissionSubmit}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contest Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Contest Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Prize</h4>
                  <p className="text-gray-600">{contest.prize}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Submission Deadline</h4>
                  <p className="text-gray-600">
                    {new Date(contest.submissionDeadline).toLocaleDateString()}
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Participants</h4>
                  <p className="text-gray-600">
                    {contest.currentParticipants} / {contest.maxParticipants}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Judging Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Judging Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Technical Skill</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Video Quality</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Creativity</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Educational Value</span>
                    <span className="font-semibold">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Ensure good lighting and audio quality</li>
                  <li>• Keep file size under 500MB</li>
                  <li>• Use MP4 format for best compatibility</li>
                  <li>• Test your video before uploading</li>
                  <li>• Include clear narration or captions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
