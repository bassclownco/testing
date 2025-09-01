import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Users, Trophy, Calendar, DollarSign } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Mock data for contests
const contests = [
  {
    id: '1',
    title: 'Bass Fishing Championship',
    type: 'Video Contest',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    applications: 45,
    submissions: 23,
    prizePool: 2500,
    brand: 'Bass Masters',
  },
  {
    id: '2',
    title: 'Fly Fishing Excellence',
    type: 'Photo Contest',
    status: 'judging',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    applications: 67,
    submissions: 67,
    prizePool: 1500,
    brand: 'River Pro',
  },
  {
    id: '3',
    title: 'Ice Fishing Adventure',
    type: 'Video Contest',
    status: 'completed',
    startDate: '2023-12-01',
    endDate: '2024-01-10',
    applications: 89,
    submissions: 78,
    prizePool: 3000,
    brand: 'Arctic Gear',
  },
  {
    id: '4',
    title: 'Beginner Guide Contest',
    type: 'Educational',
    status: 'draft',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    applications: 0,
    submissions: 0,
    prizePool: 1000,
    brand: 'Learn to Fish',
  },
];

export default function ContestsPage() {
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contest Management</h1>
          <p className="text-gray-600 mt-1">Manage all contests and their lifecycle</p>
        </div>
        <Link href="/admin/contests/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Contest
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contests</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-muted-foreground">+156 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prize Pool</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,000</div>
            <p className="text-xs text-muted-foreground">Across all contests</p>
          </CardContent>
        </Card>
      </div>

      {/* Contests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contests</CardTitle>
          <CardDescription>Manage and monitor all contest activities</CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search contests..." 
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
                <TableHead>Contest</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Prize Pool</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contests.map((contest) => (
                <TableRow key={contest.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contest.title}</div>
                      <div className="text-sm text-gray-600">{contest.brand}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contest.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(contest.status)}>
                      {contest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{contest.startDate}</div>
                      <div className="text-gray-500">to {contest.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contest.applications}</TableCell>
                  <TableCell>{contest.submissions}</TableCell>
                  <TableCell>${contest.prizePool.toLocaleString()}</TableCell>
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
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Contest
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Applications
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Submissions
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Manage Judging
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Results
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
    </div>
  );
} 