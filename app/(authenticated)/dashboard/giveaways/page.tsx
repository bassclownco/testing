import { Suspense, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Gift, Users } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prizeValue: string;
  entryCount: number;
  maxEntries: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'upcoming' | 'ended';
  image: string;
}

// Mock data - replace with actual API calls
const mockGiveaways: Giveaway[] = [
  {
    id: '1',
    title: 'Bass Fishing Gear Bundle',
    description: 'Win a complete bass fishing setup including rod, reel, and tackle box',
    prizeValue: '$500',
    entryCount: 234,
    maxEntries: 1000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    status: 'active',
    image: '/images/giveaway-fishing-gear.jpg'
  },
  {
    id: '2',
    title: 'Tournament Entry Package',
    description: 'Free entry to our next bass fishing tournament plus accommodation',
    prizeValue: '$300',
    entryCount: 156,
    maxEntries: 500,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-01'),
    status: 'upcoming',
    image: '/images/giveaway-tournament.jpg'
  },
  {
    id: '3',
    title: 'Video Equipment Giveaway',
    description: 'Professional camera equipment for creating fishing content',
    prizeValue: '$800',
    entryCount: 89,
    maxEntries: 200,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-20'),
    status: 'active',
    image: '/images/giveaway-camera.jpg'
  }
];

function GiveawayCard({ giveaway }: { giveaway: Giveaway }) {
  const isActive = giveaway.status === 'active';
  const isUpcoming = giveaway.status === 'upcoming';
  const daysLeft = Math.ceil((giveaway.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="bg-[#2D2D2D] border-gray-700 hover:bg-[#3D3D3D] transition-colors">
      <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
        <Gift className="w-16 h-16 text-blue-300" />
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-white">{giveaway.title}</CardTitle>
            <CardDescription className="mt-2 text-gray-400">{giveaway.description}</CardDescription>
          </div>
          <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"}>
            {giveaway.status.charAt(0).toUpperCase() + giveaway.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Prize Value</span>
            <span className="font-bold text-green-400">{giveaway.prizeValue}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Entries</span>
            <span className="font-medium text-white">{giveaway.entryCount} / {giveaway.maxEntries}</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(giveaway.entryCount / giveaway.maxEntries) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Ends {giveaway.endDate.toLocaleDateString()}</span>
          </div>
          {isActive && (
            <span className="text-yellow-400 font-medium">
              {daysLeft} days left
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/giveaways/${giveaway.id}`}>
              View Details
            </Link>
          </Button>
          {!isActive && (
            <Button variant="outline" className="flex-1">
              {isUpcoming ? 'Coming Soon' : 'Ended'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function GiveawaysPage() {
  const activeGiveaways = mockGiveaways.filter((g: Giveaway) => g.status === 'active');
  const upcomingGiveaways = mockGiveaways.filter((g: Giveaway) => g.status === 'upcoming');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Giveaways</h1>
          <p className="text-gray-400">
            Enter our exciting giveaways and win amazing bass fishing prizes!
          </p>
        </div>

        {/* Active Giveaways */}
        {activeGiveaways.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-white">Active Giveaways</h2>
              <Badge variant="default">{activeGiveaways.length}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeGiveaways.map(giveaway => (
                <GiveawayCard key={giveaway.id} giveaway={giveaway} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Giveaways */}
        {upcomingGiveaways.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Upcoming Giveaways</h2>
              <Badge variant="secondary">{upcomingGiveaways.length}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingGiveaways.map(giveaway => (
                <GiveawayCard key={giveaway.id} giveaway={giveaway} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {activeGiveaways.length === 0 && upcomingGiveaways.length === 0 && (
          <Card className="bg-[#2D2D2D] border-gray-700">
            <CardContent className="p-8 text-center">
              <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Active Giveaways</h3>
              <p className="text-gray-400">
                Check back soon for exciting new giveaways!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
} 