'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Send,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';

interface CollaborationProposal {
  id: string;
  brandId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  type: 'sponsored-post' | 'contest-sponsorship' | 'product-review' | 'brand-ambassador' | 'event-partnership';
  title: string;
  description: string;
  budget: number;
  status: 'draft' | 'sent' | 'under-review' | 'negotiating' | 'accepted' | 'rejected' | 'expired';
  timeline: {
    startDate: Date;
    endDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface CollaborationContract {
  id: string;
  proposalId: string;
  brandId: string;
  creatorId: string;
  status: 'draft' | 'pending-signatures' | 'active' | 'completed' | 'terminated';
  totalAmount: number;
  startDate: Date;
  endDate: Date;
  milestonesCompleted: number;
  totalMilestones: number;
  createdAt: Date;
}

interface CreatorMatch {
  id: string;
  name: string;
  avatar?: string;
  followers: number;
  engagement: number;
  categories: string[];
  matchScore: number;
  location: string;
  averageRate: number;
}

export default function BrandCollaborationPanel() {
  const [activeTab, setActiveTab] = useState('proposals');
  const [proposals, setProposals] = useState<CollaborationProposal[]>([]);
  const [contracts, setContracts] = useState<CollaborationContract[]>([]);
  const [creatorMatches, setCreatorMatches] = useState<CreatorMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateProposal, setShowCreateProposal] = useState(false);

  // New proposal form state
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    type: 'sponsored-post' as const,
    budget: 0,
    timeline: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    requirements: {
      platforms: [] as string[],
      contentTypes: [] as string[],
      audienceSize: 0,
      exclusivity: false
    }
  });

  const [analytics, setAnalytics] = useState({
    totalProposals: 0,
    activeContracts: 0,
    totalSpend: 0,
    averageROI: 0,
    successRate: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Mock data loading
      setProposals([
        {
          id: '1',
          brandId: 'brand1',
          creatorId: 'creator1',
          creatorName: 'Sarah Johnson',
          creatorAvatar: '/avatars/sarah.jpg',
          type: 'sponsored-post',
          title: 'Summer Bass Fishing Campaign',
          description: 'Promote our new bass lures through authentic fishing content',
          budget: 5000,
          status: 'sent',
          timeline: {
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-06-30')
          },
          createdAt: new Date('2024-05-15'),
          updatedAt: new Date('2024-05-15')
        },
        {
          id: '2',
          brandId: 'brand1',
          creatorId: 'creator2',
          creatorName: 'Mike Thompson',
          type: 'contest-sponsorship',
          title: 'Bass Tournament Sponsorship',
          description: 'Sponsor fishing contest with product placement',
          budget: 10000,
          status: 'negotiating',
          timeline: {
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-08-31')
          },
          createdAt: new Date('2024-05-10'),
          updatedAt: new Date('2024-05-20')
        }
      ]);

      setContracts([
        {
          id: '1',
          proposalId: '1',
          brandId: 'brand1',
          creatorId: 'creator1',
          status: 'active',
          totalAmount: 5000,
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-06-30'),
          milestonesCompleted: 2,
          totalMilestones: 4,
          createdAt: new Date('2024-05-25')
        }
      ]);

      setCreatorMatches([
        {
          id: '1',
          name: 'Alex Rivera',
          followers: 125000,
          engagement: 4.8,
          categories: ['Bass Fishing', 'Outdoor Gear'],
          matchScore: 0.92,
          location: 'Texas, USA',
          averageRate: 2500
        },
        {
          id: '2',
          name: 'Emma Davis',
          followers: 89000,
          engagement: 5.2,
          categories: ['Fishing', 'Conservation'],
          matchScore: 0.87,
          location: 'Florida, USA',
          averageRate: 1800
        }
      ]);

      setAnalytics({
        totalProposals: 15,
        activeContracts: 6,
        totalSpend: 45000,
        averageROI: 285,
        successRate: 78
      });

    } catch (error) {
      console.error('Error loading collaboration data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProposal = async () => {
    try {
      // Create new proposal
      const proposal: CollaborationProposal = {
        id: `proposal_${Date.now()}`,
        brandId: 'current-brand',
        creatorId: '',
        creatorName: '',
        ...newProposal,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setProposals(prev => [proposal, ...prev]);
      setShowCreateProposal(false);
      
      // Reset form
      setNewProposal({
        title: '',
        description: '',
        type: 'sponsored-post',
        budget: 0,
        timeline: {
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        requirements: {
          platforms: [],
          contentTypes: [],
          audienceSize: 0,
          exclusivity: false
        }
      });

    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'negotiating': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sponsored-post': return <MessageSquare className="h-4 w-4" />;
      case 'contest-sponsorship': return <Star className="h-4 w-4" />;
      case 'product-review': return <Eye className="h-4 w-4" />;
      case 'brand-ambassador': return <Users className="h-4 w-4" />;
      case 'event-partnership': return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    const matchesType = typeFilter === 'all' || proposal.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Brand Collaborations</h2>
          <p className="text-gray-600">Manage partnerships and sponsored content</p>
        </div>
        <Button onClick={() => setShowCreateProposal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold">{analytics.totalProposals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold">{analytics.activeContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold">${analytics.totalSpend.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Average ROI</p>
                <p className="text-2xl font-bold">{analytics.averageROI}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">{analytics.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="discovery">Creator Discovery</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Proposals Tab */}
        <TabsContent value="proposals" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search proposals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sponsored-post">Sponsored Post</SelectItem>
                    <SelectItem value="contest-sponsorship">Contest Sponsorship</SelectItem>
                    <SelectItem value="product-review">Product Review</SelectItem>
                    <SelectItem value="brand-ambassador">Brand Ambassador</SelectItem>
                    <SelectItem value="event-partnership">Event Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Proposals List */}
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar>
                        <AvatarImage src={proposal.creatorAvatar} />
                        <AvatarFallback>{proposal.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(proposal.type)}
                          <h3 className="font-semibold">{proposal.title}</h3>
                          <Badge className={getStatusColor(proposal.status)}>
                            {proposal.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{proposal.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {proposal.creatorName}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            ${proposal.budget.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {format(proposal.timeline.startDate, 'MMM dd')} - {format(proposal.timeline.endDate, 'MMM dd')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {proposal.status === 'draft' && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-5 w-5" />
                        <h3 className="font-semibold">Contract #{contract.id}</h3>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-semibold">${contract.totalAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold">
                            {format(contract.startDate, 'MMM dd')} - {format(contract.endDate, 'MMM dd')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={(contract.milestonesCompleted / contract.totalMilestones) * 100} className="flex-1" />
                            <span className="text-sm">{contract.milestonesCompleted}/{contract.totalMilestones}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Created</p>
                          <p className="font-semibold">{format(contract.createdAt, 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Creator Discovery Tab */}
        <TabsContent value="discovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Creator Discovery</CardTitle>
              <CardDescription>Find creators that match your brand and campaign requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creatorMatches.map((creator) => (
                  <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-semibold">{creator.name}</h4>
                        <p className="text-sm text-gray-600">{creator.location}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{creator.followers.toLocaleString()} followers</span>
                          <span>{creator.engagement}% engagement</span>
                          <span>${creator.averageRate}/post</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {creator.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Match Score</p>
                        <p className="font-semibold text-green-600">{(creator.matchScore * 100).toFixed(0)}%</p>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-1" />
                        Create Proposal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Analytics</CardTitle>
              <CardDescription>Track performance and ROI of your brand collaborations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Analytics dashboard coming soon...</p>
                <p className="text-sm">Track campaign performance, ROI, and creator metrics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Proposal Modal */}
      {showCreateProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Proposal</CardTitle>
              <CardDescription>Create a collaboration proposal for a creator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Campaign title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the collaboration opportunity"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newProposal.type} onValueChange={(value: any) => setNewProposal(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sponsored-post">Sponsored Post</SelectItem>
                      <SelectItem value="contest-sponsorship">Contest Sponsorship</SelectItem>
                      <SelectItem value="product-review">Product Review</SelectItem>
                      <SelectItem value="brand-ambassador">Brand Ambassador</SelectItem>
                      <SelectItem value="event-partnership">Event Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newProposal.budget}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
            
            <div className="flex justify-end space-x-2 p-6 border-t">
              <Button variant="outline" onClick={() => setShowCreateProposal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProposal}>
                Create Proposal
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 