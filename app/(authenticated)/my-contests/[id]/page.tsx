'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Contest, ContestApplication, ContestSubmission } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Trophy, 
  User, 
  FileText, 
  Upload, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Star,
  Download
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data
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
  status: 'judging',
  category: 'Video Production',
  requirements: [
    'Original video content only',
    'Minimum 2 minutes, maximum 10 minutes',
    'High definition (1080p or higher)',
    'Include brief description of technique or location',
    'Must demonstrate bass fishing skills'
  ],
  judges: ['John Fisher', 'Sarah Bass', 'Mike Angler'],
  maxParticipants: 100,
  currentParticipants: 45,
  rules: 'All content must be original and shot within the contest period.',
  submissionGuidelines: 'Upload your video in MP4 format, maximum 500MB.',
  createdBy: 'Bass Clown Co',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

const mockApplication: ContestApplication = {
  id: 'app-1',
  contestId: '1',
  userId: '1',
  userEmail: 'john@example.com',
  userName: 'John Fisher',
  applicationDate: '2024-01-15T10:00:00Z',
  status: 'approved',
  responses: {
    experience: 'I have been fishing for over 10 years and have experience in video production. I\'ve worked on several fishing documentaries and have a deep understanding of bass fishing techniques including topwater fishing, jigging, and spinnerbait techniques.',
    motivation: 'I want to share my passion for bass fishing with others and help educate new anglers about sustainable fishing practices. This contest provides a perfect platform to showcase advanced techniques while promoting conservation.',
    equipment: 'Sony FX3 camera with underwater housing, DJI Mini 3 Pro drone for aerial shots, Rode VideoMic Pro Plus for audio, various fishing gear including high-end bass fishing equipment.',
    availability: 'Available weekends and evenings throughout the contest period. Can travel within 200 miles for optimal fishing locations.',
    portfolio: 'https://youtube.com/johnfishervideos'
  },
  reviewedBy: 'Contest Admin',
  reviewedAt: '2024-01-17T14:30:00Z'
};

const mockSubmission: ContestSubmission = {
  id: 'sub-1',
  contestId: '1',
  applicationId: 'app-1',
  userId: '1',
  title: 'Epic Bass Fishing Adventure: Advanced Topwater Techniques',
  description: 'Join me on an exciting bass fishing trip where I demonstrate advanced topwater techniques during the golden hour. This video showcases three different topwater lures and explains when and how to use each one for maximum effectiveness. Shot at Lake Guntersville with stunning underwater footage.',
  fileUrl: '/videos/bass-fishing-adventure.mp4',
  fileType: 'video',
  submissionDate: '2024-02-20T12:00:00Z',
  status: 'under_review',
  reviewedBy: 'Judge Panel',
  reviewedAt: '2024-02-21T10:00:00Z'
};

export default function MyContestStatusPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [contest, setContest] = useState<Contest | null>(null);
  const [application, setApplication] = useState<ContestApplication | null>(null);
  const [submission, setSubmission] = useState<ContestSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API calls
      setTimeout(() => {
        setContest(mockContest);
        setApplication(mockApplication);
        setSubmission(mockSubmission);
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, [params.id]);

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

  if (!contest || !application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Contest or application not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'under_review':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressValue = () => {
    if (!application) return 0;
    if (application.status === 'rejected') return 100;
    if (application.status === 'pending') return 25;
    if (application.status === 'approved' && !submission) return 50;
    if (submission?.status === 'submitted') return 75;
    if (submission?.status === 'under_review') return 85;
    if (submission?.status === 'approved' || submission?.status === 'rejected') return 100;
    return 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <Button 
        asChild
        variant="outline" 
        className="mb-6"
      >
        <Link href="/my-contests">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to My Contests
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contest Header */}
          <Card>
            <CardContent className="p-0">
              <Image
                src={contest.image}
                alt={contest.title}
                width={800}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{contest.title}</h1>
                    <p className="text-gray-600">{contest.shortDescription}</p>
                  </div>
                  <Badge variant="outline">{contest.category}</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{contest.prize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Ends {new Date(contest.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Contest Progress</CardTitle>
              <CardDescription>
                Track your progress through the contest process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{getProgressValue()}%</span>
                  </div>
                  <Progress value={getProgressValue()} className="mb-4" />
                </div>

                <div className="space-y-4">
                  {/* Application Step */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Application Submitted</h4>
                      <p className="text-sm text-gray-600">
                        Applied on {new Date(application.applicationDate).toLocaleDateString()}
                      </p>
                      <Badge className="mt-1 bg-green-500 text-white">
                        {application.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Submission Step */}
                  {application.status === 'approved' && (
                    <div className="flex items-start gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        submission ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {submission ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Upload className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Content Submission</h4>
                        {submission ? (
                          <div>
                            <p className="text-sm text-gray-600">
                              Submitted on {new Date(submission.submissionDate).toLocaleDateString()}
                            </p>
                            <Badge className={`mt-1 ${getStatusColor(submission.status)} text-white`}>
                              {submission.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">
                            Ready to submit your content
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Judging Step */}
                  {submission && (
                    <div className="flex items-start gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        submission.status === 'approved' || submission.status === 'rejected' 
                          ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {submission.status === 'approved' || submission.status === 'rejected' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Judging & Review</h4>
                        {submission.status === 'approved' || submission.status === 'rejected' ? (
                          <div>
                            <p className="text-sm text-gray-600">
                              Reviewed on {submission.reviewedAt ? new Date(submission.reviewedAt).toLocaleDateString() : 'TBD'}
                            </p>
                            {submission.score && (
                              <div className="flex items-center gap-2 mt-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium">Score: {submission.score}/100</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">
                            Under review by judges
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Experience</h4>
                <p className="text-sm text-gray-700">{application.responses.experience}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Motivation</h4>
                <p className="text-sm text-gray-700">{application.responses.motivation}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Equipment</h4>
                <p className="text-sm text-gray-700">{application.responses.equipment}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Availability</h4>
                <p className="text-sm text-gray-700">{application.responses.availability}</p>
              </div>

              {application.responses.portfolio && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Portfolio</h4>
                    <a 
                      href={application.responses.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {application.responses.portfolio}
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Submission Details */}
          {submission && (
            <Card>
              <CardHeader>
                <CardTitle>Submission Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Title</h4>
                  <p className="text-sm text-gray-700">{submission.title}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-gray-700">{submission.description}</p>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium mb-1">File</h4>
                    <p className="text-sm text-gray-600">
                      {submission.fileType.toUpperCase()} • Submitted {new Date(submission.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                {submission.feedback && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Judge Feedback</h4>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">{submission.feedback}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href={`/contests/${contest.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Contest Details
                </Link>
              </Button>
              
              {application.status === 'approved' && !submission && (
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/contests/${contest.id}/submit`}>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Content
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/contests">
                  Browse More Contests
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Status Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Status Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Application Status</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(application.status)}
                  <span className="text-sm font-medium capitalize">{application.status}</span>
                </div>
              </div>
              
              {submission && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Submission Status</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <span className="text-sm font-medium">{submission.status.replace('_', ' ')}</span>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applied</span>
                  <span>{new Date(application.applicationDate).toLocaleDateString()}</span>
                </div>
                {application.reviewedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviewed</span>
                    <span>{new Date(application.reviewedAt).toLocaleDateString()}</span>
                  </div>
                )}
                {submission && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted</span>
                    <span>{new Date(submission.submissionDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Submission Deadline</span>
                <span>{new Date(contest.submissionDeadline).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contest Ends</span>
                <span>{new Date(contest.endDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 