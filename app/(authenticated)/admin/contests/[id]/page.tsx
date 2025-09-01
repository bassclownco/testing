import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Edit, Play, Pause, Trophy, Users, Clock, DollarSign, Eye } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock contest data
const contestData = {
  id: '1',
  title: 'Bass Fishing Championship',
  description: 'Create an exciting video showcasing your best bass fishing techniques and catches. Show us your skills and passion for bass fishing!',
  type: 'Video Contest',
  status: 'active',
  startDate: '2024-01-15',
  endDate: '2024-02-15',
  brand: 'Bass Masters',
  category: 'Bass Fishing',
  prizePool: 2500,
  maxParticipants: 100,
  currentParticipants: 45,
  applications: 45,
  submissions: 23,
  judging: {
    method: 'Expert Panel',
    criteria: 'Technical skill, creativity, entertainment value, and educational content',
    deadline: '2024-02-20',
  },
  settings: {
    public: true,
    requireApplication: true,
    autoApprove: false,
    emailNotifications: true,
  },
  stats: {
    views: 12500,
    likes: 890,
    shares: 234,
  },
};

export default async function ContestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const contest = contestData; // In a real app, fetch by id

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'judging': return 'secondary';
      case 'completed': return 'outline';
      case 'draft': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/contests">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contests
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{contest.title}</h1>
            <p className="text-gray-600 mt-1">{contest.brand} • {contest.category}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Contest
          </Button>
          <Button variant="outline" size="sm">
            {contest.status === 'active' ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {contest.status === 'active' ? 'Pause' : 'Activate'}
          </Button>
        </div>
      </div>

      {/* Contest Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contest Overview</CardTitle>
            <Badge variant={getStatusColor(contest.status)} className="w-fit">
              {contest.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{contest.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Contest Type</p>
                <p className="text-lg">{contest.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-lg">{contest.startDate} - {contest.endDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Judging Method</p>
                <p className="text-lg">{contest.judging.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Judging Deadline</p>
                <p className="text-lg">{contest.judging.deadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${contest.prizePool.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contest.currentParticipants}</div>
              <p className="text-xs text-muted-foreground">of {contest.maxParticipants} max</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contest.submissions}</div>
              <p className="text-xs text-muted-foreground">of {contest.applications} applied</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">days left</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contest Management Tabs */}
      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="judging">Judging</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contest Applications</CardTitle>
              <CardDescription>
                Manage user applications for this contest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Applications management interface would go here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Features: Review applications, approve/reject, send notifications
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contest Submissions</CardTitle>
              <CardDescription>
                View and manage all contest submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Submissions management interface would go here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Features: View submissions, download files, moderate content
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="judging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Judging Interface</CardTitle>
              <CardDescription>
                Manage the judging process and criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">Judging Criteria</h3>
                  <p className="text-blue-700 mt-1">{contest.judging.criteria}</p>
                </div>
                
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Judging interface would go here</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Features: Score submissions, add comments, rank entries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contest Results</CardTitle>
              <CardDescription>
                View and publish contest results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Results management interface would go here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Features: Select winners, publish results, distribute prizes
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 