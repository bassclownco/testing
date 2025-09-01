import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Shield, Ban, Mail, Phone, Calendar, Trophy, Award, Gift } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock data - in a real app, this would be fetched from your database
const userData = {
  id: '1',
  name: 'John Fisher',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  role: 'member',
  status: 'active',
  joinDate: '2024-01-15',
  lastLogin: '2024-01-20',
  avatar: null,
  bio: 'Passionate angler with 10+ years of fishing experience. Love competing in tournaments and sharing my catches with the community.',
  location: 'Austin, TX',
  preferences: {
    notifications: true,
    newsletter: true,
    publicProfile: true,
  },
  stats: {
    contestsEntered: 5,
    contestsWon: 2,
    pointsEarned: 1250,
    totalSubmissions: 12,
    giveawaysWon: 1,
  },
  activity: [
    {
      id: '1',
      type: 'contest_entry',
      title: 'Entered Bass Fishing Championship',
      date: '2024-01-20',
      status: 'completed',
    },
    {
      id: '2',
      type: 'contest_win',
      title: 'Won Video Review Contest',
      date: '2024-01-18',
      status: 'completed',
    },
    {
      id: '3',
      type: 'giveaway_entry',
      title: 'Entered Premium Rod Giveaway',
      date: '2024-01-17',
      status: 'pending',
    },
  ],
  contests: [
    {
      id: '1',
      title: 'Bass Fishing Championship',
      status: 'active',
      entryDate: '2024-01-20',
      submissionStatus: 'submitted',
    },
    {
      id: '2',
      title: 'Video Review Contest',
      status: 'completed',
      entryDate: '2024-01-15',
      submissionStatus: 'winner',
    },
  ],
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const user = userData; // In a real app, fetch by id

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Manage Permissions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-lg">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <Badge variant={getStatusColor(user.status)} className="mt-1">
                  {user.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {user.phone}
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                Joined {user.joinDate}
              </div>
              <div className="flex items-center text-sm">
                <Badge variant="outline">
                  {user.role}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">{user.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contests</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.contestsEntered}</div>
                <p className="text-xs text-muted-foreground">Entered</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wins</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.contestsWon}</div>
                <p className="text-xs text-muted-foreground">Won</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Points</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.pointsEarned}</div>
                <p className="text-xs text-muted-foreground">Earned</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="contests">Contests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>User{"'"}s latest actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.activity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'contest_win' ? 'bg-green-500' :
                      activity.type === 'contest_entry' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contest Participation</CardTitle>
              <CardDescription>All contests this user has entered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.contests.map((contest) => (
                  <div key={contest.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">{contest.title}</p>
                      <p className="text-sm text-gray-600">Entered: {contest.entryDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={contest.status === 'active' ? 'default' : 'secondary'}>
                        {contest.status}
                      </Badge>
                      <Badge variant={contest.submissionStatus === 'winner' ? 'default' : 'outline'}>
                        {contest.submissionStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>User{"'"}s account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive email updates about contests and activities</p>
                  </div>
                  <Badge variant={user.preferences.notifications ? 'default' : 'secondary'}>
                    {user.preferences.notifications ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-gray-600">Subscribe to newsletter and updates</p>
                  </div>
                  <Badge variant={user.preferences.newsletter ? 'default' : 'secondary'}>
                    {user.preferences.newsletter ? 'Subscribed' : 'Unsubscribed'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-gray-600">Make profile visible to other users</p>
                  </div>
                  <Badge variant={user.preferences.publicProfile ? 'default' : 'secondary'}>
                    {user.preferences.publicProfile ? 'Public' : 'Private'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 