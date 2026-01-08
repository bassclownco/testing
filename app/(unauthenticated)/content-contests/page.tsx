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
import HookLine from "@/components/HookLine";
import { CTASection } from '@/components/home/CTASection';

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
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      {/* Hero Section */}
      <section 
        id="content-contests-hero" 
        className="relative min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-20 px-4"
        style={{ backgroundColor: '#2C3E50' }}
      >
        <HookLine
          size={80}
          color="#ECE9D9"
          className="absolute top-0 left-1/2 -translate-x-1/2 z-[1]"
        />
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="font-phosphate text-5xl md:text-7xl tracking-wider text-cream uppercase mb-4 text-shadow-lg title-text">
            CONTENT CREATION CONTESTS
          </h1>
          <p className="text-lg md:text-xl tracking-wide text-cream/90 font-phosphate max-w-3xl title-text">
            Showcase your creative skills in video, photography, and writing contests. 
            Win amazing prizes while sharing your passion for fishing with the community.
          </p>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-12 md:py-16">

 
        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#2D2D2D] border-slate-700">
                <CardContent className="flex items-center p-6">
                  <Skeleton className="h-8 w-8 mr-3" />
                  <div>
                    <Skeleton className="h-6 w-12 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#2D2D2D] border-slate-700">
              <CardContent className="flex items-center p-6">
                <Video className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-cream">
                    {contests.filter(c => c.category === 'Video Production').length}
                  </p>
                  <p className="text-sm text-cream/60">Video Contests</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-slate-700">
              <CardContent className="flex items-center p-6">
                <Camera className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-cream">
                    {contests.filter(c => c.category === 'Photography').length}
                  </p>
                  <p className="text-sm text-cream/60">Photo Contests</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-slate-700">
              <CardContent className="flex items-center p-6">
                <Edit className="h-8 w-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-cream">
                    {contests.filter(c => c.category === 'Writing').length}
                  </p>
                  <p className="text-sm text-cream/60">Writing Contests</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}


        {/* Search and Filters */}
        <Card className="mb-8 bg-[#2D2D2D] border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-cream/40" />
                  <Input
                    placeholder="Search contests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-cream placeholder:text-cream/40"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-cream">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-cream focus:bg-slate-600">
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-cream">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {statuses.map(status => (
                    <SelectItem key={status} value={status} className="text-cream focus:bg-slate-600">
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contest Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-[#2D2D2D] border-gray-700">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : null}

        {/* Empty State */}
        {!loading && filteredContests.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-cream/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cream mb-2">
              No contests found
            </h3>
            <p className="text-cream/60 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? "Try adjusting your search terms or filters to find more contests."
                : "Check back soon for exciting contests!"}
            </p>
            {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}


        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 font-phosphate title-text">
                Ready to showcase your creativity?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join our content creation contests and win amazing prizes while sharing your passion for fishing.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-red-600 hover:bg-gray-100 font-phosphate title-text"
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
      </section>
      
      <CTASection />
    </main>
  );
}
