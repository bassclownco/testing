import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Gift, Users, Calendar, DollarSign } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Mock data for giveaways
const giveaways = [
  {
    id: '1',
    title: 'Premium Rod Giveaway',
    type: 'Product Giveaway',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    entries: 1250,
    maxEntries: 2000,
    prizeValue: 500,
    brand: 'Rod Masters',
    winner: null,
  },
  {
    id: '2',
    title: 'Fishing Gear Bundle',
    type: 'Bundle Giveaway',
    status: 'drawing',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    entries: 890,
    maxEntries: 1000,
    prizeValue: 1200,
    brand: 'Tackle Pro',
    winner: null,
  },
  {
    id: '3',
    title: 'Bass Boat Adventure',
    type: 'Experience Giveaway',
    status: 'completed',
    startDate: '2023-12-01',
    endDate: '2024-01-10',
    entries: 2340,
    maxEntries: 2500,
    prizeValue: 5000,
    brand: 'Boat Adventures',
    winner: 'John Fisher',
  },
  {
    id: '4',
    title: 'Fishing Course Access',
    type: 'Digital Giveaway',
    status: 'draft',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    entries: 0,
    maxEntries: 500,
    prizeValue: 200,
    brand: 'Learn Fishing',
    winner: null,
  },
];

export default function GiveawaysPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'drawing': return 'secondary';
      case 'completed': return 'outline';
      case 'draft': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Giveaway Management</h1>
          <p className="text-gray-600 mt-1">Manage all giveaways and prize distributions</p>
        </div>
        <Link href="/admin/giveaways/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Giveaway
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Giveaways</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Giveaways</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,640</div>
            <p className="text-xs text-muted-foreground">+890 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prize Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78,500</div>
            <p className="text-xs text-muted-foreground">Across all giveaways</p>
          </CardContent>
        </Card>
      </div>

      {/* Giveaways Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Giveaways</CardTitle>
          <CardDescription>Manage and monitor all giveaway activities</CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search giveaways..." 
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
                <TableHead>Giveaway</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Entries</TableHead>
                <TableHead>Prize Value</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {giveaways.map((giveaway) => (
                <TableRow key={giveaway.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{giveaway.title}</div>
                      <div className="text-sm text-gray-600">{giveaway.brand}</div>
                    </div>
                  </TableCell>
                  <TableCell>{giveaway.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(giveaway.status)}>
                      {giveaway.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{giveaway.startDate}</div>
                      <div className="text-gray-500">to {giveaway.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{giveaway.entries.toLocaleString()}</div>
                      <div className="text-gray-500">of {giveaway.maxEntries.toLocaleString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>${giveaway.prizeValue.toLocaleString()}</TableCell>
                  <TableCell>
                    {giveaway.winner ? (
                      <Badge variant="outline">{giveaway.winner}</Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
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
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Giveaway
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Entries
                        </DropdownMenuItem>
                        {giveaway.status === 'drawing' && (
                          <DropdownMenuItem>
                            Select Winner
                          </DropdownMenuItem>
                        )}
                        {giveaway.winner && (
                          <DropdownMenuItem>
                            Contact Winner
                          </DropdownMenuItem>
                        )}
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