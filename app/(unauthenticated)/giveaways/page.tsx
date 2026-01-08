'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, Gift, Users, Search, Filter, Trophy, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GiveawayCard } from '@/components/giveaways/GiveawayCard';
import { Giveaway } from '@/lib/types';
import { CTASection } from '@/components/home/CTASection';

export default function GiveawaysPage() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchGiveaways();
  }, []);

  const fetchGiveaways = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/giveaways?limit=100&status=active', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch giveaways');
      }

      const result = await response.json();

      if (result.success && result.data?.giveaways) {
        // Transform API data to match Giveaway type
        const transformedGiveaways: Giveaway[] = result.data.giveaways.map((giveaway: any) => ({
          id: giveaway.id,
          title: giveaway.title,
          description: giveaway.description || '',
          longDescription: giveaway.longDescription,
          prizeValue: giveaway.prizeValue || 'Prize TBD',
          entryCount: 0, // Will be fetched separately if needed
          maxEntries: giveaway.maxEntries || null,
          startDate: giveaway.startDate ? new Date(giveaway.startDate) : new Date(),
          endDate: giveaway.endDate ? new Date(giveaway.endDate) : new Date(),
          status: (giveaway.status || 'upcoming') as 'active' | 'upcoming' | 'ended',
          image: giveaway.image || '/images/assets/bass-clown-co-fish-chase.png',
          rules: Array.isArray(giveaway.rules) ? giveaway.rules : 
                 typeof giveaway.rules === 'object' && giveaway.rules !== null
                   ? Object.values(giveaway.rules) as string[]
                   : [],
          prizeItems: Array.isArray(giveaway.prizeItems) ? giveaway.prizeItems : [],
          category: 'Gear', // Default category, could be derived from giveaway data
          sponsor: giveaway.sponsor,
          createdBy: giveaway.createdBy,
          createdAt: giveaway.createdAt ? new Date(giveaway.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: giveaway.updatedAt ? new Date(giveaway.updatedAt).toISOString() : new Date().toISOString()
        }));

        setGiveaways(transformedGiveaways);
      }
    } catch (error) {
      console.error('Error fetching giveaways:', error);
      // Fallback to empty array - will show empty state
      setGiveaways([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGiveaways = giveaways.filter(giveaway => {
    const matchesSearch = giveaway.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         giveaway.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || giveaway.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || (giveaway.category && giveaway.category === selectedCategory);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const gearCount = giveaways.filter(g => g.category === 'Gear').length;
  const experiencesCount = giveaways.filter(g => g.category === 'Experiences').length;
  const equipmentCount = giveaways.filter(g => g.category === 'Equipment').length;

  const categories = ['all', 'Gear', 'Experiences', 'Equipment'];

  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      {/* Hero Section */}
      <section 
        id="giveaways-hero" 
        className="relative min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-20 px-4"
        style={{ backgroundColor: '#2C3E50' }}
      >
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="font-phosphate text-5xl md:text-7xl tracking-wider text-cream uppercase mb-4 text-shadow-lg title-text">
            FISHING GIVEAWAYS
          </h1>
          <p className="text-lg md:text-xl tracking-wide text-cream/90 font-phosphate max-w-3xl title-text">
            Enter our exciting giveaways for a chance to win amazing fishing gear, equipment, and exclusive experiences.
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
                <Gift className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-cream">{gearCount}</p>
                  <p className="text-sm text-cream/60">Gear Giveaways</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-slate-700">
              <CardContent className="flex items-center p-6">
                <Calendar className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-cream">{experiencesCount}</p>
                  <p className="text-sm text-cream/60">Experience Giveaways</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#2D2D2D] border-slate-700">
              <CardContent className="flex items-center p-6">
                <Trophy className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-cream">{equipmentCount}</p>
                  <p className="text-sm text-cream/60">Equipment Giveaways</p>
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
                    placeholder="Search giveaways..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-cream placeholder:text-cream/40"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-cream">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {['all', 'active', 'upcoming', 'ended'].map(status => (
                    <SelectItem key={status} value={status} className="text-cream focus:bg-slate-600">
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          </CardContent>
        </Card>

        {/* Giveaway Grid */}
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
        ) : filteredGiveaways.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGiveaways.map((giveaway) => (
              <GiveawayCard key={giveaway.id} giveaway={giveaway} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-cream/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cream mb-2">
              No giveaways found
            </h3>
            <p className="text-cream/60 mb-6">
              {searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all'
                ? "Try adjusting your search terms or filters to find more giveaways."
                : "Check back soon for exciting giveaways!"}
            </p>
            {(searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedCategory('all');
                }}
                className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-16">
          <Card className="bg-[#2D2D2D] border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-cream font-phosphate title-text">How Giveaways Work</CardTitle>
              <CardDescription className="text-center text-cream/80">
                Simple steps to enter and win amazing prizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400">
                    <span className="text-xl font-bold text-blue-400">1</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-cream">Browse Giveaways</h3>
                  <p className="text-sm text-cream/60">
                    Explore our current and upcoming giveaways to find prizes you love.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-400">
                    <span className="text-xl font-bold text-green-400">2</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-cream">Complete Entry</h3>
                  <p className="text-sm text-cream/60">
                    Follow the entry requirements and complete all necessary steps.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400">
                    <span className="text-xl font-bold text-purple-400">3</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-cream">Wait for Drawing</h3>
                  <p className="text-sm text-cream/60">
                    Winners are selected randomly when the giveaway ends.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400">
                    <span className="text-xl font-bold text-yellow-400">4</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-cream">Claim Your Prize</h3>
                  <p className="text-sm text-cream/60">
                    Winners are notified by email and can claim their prizes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 font-phosphate title-text">
                Ready to win amazing prizes?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join our community and enter giveaways for fishing gear, equipment, and exclusive experiences.
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
