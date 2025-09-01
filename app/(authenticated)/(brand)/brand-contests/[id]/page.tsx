'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Contest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Edit, 
  Eye, 
  Share2, 
  Download, 
  Calendar, 
  Users, 
  Trophy, 
  DollarSign,
  Clock,
  Star,
  FileText,
  Settings,
  BarChart3
} from 'lucide-react';

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
    'Must demonstrate bass fishing skills'
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

// Mock submissions data
const mockSubmissions = [
  {
    id: '1',
    contestId: '1',
    title: 'Epic Bass Catch at Lake Michigan',
    participant: 'John Doe',
    submittedAt: '2024-02-01T10:00:00Z',
    status: 'pending',
    rating: 0,
    fileUrl: '/videos/submission1.mp4',
    thumbnail: '/images/video-review-thumb-1.jpg'
  },
  {
    id: '2',
    contestId: '1',
    title: 'Perfect Technique Demo',
    participant: 'Jane Smith',
    submittedAt: '2024-02-02T14:30:00Z',
    status: 'reviewed',
    rating: 4.5,
    fileUrl: '/videos/submission2.mp4',
    thumbnail: '/images/video-review-thumb-1.jpg'
  }
];

export default function BrandContestDetailsPage() {
  const params = useParams();
  const contestId = params.id as string;
  const [contest, setContest] = useState<Contest | null>(mockContest);
  const [submissions] = useState(mockSubmissions);
  const [activeTab, setActiveTab] = useState('overview');

  if (!contest) {
    return <div>Contest not found</div>;
  }

  const participationRate = (contest.currentParticipants / contest.maxParticipants) * 100;
  const daysRemaining = Math.ceil((new Date(contest.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{contest.title}</h1>
            <p className="text-gray-600 mt-2">{contest.shortDescription}</p>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant={contest.status === 'open' ? 'default' : 'secondary'}>
                {contest.status}
              </Badge>
              <Badge variant="outline">{contest.category}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="text-2xl font-bold">{contest.currentParticipants}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <Progress value={participationRate} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">
                {contest.currentParticipants} of {contest.maxParticipants} max
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Days Remaining</p>
                  <p className="text-2xl font-bold">{daysRemaining}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Until {contest.endDate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Submissions</p>
                  <p className="text-2xl font-bold">{submissions.length}</p>
                </div>
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {submissions.filter(s => s.status === 'pending').length} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Prize Value</p>
                  <p className="text-2xl font-bold">{contest.prize}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="judging">Judging</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contest Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Description</h4>
                      <p className="text-gray-600">{contest.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Requirements</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {contest.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Contest Start</span>
                      <span className="font-semibold">{contest.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Application Deadline</span>
                      <span className="font-semibold">{contest.applicationDeadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Submission Deadline</span>
                      <span className="font-semibold">{contest.submissionDeadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Contest End</span>
                      <span className="font-semibold">{contest.endDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submissions ({submissions.length})</CardTitle>
                <CardDescription>
                  Review and manage contest submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={submission.thumbnail} 
                          alt={submission.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">{submission.title}</h4>
                          <p className="text-sm text-gray-600">by {submission.participant}</p>
                          <p className="text-xs text-gray-500">
                            Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={submission.status === 'pending' ? 'secondary' : 'default'}>
                          {submission.status}
                        </Badge>
                        {submission.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{submission.rating}</span>
                          </div>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Contest Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Detailed analytics and reporting coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Contest Settings</CardTitle>
                <CardDescription>Configure contest parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contest Settings</h3>
                  <p className="text-gray-600">Contest configuration options coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="judging">
            <Card>
              <CardHeader>
                <CardTitle>Judging Panel</CardTitle>
                <CardDescription>Manage judges and scoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Judges</h4>
                    <Button size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Add Judge
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contest.judges.map((judge, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h5 className="font-semibold">{judge}</h5>
                            <p className="text-sm text-gray-600">Judge</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center py-4">
                    <Button variant="outline" asChild>
                      <a href={`/brand/brand-contests/${contestId}/judge`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Open Judging Interface
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 