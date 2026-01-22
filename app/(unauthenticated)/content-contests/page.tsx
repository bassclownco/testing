'use client';

import { useState, useEffect } from 'react';
import { Contest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Trophy, ArrowRight, Video, Camera, Edit, Users, Calendar, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CTASection } from '@/components/home/CTASection';

export default function ContentContestsPage() {
  const [contests, setContests] = useState<any[]>([]);
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
        setContests(result.data.contests);
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContests = contests.filter((contest: any) => {
    const matchesSearch = contest.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contest.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || contest.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', 'Video Production', 'Photography', 'Writing'];
  const statuses = ['all', 'open', 'upcoming', 'closed'];

  const handleApply = async (contestId: string) => {
    // Check membership first
    try {
      const response = await fetch(`/api/contests/${contestId}/apply`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        const result = await response.json();
        if (result.message?.includes('membership')) {
          alert('Membership required: You must have an active membership ($9.99/month) to apply to contests.');
          return;
        }
      }

      // Redirect to apply page
      window.location.href = `/contests/${contestId}/apply`;
    } catch (error) {
      console.error('Error checking application status:', error);
      // Still redirect - the apply page will handle membership check
      window.location.href = `/contests/${contestId}/apply`;
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      {/* Hero Section */}
      <section 
        id="content-contests-hero" 
        className="relative min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-20 px-4"
        style={{ backgroundColor: '#2C3E50' }}
      >
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

        {/* Contest List - Left Side Layout */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#2D2D2D] border-slate-700">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <Skeleton className="w-48 h-48" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredContests.length > 0 ? (
          <div className="space-y-6">
            {filteredContests.map((contest: any) => {
              const applicationDeadline = contest.applicationDeadline ? new Date(contest.applicationDeadline) : null;
              const endDate = contest.endDate ? new Date(contest.endDate) : null;
              const isApplicationDeadlinePassed = applicationDeadline ? new Date() > applicationDeadline : false;
              const isOpen = contest.status === 'open' && !isApplicationDeadlinePassed;

              return (
                <Card key={contest.id} className="bg-[#2D2D2D] border-slate-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side - Brand Logo, Host, Contest Image */}
                      <div className="md:w-1/3 lg:w-1/4 p-6 bg-slate-800/50 flex flex-col items-center justify-center space-y-4">
                        {contest.brandLogo && (
                          <div className="relative w-32 h-32 mb-4">
                            <Image
                              src={contest.brandLogo}
                              alt={contest.brandName || 'Brand Logo'}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        )}
                        {contest.brandName && (
                          <p className="text-sm text-cream/60 text-center">{contest.brandName}</p>
                        )}
                        {contest.image && (
                          <div className="relative w-full aspect-video mt-4 rounded-lg overflow-hidden">
                            <Image
                              src={contest.image}
                              alt={contest.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>

                      {/* Right Side - Contest Details */}
                      <div className="md:w-2/3 lg:w-3/4 p-6 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h2 className="text-2xl md:text-3xl font-phosphate text-cream title-text">
                                {contest.title}
                              </h2>
                              <Badge 
                                variant={contest.status === 'open' ? 'default' : 'secondary'}
                                className={contest.status === 'open' ? 'bg-green-600' : ''}
                              >
                                {contest.status === 'open' ? 'Open' : contest.status}
                              </Badge>
                            </div>
                            {contest.category && (
                              <Badge variant="outline" className="text-cream border-cream/30">
                                {contest.category}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {contest.description && (
                          <div 
                            className="text-cream/80 mb-4 prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ 
                              __html: contest.shortDescription || contest.description.substring(0, 200) + '...' 
                            }}
                          />
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-cream/70">
                            <Trophy className="h-4 w-4 text-red-500" />
                            <span className="font-semibold">Prize:</span>
                            <span>{contest.prize || 'TBD'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-cream/70">
                            <Users className="h-4 w-4 text-red-500" />
                            <span>{contest.currentParticipants || 0} / {contest.maxParticipants || '∞'}</span>
                          </div>
                          {applicationDeadline && (
                            <div className="flex items-center gap-2 text-cream/70">
                              <Calendar className="h-4 w-4 text-red-500" />
                              <span>Apply by: {applicationDeadline.toLocaleDateString()}</span>
                            </div>
                          )}
                          {endDate && (
                            <div className="flex items-center gap-2 text-cream/70">
                              <Clock className="h-4 w-4 text-red-500" />
                              <span>Ends: {endDate.toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 mt-auto">
                          <Button
                            variant="outline"
                            asChild
                            className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
                          >
                            <Link href={`/contests/${contest.id}`}>
                              View Details
                            </Link>
                          </Button>
                          
                          {isOpen && (
                            <Button
                              onClick={() => handleApply(contest.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                          <p className="text-xs text-blue-300">
                            <strong>Membership Required:</strong> You must have an active membership ($9.99/month) to apply to contests.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
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
