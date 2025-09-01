'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Gift, Users, Search, Filter, Trophy, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BassFishy from '@/components/BassFishy';
import Bubbles from '@/components/Bubbles';
import { GiveawayCard } from '@/components/giveaways/GiveawayCard';
import { Giveaway } from '@/lib/types';
import WaitlistForm from '@/components/WaitlistForm';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

// Update mockGiveaways to include categories
const mockGiveaways: Giveaway[] = [
  {
    id: '1',
    category: 'Gear',
    title: 'Ultimate Bass Fishing Gear Bundle',
    description: 'Win a complete bass fishing setup including premium rod, reel, tackle box, and exclusive Bass Clown Co merchandise. Everything you need for your next fishing adventure!',
    prizeValue: '$750',
    entryCount: 1247,
    maxEntries: 2000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    status: 'active' as const,
    image: '/images/video-review-thumb-1.jpg',
    rules: [
      'Must be 18+ years old',
      'Valid email address required',
      'One entry per person',
      'US residents only'
    ],
    prizeItems: [
      'Premium Bass Rod',
      'High-Quality Reel',
      'Tackle Box with Lures',
      'Bass Clown Co Merchandise'
    ]
  },
  {
    id: '2',
    category: 'Experiences',
    title: 'Tournament Entry Package',
    description: 'Free entry to our next bass fishing tournament plus accommodation, meals, and professional coaching session. Perfect for serious anglers!',
    prizeValue: '$500',
    entryCount: 892,
    maxEntries: 1500,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-01'),
    status: 'active' as const,
    image: '/images/video-review-thumb-1.jpg',
    rules: [
      'Must be 18+ years old',
      'Valid fishing license',
      'Available for tournament dates',
      'Transportation not included'
    ],
    prizeItems: [
      'Tournament Entry Fee',
      'Hotel Accommodation',
      'Meals Included',
      'Professional Coaching Session'
    ]
  },
  {
    id: '3',
    category: 'Equipment',
    title: 'Professional Video Equipment Giveaway',
    description: 'Win professional camera equipment perfect for creating fishing content. Includes 4K camera, stabilizer, microphone, and editing software license.',
    prizeValue: '$1,200',
    entryCount: 2156,
    maxEntries: 3000,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-20'),
    status: 'active' as const,
    image: '/images/video-review-thumb-1.jpg',
    rules: [
      'Must be 18+ years old',
      'Content creator or aspiring creator',
      'Agree to create content featuring prize',
      'Valid social media presence'
    ],
    prizeItems: [
      '4K Camera',
      'Camera Stabilizer',
      'Professional Microphone',
      'Video Editing Software License'
    ]
  },
  {
    id: '4',
    category: 'Experiences',
    title: 'Exclusive Fishing Trip Experience',
    description: 'Join us for an exclusive guided fishing trip to a premium bass fishing location. Includes guide, boat, equipment, and professional photography.',
    prizeValue: '$800',
    entryCount: 567,
    maxEntries: 1000,
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-03-10'),
    status: 'upcoming' as const,
    image: '/images/video-review-thumb-1.jpg',
    rules: [
      'Must be 18+ years old',
      'Valid fishing license',
      'Able to travel to location',
      'Basic swimming ability'
    ],
    prizeItems: [
      'Guided Fishing Trip',
      'Boat and Equipment',
      'Professional Photography',
      'Travel Coordination'
    ]
  },
  {
    id: '5',
    category: 'Gear',
    title: 'Bass Clown Co Merchandise Pack',
    description: 'Complete collection of Bass Clown Co branded merchandise including apparel, accessories, and limited edition items.',
    prizeValue: '$300',
    entryCount: 1834,
    maxEntries: 2500,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    status: 'ended' as const,
    image: '/images/video-review-thumb-1.jpg',
    rules: [
      'Must be 18+ years old',
      'Valid shipping address',
      'Brand enthusiast',
      'Social media participation'
    ],
    prizeItems: [
      'Bass Clown Co Apparel',
      'Branded Accessories',
      'Limited Edition Items',
      'Exclusive Merchandise'
    ]
  }
];

export default function GiveawaysPage() {
  const [giveaways, setGiveaways] = useState(mockGiveaways);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGiveaways = giveaways.filter(giveaway => {
    const matchesSearch = giveaway.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         giveaway.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || giveaway.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || giveaway.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const gearCount = giveaways.filter(g => g.category === 'Gear').length;
  const experiencesCount = giveaways.filter(g => g.category === 'Experiences').length;
  const equipmentCount = giveaways.filter(g => g.category === 'Equipment').length;

  const categories = ['all', 'Gear', 'Experiences', 'Equipment'];

  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      {/* Enhanced Coming Soon Overlay */}
      <ComingSoonOverlay 
        title="GIVEAWAYS"
        description="We're preparing amazing giveaways with incredible fishing gear, equipment, and exclusive experiences. 
        Get ready for your chance to win big!"
        cta={<WaitlistForm />}
      />

      {/* Existing content remains unchanged */}
      {/* Hero Section 
      <section 
        id="giveaways-hero" 
        className="relative min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-20 px-4"
        style={{ backgroundColor: '#2C3E50' }} // Dark blue-gray background
      >
        <div className="absolute inset-0 bg-black/30 z-[1]"></div> {/* Optional overlay
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
        {/* Stats Cards 
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

        {/* Search and Filters 
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

        {/* Giveaway Grid 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGiveaways.map((giveaway) => (
            <GiveawayCard key={giveaway.id} giveaway={giveaway} />
          ))}
        </div>

        {/* Empty State 
        {filteredGiveaways.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-cream/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cream mb-2">
              No giveaways found
            </h3>
            <p className="text-cream/60">
              Try adjusting your search terms or filters to find more giveaways.
            </p>
          </div>
        )}

        {/* How It Works Section 
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

        {/* Call to Action 
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
      */}
    </main>
  );
}
