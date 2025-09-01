'use client';

import { useState, useEffect } from 'react';
import { Contest, ContestApplication, ContestSubmission } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ContestStatusCard from '@/components/contests/ContestStatusCard';
import { Search, Trophy, Calendar, Clock, FileText, Plus, Filter } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

// Mock data - In a real app, this would come from an API
const mockContests: Contest[] = [
  {
    id: '1',
    title: 'Best Bass Fishing Video 2024',
    description: 'Show us your best bass fishing skills in this exciting video contest.',
    shortDescription: 'Submit your best bass fishing video for a chance to win premium fishing gear worth $2,000',
    image: '/images/video-review-thumb-1.jpg',
    prize: '$2,000 in Fishing Gear',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    applicationDeadline: '2024-02-15',
    submissionDeadline: '2024-03-15',
    status: 'open',
    category: 'Video Production',
    requirements: ['Original video content only', 'HD quality (1080p+)', 'Bass fishing focused'],
    judges: ['John Fisher', 'Sarah Bass', 'Mike Angler'],
    maxParticipants: 100,
    currentParticipants: 45,
    rules: 'Contest rules and regulations...',
    submissionGuidelines: 'Submission guidelines...',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Photography Contest: Fishing Moments',
    description: 'Capture the perfect fishing moment in this photography contest.',
    shortDescription: 'Capture the perfect fishing moment and win professional photography equipment',
    image: '/images/assets/bass-taking-picture.svg',
    prize: '$1,500 Photography Equipment',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    applicationDeadline: '2024-03-01',
    submissionDeadline: '2024-04-15',
    status: 'judging',
    category: 'Photography',
    requirements: ['Original photography only', 'Fishing-related subject matter', 'High resolution'],
    judges: ['Emma Photo', 'David Lens', 'Lisa Capture'],
    maxParticipants: 75,
    currentParticipants: 23,
    rules: 'Photography contest rules...',
    submissionGuidelines: 'Photography submission guidelines...',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Fishing Tutorial Challenge',
    description: 'Create an educational fishing tutorial.',
    shortDescription: 'Create educational fishing content and win cash prizes',
    image: '/images/assets/bass-fish-illustration.svg',
    prize: '$1,000 Cash Prize',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    applicationDeadline: '2024-04-01',
    submissionDeadline: '2024-05-15',
    status: 'completed',
    category: 'Education',
    requirements: ['Educational content focus', 'Clear instruction', 'Original content'],
    judges: ['Tom Teach', 'Rachel Guide', 'Steve Mentor'],
    maxParticipants: 50,
    currentParticipants: 12,
    rules: 'Educational contest rules...',
    submissionGuidelines: 'Educational submission guidelines...',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  }
];

const mockApplications: ContestApplication[] = [
  {
    id: 'app-1',
    contestId: '1',
    userId: '1',
    userEmail: 'john@example.com',
    userName: 'John Fisher',
    applicationDate: '2024-01-15T10:00:00Z',
    status: 'approved',
    responses: {
      experience: 'I have been fishing for over 10 years and have experience in video production...',
      motivation: 'I want to share my passion for bass fishing with others...',
      equipment: 'Sony FX3 camera, underwater housing, drone...',
      availability: 'Available weekends and evenings...'
    },
    reviewedBy: 'Admin',
    reviewedAt: '2024-01-17T14:30:00Z'
  },
  {
    id: 'app-2',
    contestId: '2',
    userId: '1',
    userEmail: 'john@example.com',
    userName: 'John Fisher',
    applicationDate: '2024-02-10T09:00:00Z',
    status: 'pending',
    responses: {
      experience: 'Professional photographer with 5 years experience...',
      motivation: 'Photography is my passion and I love the outdoors...',
      equipment: 'Canon EOS R5, various lenses, underwater housing...',
      availability: 'Flexible schedule, can travel...'
    }
  },
  {
    id: 'app-3',
    contestId: '3',
    userId: '1',
    userEmail: 'john@example.com',
    userName: 'John Fisher',
    applicationDate: '2024-03-05T16:00:00Z',
    status: 'rejected',
    responses: {
      experience: 'Basic fishing knowledge...',
      motivation: 'Want to try something new...',
      equipment: 'Basic camera setup...',
      availability: 'Limited availability...'
    },
    rejectionReason: 'Insufficient experience for educational content creation',
    reviewedBy: 'Admin',
    reviewedAt: '2024-03-07T11:00:00Z'
  }
];

const mockSubmissions: ContestSubmission[] = [
  {
    id: 'sub-1',
    contestId: '1',
    applicationId: 'app-1',
    userId: '1',
    title: 'Epic Bass Fishing Adventure',
    description: 'Join me on an exciting bass fishing trip where I demonstrate advanced techniques...',
    fileUrl: '/videos/bass-fishing-adventure.mp4',
    fileType: 'video',
    submissionDate: '2024-02-20T12:00:00Z',
    status: 'under_review',
    reviewedBy: 'Judge Panel',
    reviewedAt: '2024-02-21T10:00:00Z'
  },
  {
    id: 'sub-2',
    contestId: '2',
    applicationId: 'app-2',
    userId: '1',
    title: 'Golden Hour Bass',
    description: 'A stunning photograph of a bass caught during golden hour...',
    fileUrl: '/images/golden-hour-bass.jpg',
    fileType: 'image',
    submissionDate: '2024-03-10T08:00:00Z',
    status: 'approved',
    score: 85,
    feedback: 'Excellent composition and lighting. Great capture of the moment.',
    reviewedBy: 'Photography Judge',
    reviewedAt: '2024-03-12T15:00:00Z'
  }
];

export default function MyContestsPage() {
  const { user } = useAuth();
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [applications, setApplications] = useState<ContestApplication[]>(mockApplications);
  const [submissions, setSubmissions] = useState<ContestSubmission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Filter contests based on user's applications
  const userContests = contests.filter(contest => 
    applications.some(app => app.contestId === contest.id)
  );

  const filteredContests = userContests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    
    const userApp = applications.find(app => app.contestId === contest.id);
    return matchesSearch && userApp?.status === statusFilter;
  });

  const getApplicationForContest = (contestId: string) => {
    return applications.find(app => app.contestId === contestId);
  };

  const getSubmissionForContest = (contestId: string) => {
    return submissions.find(sub => sub.contestId === contestId);
  };

  const getContestCounts = () => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      submitted: submissions.length,
    };
  };

  const counts = getContestCounts();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Contests</h1>
            <p className="text-gray-400">
              Track your contest applications, submissions, and results
            </p>
          </div>
          <Button asChild>
            <Link href="/contests">
              <Plus className="w-4 h-4 mr-2" />
              Browse Contests
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-[#2D2D2D] border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{counts.total}</div>
                <div className="text-sm text-gray-400">Total Applications</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#2D2D2D] border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{counts.pending}</div>
                <div className="text-sm text-gray-400">Pending Review</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#2D2D2D] border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{counts.approved}</div>
                <div className="text-sm text-gray-400">Approved</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#2D2D2D] border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{counts.rejected}</div>
                <div className="text-sm text-gray-400">Rejected</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#2D2D2D] border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{counts.submitted}</div>
                <div className="text-sm text-gray-400">Submissions</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#2D2D2D] border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-[#2D2D2D] border-gray-700 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D2D] border-gray-700">
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#2D2D2D]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications ({counts.total})</TabsTrigger>
            <TabsTrigger value="submissions">Submissions ({counts.submitted})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {filteredContests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContests.map(contest => {
                  const application = getApplicationForContest(contest.id);
                  const submission = getSubmissionForContest(contest.id);
                  
                  return (
                    <Card key={contest.id} className="bg-[#2D2D2D] border-gray-700 hover:bg-[#3D3D3D] transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white">{contest.title}</CardTitle>
                            <CardDescription className="text-gray-400">{contest.category}</CardDescription>
                          </div>
                          <Badge variant={contest.status === 'open' ? 'default' : 'secondary'}>
                            {contest.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Application Status</span>
                              <Badge variant={
                                application?.status === 'approved' ? 'default' :
                                application?.status === 'pending' ? 'secondary' : 'destructive'
                              }>
                                {application?.status || 'Not Applied'}
                              </Badge>
                            </div>
                            
                            {submission && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Submission Status</span>
                                <Badge variant={
                                  submission.status === 'approved' ? 'default' :
                                  submission.status === 'under_review' ? 'secondary' : 'outline'
                                }>
                                  {submission.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Ends {new Date(contest.endDate).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button asChild className="flex-1" variant="outline">
                              <Link href={`/contests/${contest.id}`}>
                                View Details
                              </Link>
                            </Button>
                            {application?.status === 'approved' && !submission && (
                              <Button asChild className="flex-1">
                                <Link href={`/contests/${contest.id}/submit`}>
                                  Submit Entry
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-[#2D2D2D] border-gray-700">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Contest Applications</h3>
                  <p className="text-gray-400 mb-4">
                    You haven&apos;t applied to any contests yet. Start by browsing available contests.
                  </p>
                  <Button asChild>
                    <Link href="/contests">Browse Contests</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map(application => {
                  const contest = contests.find(c => c.id === application.contestId);
                  if (!contest) return null;
                  
                  return (
                    <Card key={application.id} className="bg-[#2D2D2D] border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white">{contest.title}</CardTitle>
                            <CardDescription className="text-gray-400">
                              Applied on {new Date(application.applicationDate).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge variant={
                            application.status === 'approved' ? 'default' :
                            application.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {application.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Category:</span>
                              <span className="ml-2 text-white">{contest.category}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Prize:</span>
                              <span className="ml-2 text-white">{contest.prize}</span>
                            </div>
                          </div>
                          
                          {application.status === 'rejected' && application.rejectionReason && (
                            <div className="bg-red-900/20 border border-red-600 rounded-lg p-3">
                              <p className="text-sm text-red-400">
                                <strong>Rejection Reason:</strong> {application.rejectionReason}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button asChild variant="outline" className="flex-1">
                              <Link href={`/contests/${contest.id}`}>
                                View Contest
                              </Link>
                            </Button>
                            {application.status === 'approved' && (
                              <Button asChild className="flex-1">
                                <Link href={`/contests/${contest.id}/submit`}>
                                  Submit Entry
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-[#2D2D2D] border-gray-700">
                <CardContent className="p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Applications</h3>
                  <p className="text-gray-400">
                    Your contest applications will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            {submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map(submission => {
                  const contest = contests.find(c => c.id === submission.contestId);
                  if (!contest) return null;
                  
                  return (
                    <Card key={submission.id} className="bg-[#2D2D2D] border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white">{submission.title}</CardTitle>
                            <CardDescription className="text-gray-400">
                              For: {contest.title} • Submitted {new Date(submission.submissionDate).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge variant={
                            submission.status === 'approved' ? 'default' :
                            submission.status === 'under_review' ? 'secondary' : 'outline'
                          }>
                            {submission.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-300">{submission.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">File Type:</span>
                              <span className="ml-2 text-white capitalize">{submission.fileType}</span>
                            </div>
                            {submission.score && (
                              <div>
                                <span className="text-gray-400">Score:</span>
                                <span className="ml-2 text-white">{submission.score}/100</span>
                              </div>
                            )}
                          </div>
                          
                          {submission.feedback && (
                            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-3">
                              <p className="text-sm text-blue-400">
                                <strong>Judge Feedback:</strong> {submission.feedback}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button asChild variant="outline" className="flex-1">
                              <Link href={`/contests/${contest.id}`}>
                                View Contest
                              </Link>
                            </Button>
                            <Button variant="outline" className="flex-1">
                              View Submission
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-[#2D2D2D] border-gray-700">
                <CardContent className="p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Submissions</h3>
                  <p className="text-gray-400">
                    Your contest submissions will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 