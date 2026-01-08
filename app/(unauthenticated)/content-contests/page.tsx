'use client';

import { useState, useEffect } from 'react';
import { Contest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ContestCard from '@/components/contests/ContestCard';
import { Search, Trophy, ArrowRight, Video, Camera, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ContentContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contests?limit=100&status=open', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contests');
      }

      const result = await response.json();

      if (result.success && result.data?.contests) {
        const transformedContests: Contest[] = result.data.contests.map((contest: any) => ({
          id: contest.id,
          title: contest.title,
          description: contest.description || '',
          shortDescription: contest.shortDescription || contest.description?.substring(0, 100) || '',
          image: contest.image || '/images/assets/bass-clown-co-fish-chase.png',
          prize: contest.prize || 'Prize TBD',
          startDate: contest.startDate ? new Date(contest.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          endDate: contest.endDate ? new Date(contest.endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          applicationDeadline: contest.applicationDeadline ? new Date(contest.applicationDeadline).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          submissionDeadline: contest.submissionDeadline ? new Date(contest.submissionDeadline).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: contest.status || 'open',
          category: contest.category || 'General',
          requirements: Array.isArray(contest.requirements) ? contest.requirements :
                        typeof contest.requirements === 'object' && contest.requirements !== null
                          ? Object.values(contest.requirements) as string[]
                          : [],
          judges: Array.isArray(contest.judges) ? contest.judges :
                  typeof contest.judges === 'object' && contest.judges !== null
                    ? Object.values(contest.judges) as string[]
                    : [],
          maxParticipants: contest.maxParticipants || 100,
          currentParticipants: contest.currentParticipants || 0,
          rules: contest.rules || '',
          submissionGuidelines: contest.submissionGuidelines || '',
          createdBy: contest.createdBy || contest.creatorName || 'Bass Clown Co',
          createdAt: contest.createdAt ? new Date(contest.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: contest.updatedAt ? new Date(contest.updatedAt).toISOString() : new Date().toISOString()
        }));

        setContests(transformedContests);
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contest.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || contest.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', 'Video Production', 'Photography', 'Writing'];
  const statuses = ['all', 'open', 'upcoming', 'closed'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">

      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Content Creation Contests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcase your creative skills in video, photography, and writing contests. 
            Win amazing prizes while sharing your passion for fishing with the community.
          </p>
        </div>

 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Video className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contests.filter(c => c.category === 'Video Production').length}
                </p>
                <p className="text-sm text-gray-600">Video Contests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Camera className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contests.filter(c => c.category === 'Photography').length}
                </p>
                <p className="text-sm text-gray-600">Photo Contests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Edit className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contests.filter(c => c.category === 'Writing').length}
                </p>
                <p className="text-sm text-gray-600">Writing Contests</p>
              </div>
            </CardContent>
          </Card>
        </div>


        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search contests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>


        {filteredContests.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No contests found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more contests.
            </p>
          </div>
        )}


        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Ready to showcase your creativity?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join our content creation contests and win amazing prizes while sharing your passion for fishing.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
