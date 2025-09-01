'use client';

import { useState, useEffect } from 'react';
import { Contest, ContestCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContestCard from '@/components/contests/ContestCard';
import { Search, Filter, Trophy, Calendar, Users, DollarSign, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

// Mock data - In a real app, this would come from an API
const mockContests: Contest[] = [
  {
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
  },
  {
    id: '2',
    title: 'Photography Contest: Fishing Moments',
    description: 'Capture the perfect fishing moment in this photography contest. Whether it\'s the excitement of a catch, the beauty of a sunrise over water, or the concentration of an angler, show us your best fishing photography.',
    shortDescription: 'Capture the perfect fishing moment and win professional photography equipment',
    image: '/images/assets/bass-taking-picture.svg',
    prize: '$1,500 Photography Equipment',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    applicationDeadline: '2024-03-01',
    submissionDeadline: '2024-04-15',
    status: 'open',
    category: 'Photography',
    requirements: [
      'Original photography only',
      'Fishing-related subject matter',
      'High resolution (minimum 300 DPI)',
      'Submit up to 3 images',
      'Include brief story behind the photo'
    ],
    judges: ['Emma Photo', 'David Lens', 'Lisa Capture'],
    maxParticipants: 75,
    currentParticipants: 23,
    rules: 'Photos must be taken during the contest period. Basic editing is allowed but no heavy manipulation. RAW files may be requested for verification.',
    submissionGuidelines: 'Submit high-resolution JPEG files, maximum 20MB each. Include title, description, and camera settings if available.',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Fishing Tutorial Challenge',
    description: 'Create an educational fishing tutorial that teaches others a specific technique, knot, or skill. Help grow the fishing community by sharing your knowledge and expertise.',
    shortDescription: 'Create educational fishing content and win cash prizes',
    image: '/images/assets/bass-fish-illustration.svg',
    prize: '$1,000 Cash Prize',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    applicationDeadline: '2024-04-01',
    submissionDeadline: '2024-05-15',
    status: 'open',
    category: 'Education',
    requirements: [
      'Educational content focus',
      'Clear instruction and demonstration',
      'Original content only',
      'Include step-by-step explanation',
      'Family-friendly content'
    ],
    judges: ['Tom Teach', 'Rachel Guide', 'Steve Mentor'],
    maxParticipants: 50,
    currentParticipants: 12,
    rules: 'Content must be instructional and family-friendly. Citations required for any referenced techniques or methods.',
    submissionGuidelines: 'Submit video tutorials in MP4 format or written guides in PDF format. Include detailed instructions and any necessary diagrams.',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Biggest Fish Story Contest',
    description: 'Share your most memorable fishing story! Whether it\'s the one that got away, your first catch, or an epic adventure, we want to hear it. The best story wins amazing prizes.',
    shortDescription: 'Share your best fishing story and win gift cards',
    image: '/images/assets/bass-clown-co-fish-chase.png',
    prize: '$500 Gift Card',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    applicationDeadline: '2024-12-01',
    submissionDeadline: '2024-12-15',
    status: 'open',
    category: 'Storytelling',
    requirements: [
      'Original story only',
      'Fishing-related content',
      'Maximum 1,000 words',
      'Family-friendly content',
      'Include photos if available'
    ],
    judges: ['Bill Story', 'Anna Tale', 'Mark Narrative'],
    maxParticipants: 200,
    currentParticipants: 89,
    rules: 'Stories must be original and true. Basic editing for grammar and clarity is allowed.',
    submissionGuidelines: 'Submit stories in text format through the submission form. Include supporting photos if available.',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

const mockCategories: ContestCategory[] = [
  { id: '1', name: 'Video Production', description: 'Video contests and challenges', icon: 'video' },
  { id: '2', name: 'Photography', description: 'Photo contests and challenges', icon: 'camera' },
  { id: '3', name: 'Education', description: 'Educational content contests', icon: 'book' },
  { id: '4', name: 'Storytelling', description: 'Written content and stories', icon: 'pen' },
];

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [filteredContests, setFilteredContests] = useState<Contest[]>(mockContests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    filterContests();
  }, [searchTerm, selectedCategory, selectedStatus, activeTab]);

  const filterContests = () => {
    let filtered = contests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contest =>
        contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contest => contest.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(contest => contest.status === selectedStatus);
    }

    // Filter by tab
    if (activeTab !== 'all') {
      switch (activeTab) {
        case 'open':
          filtered = filtered.filter(contest => contest.status === 'open');
          break;
        case 'closing-soon':
          filtered = filtered.filter(contest => {
            const deadline = new Date(contest.applicationDeadline);
            const now = new Date();
            const timeDiff = deadline.getTime() - now.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff <= 7 && contest.status === 'open';
          });
          break;
        case 'judging':
          filtered = filtered.filter(contest => contest.status === 'judging');
          break;
        case 'completed':
          filtered = filtered.filter(contest => contest.status === 'completed');
          break;
      }
    }

    setFilteredContests(filtered);
  };

  const getContestCounts = () => {
    return {
      all: contests.length,
      open: contests.filter(c => c.status === 'open').length,
      closingSoon: contests.filter(c => {
        const deadline = new Date(c.applicationDeadline);
        const now = new Date();
        const timeDiff = deadline.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff <= 7 && c.status === 'open';
      }).length,
      judging: contests.filter(c => c.status === 'judging').length,
      completed: contests.filter(c => c.status === 'completed').length,
    };
  };

  const counts = getContestCounts();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Contest Discovery</h1>
          <p className="text-gray-400 mb-6">
            Discover and participate in exciting fishing contests. Show off your skills and win amazing prizes!
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-400">Total Contests</p>
                    <p className="text-2xl font-bold text-white">{counts.all}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Open Now</p>
                    <p className="text-2xl font-bold text-white">{counts.open}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Closing Soon</p>
                    <p className="text-2xl font-bold text-white">{counts.closingSoon}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-400">Total Prizes</p>
                    <p className="text-2xl font-bold text-white">$5,000+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-[#2D2D2D] border-gray-700 text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#2D2D2D] border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48 bg-[#2D2D2D] border-gray-700 text-white">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-[#2D2D2D] border-gray-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="judging">Judging</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-[#2D2D2D]">
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="open">Open ({counts.open})</TabsTrigger>
            <TabsTrigger value="closing-soon">Closing Soon ({counts.closingSoon})</TabsTrigger>
            <TabsTrigger value="judging">Judging ({counts.judging})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({counts.completed})</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredContests.length === 0 ? (
              <Card className="bg-[#2D2D2D] border-gray-700">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No contests found</h3>
                  <p className="text-gray-400">
                    Try adjusting your filters or search terms to find contests.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContests.map((contest) => (
                  <Card key={contest.id} className="bg-[#2D2D2D] border-gray-700 hover:bg-[#3D3D3D] transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{contest.title}</CardTitle>
                          <CardDescription className="text-gray-400">{contest.description}</CardDescription>
                        </div>
                        <Badge variant={contest.status === 'open' ? 'default' : 'secondary'}>
                          {contest.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                                                 <div className="flex items-center gap-2 text-sm text-gray-400">
                           <DollarSign className="w-4 h-4" />
                           <span>Prize: {contest.prize}</span>
                         </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{contest.currentParticipants} / {contest.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>Apply by {new Date(contest.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Tag className="w-4 h-4" />
                          <span>{contest.category}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button asChild className="w-full">
                          <Link href={`/contests/${contest.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 