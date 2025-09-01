import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Building, Trophy, DollarSign, Users } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Mock data for brands
const brands = [
  {
    id: '1',
    name: 'Bass Masters',
    status: 'active',
    joinDate: '2024-01-01',
    contactEmail: 'partnerships@bassmasters.com',
    contestsSponsored: 15,
    totalSpent: 45000,
    category: 'Tournament Fishing',
    tier: 'Premium',
  },
  {
    id: '2',
    name: 'River Pro',
    status: 'active',
    joinDate: '2024-01-10',
    contactEmail: 'marketing@riverpro.com',
    contestsSponsored: 8,
    totalSpent: 22000,
    category: 'Fly Fishing',
    tier: 'Standard',
  },
  {
    id: '3',
    name: 'Arctic Gear',
    status: 'pending',
    joinDate: '2024-01-20',
    contactEmail: 'contact@arcticgear.com',
    contestsSponsored: 0,
    totalSpent: 0,
    category: 'Ice Fishing',
    tier: 'Basic',
  },
  {
    id: '4',
    name: 'Tackle Pro',
    status: 'inactive',
    joinDate: '2023-12-01',
    contactEmail: 'info@tacklepro.com',
    contestsSponsored: 3,
    totalSpent: 8500,
    category: 'Tackle & Gear',
    tier: 'Standard',
  },
];

export default function BrandsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Premium': return 'default';
      case 'Standard': return 'secondary';
      case 'Basic': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Management</h1>
          <p className="text-gray-600 mt-1">Manage brand partnerships and sponsorships</p>
        </div>
        <Link href="/admin/brands/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">72% active rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsored Contests</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">126</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,000</div>
            <p className="text-xs text-muted-foreground">From partnerships</p>
          </CardContent>
        </Card>
      </div>

      {/* Brands Table */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Partners</CardTitle>
          <CardDescription>Manage relationships with brand partners</CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search brands..." 
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
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contests</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{brand.name}</div>
                      <div className="text-sm text-gray-600">{brand.contactEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{brand.category}</TableCell>
                  <TableCell>
                    <Badge variant={getTierColor(brand.tier)}>
                      {brand.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(brand.status)}>
                      {brand.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{brand.contestsSponsored}</TableCell>
                  <TableCell>${brand.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{brand.joinDate}</TableCell>
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
                          Edit Brand
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Contests
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Contact Brand
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Update Tier
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