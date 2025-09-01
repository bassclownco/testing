'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Contest, ContestApplicationValues } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import ContestApplicationForm from '@/components/contests/ContestApplicationForm';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Trophy, Calendar } from 'lucide-react';
import Link from 'next/link';

// Mock contest data
const mockContest: Contest = {
  id: '1',
  title: 'Best Bass Fishing Video 2024',
  description: 'Show us your best bass fishing skills in this exciting video contest. Submit your most impressive catch, technique demonstration, or fishing adventure. Winner gets premium fishing gear and equipment worth $2,000!',
  shortDescription: 'Submit your best bass fishing video for a chance to win premium fishing gear worth $2,000',
  image: '/images/video-review-thumb-1.jpg',
  prize: '$2,000 in Fishing Gear',
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  applicationDeadline: '2024-02-15',
  submissionDeadline: '2024-03-15',
  status: 'open',
  category: 'Video Production',
  requirements: [
    'Original video content only',
    'Minimum 2 minutes, maximum 10 minutes',
    'High definition (1080p or higher)',
    'Include brief description of technique or location',
    'Must demonstrate bass fishing skills',
    'No copyrighted music without permission',
    'Shot within the contest period'
  ],
  judges: ['John Fisher', 'Sarah Bass', 'Mike Angler'],
  maxParticipants: 100,
  currentParticipants: 45,
  rules: 'All content must be original and shot within the contest period. No copyrighted music without permission. Submissions will be judged on technique, creativity, and video quality.',
  submissionGuidelines: 'Upload your video in MP4 format, maximum 500MB. Include title, description, and location if applicable. Ensure video quality is HD (1080p minimum).',
  createdBy: 'Bass Clown Co',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

export default function ContestApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasExistingApplication, setHasExistingApplication] = useState(false);

  useEffect(() => {
    const fetchContest = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setContest(mockContest);
        // Check if user has already applied (mock check)
        setHasExistingApplication(false);
        setLoading(false);
      }, 500);
    };

    fetchContest();
  }, [params.id]);

  const handleApplicationSubmit = async (values: ContestApplicationValues) => {
    try {
      // Simulate API call to submit application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, would send to backend:
      // const response = await fetch(`/api/contests/${params.id}/applications`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...values, userId: user?.id })
      // });
      
      console.log('Application submitted:', values);
      
      // Success is handled by the form component
    } catch (error) {
      console.error('Application submission failed:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Contest not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const applicationDeadline = new Date(contest.applicationDeadline);
  const isDeadlinePassed = new Date() > applicationDeadline;
  const isContestFull = contest.currentParticipants >= contest.maxParticipants;

  if (hasExistingApplication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          asChild
          variant="outline" 
          className="mb-6"
        >
          <Link href={`/contests/${contest.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contest
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Application Already Submitted
            </CardTitle>
            <CardDescription>
              You have already submitted an application for this contest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your application for &quot;{contest.title}&quot; is currently under review. 
              You&apos;ll receive an email notification once your application has been reviewed.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href={`/contests/${contest.id}`}>
                  View Contest Details
                </Link>
              </Button>
              <Button asChild>
                <Link href="/my-contests">
                  View My Applications
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isDeadlinePassed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          asChild
          variant="outline" 
          className="mb-6"
        >
          <Link href={`/contests/${contest.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contest
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Application Deadline Passed
            </CardTitle>
            <CardDescription>
              The application deadline for this contest has passed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              The application deadline for &quot;{contest.title}&quot; was {applicationDeadline.toLocaleDateString()}. 
              Unfortunately, new applications are no longer being accepted.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href={`/contests/${contest.id}`}>
                  View Contest Details
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contests">
                  Browse Other Contests
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isContestFull) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          asChild
          variant="outline" 
          className="mb-6"
        >
          <Link href={`/contests/${contest.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contest
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="w-5 h-5" />
              Contest Full
            </CardTitle>
            <CardDescription>
              This contest has reached its maximum number of participants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              &quot;{contest.title}&quot; has reached its maximum capacity of {contest.maxParticipants} participants. 
              New applications are no longer being accepted.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href={`/contests/${contest.id}`}>
                  View Contest Details
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contests">
                  Browse Other Contests
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        asChild
        variant="outline" 
        className="mb-6"
      >
        <Link href={`/contests/${contest.id}`}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contest
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Application Form */}
        <div className="lg:col-span-2">
          <ContestApplicationForm 
            contest={contest}
            onSubmit={handleApplicationSubmit}
          />
        </div>

        {/* Sidebar with Contest Info */}
        <div className="space-y-6">
          {/* Contest Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{contest.title}</CardTitle>
              <CardDescription>
                {contest.shortDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Prize</p>
                  <p className="font-semibold">{contest.prize}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Application Deadline</p>
                  <p className="font-semibold">
                    {applicationDeadline.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Submission Deadline</p>
                  <p className="font-semibold">
                    {new Date(contest.submissionDeadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">{contest.category}</Badge>
                <Badge className="bg-green-500 text-white">
                  {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Application Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Application Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Be specific about your fishing experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Include links to your best work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Explain your motivation clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>List all relevant equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Double-check all information</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Review Process */}
          <Card>
            <CardHeader>
              <CardTitle>Review Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Submit Application</p>
                    <p className="text-gray-600">Complete and submit your application form</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Review (2-3 days)</p>
                    <p className="text-gray-600">Our team reviews your application</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Notification</p>
                    <p className="text-gray-600">Email notification of approval/rejection</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Start Creating</p>
                    <p className="text-gray-600">If approved, begin working on your submission</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 