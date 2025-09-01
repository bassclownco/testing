import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, Clock, Star, Users, UserCheck } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Mock data for creator applications
const creatorApplications = [
  {
    id: '1',
    name: 'Emily Waters',
    email: 'emily@example.com',
    appliedDate: '2024-01-20',
    status: 'pending',
    followers: 12500,
    platform: 'YouTube',
    experience: '3 years',
    portfolio: 'https://youtube.com/emilywatersf',
    specialties: ['Bass Fishing', 'Fly Fishing'],
  },
  {
    id: '2',
    name: 'Jake Rivers',
    email: 'jake@example.com',
    appliedDate: '2024-01-19',
    status: 'under_review',
    followers: 8900,
    platform: 'Instagram',
    experience: '2 years',
    portfolio: 'https://instagram.com/jakerivesf',
    specialties: ['Tournament Fishing', 'Gear Reviews'],
  },
  {
    id: '3',
    name: 'Sarah Lakeside',
    email: 'sarah@example.com',
    appliedDate: '2024-01-18',
    status: 'approved',
    followers: 25000,
    platform: 'TikTok',
    experience: '5 years',
    portfolio: 'https://tiktok.com/@sarahlakeside',
    specialties: ['Ice Fishing', 'Beginner Tips'],
  },
];

// Mock data for approved creators
const approvedCreators = [
  {
    id: '1',
    name: 'Mike Professional',
    email: 'mike@example.com',
    joinDate: '2024-01-10',
    status: 'active',
    followers: 45000,
    platform: 'YouTube',
    contestsParticipated: 15,
    avgRating: 4.8,
    totalEarnings: 2500,
    specialties: ['Bass Fishing', 'Tournament Prep'],
  },
  {
    id: '2',
    name: 'Lisa Expert',
    email: 'lisa@example.com',
    joinDate: '2024-01-05',
    status: 'active',
    followers: 32000,
    platform: 'Instagram',
    contestsParticipated: 12,
    avgRating: 4.9,
    totalEarnings: 1800,
    specialties: ['Fly Fishing', 'Photography'],
  },
];

export default function CreatorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Creator Management</h1>
          <p className="text-gray-600 mt-1">Manage creator applications and approved creators</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Creator
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
            <p className="text-xs text-muted-foreground">85% active rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Applications and Approved Creators */}
      <Tabs defaultValue="applications" className="w-full">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="approved">Approved Creators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Creator Applications</CardTitle>
              <CardDescription>Review and approve new creator applications</CardDescription>
              <div className="flex items-center space-x-2 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search applications..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creatorApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.name}</TableCell>
                      <TableCell>{application.platform}</TableCell>
                      <TableCell>{application.followers.toLocaleString()}</TableCell>
                      <TableCell>{application.experience}</TableCell>
                      <TableCell>{application.appliedDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            application.status === 'approved' ? 'default' : 
                            application.status === 'pending' ? 'secondary' : 'outline'
                          }
                        >
                          {application.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Creators</CardTitle>
              <CardDescription>Manage your approved creator network</CardDescription>
              <div className="flex items-center space-x-2 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search creators..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Contests</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedCreators.map((creator) => (
                    <TableRow key={creator.id}>
                      <TableCell className="font-medium">{creator.name}</TableCell>
                      <TableCell>{creator.platform}</TableCell>
                      <TableCell>{creator.followers.toLocaleString()}</TableCell>
                      <TableCell>{creator.contestsParticipated}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {creator.avgRating}
                        </div>
                      </TableCell>
                      <TableCell>${creator.totalEarnings}</TableCell>
                      <TableCell>
                        <Badge variant={creator.status === 'active' ? 'default' : 'secondary'}>
                          {creator.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Performance
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Manage Permissions
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 