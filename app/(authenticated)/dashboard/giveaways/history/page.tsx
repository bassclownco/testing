import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Crown, Gift, Trophy, Users, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockPastGiveaways = [
  {
    id: '1',
    title: 'Holiday Fishing Bundle',
    description: 'Complete fishing setup perfect for the holidays',
    prizeValue: '$750',
    entryCount: 892,
    maxEntries: 1000,
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-31'),
    status: 'ended',
    winner: {
      name: 'Mike Johnson',
      location: 'Texas, USA',
      avatar: '/images/avatars/mike.jpg',
      testimonial: 'This was an amazing surprise! The fishing gear is top quality and I\'ve already caught my biggest bass with it.'
    },
    userParticipated: true,
    userWon: false,
    image: '/images/giveaway-holiday-bundle.jpg'
  },
  {
    id: '2',
    title: 'Boat Tournament Package',
    description: 'Bass boat rental and tournament entry for weekend tournament',
    prizeValue: '$400',
    entryCount: 245,
    maxEntries: 300,
    startDate: new Date('2023-11-15'),
    endDate: new Date('2023-11-30'),
    status: 'ended',
    winner: {
      name: 'Sarah Chen',
      location: 'California, USA',
      avatar: '/images/avatars/sarah.jpg',
      testimonial: 'What an incredible experience! Not only did I get to use a fantastic boat, but I also won 2nd place in the tournament!'
    },
    userParticipated: false,
    userWon: false,
    image: '/images/giveaway-boat-tournament.jpg'
  },
  {
    id: '3',
    title: 'Lucky Lure Collection',
    description: 'Collection of 20 proven bass lures from top brands',
    prizeValue: '$200',
    entryCount: 156,
    maxEntries: 200,
    startDate: new Date('2023-10-01'),
    endDate: new Date('2023-10-31'),
    status: 'ended',
    winner: {
      name: 'Alex Rodriguez',
      location: 'Florida, USA',
      avatar: '/images/avatars/alex.jpg',
      testimonial: 'These lures are incredible! I\'ve been using them for months and they never fail to attract bass.'
    },
    userParticipated: true,
    userWon: true,
    image: '/images/giveaway-lures.jpg'
  },
  {
    id: '4',
    title: 'Summer Fishing Gear',
    description: 'Essential gear for hot summer bass fishing',
    prizeValue: '$300',
    entryCount: 445,
    maxEntries: 500,
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-31'),
    status: 'ended',
    winner: {
      name: 'David Thompson',
      location: 'Michigan, USA',
      avatar: '/images/avatars/david.jpg',
      testimonial: 'Perfect timing for summer fishing! The cooling towels and UV protection gear made my fishing trips so much more comfortable.'
    },
    userParticipated: true,
    userWon: false,
    image: '/images/giveaway-summer-gear.jpg'
  },
  {
    id: '5',
    title: 'Night Fishing Essentials',
    description: 'LED lights, glow lures, and night fishing equipment',
    prizeValue: '$250',
    entryCount: 178,
    maxEntries: 250,
    startDate: new Date('2023-07-15'),
    endDate: new Date('2023-07-31'),
    status: 'ended',
    winner: {
      name: 'Emma Wilson',
      location: 'Louisiana, USA',
      avatar: '/images/avatars/emma.jpg',
      testimonial: 'Night fishing has become my favorite! These lights and glow lures have helped me catch bass I never would have found before.'
    },
    userParticipated: false,
    userWon: false,
    image: '/images/giveaway-night-fishing.jpg'
  }
];

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prizeValue: string;
  entryCount: number;
  maxEntries: number;
  startDate: Date;
  endDate: Date;
  status: string;
  winner: {
    name: string;
    location: string;
    avatar: string;
    testimonial: string;
  };
  userParticipated: boolean;
  userWon: boolean;
  image: string;
}

function PastGiveawayCard({ giveaway }: { giveaway: Giveaway }) {
  const entryPercentage = (giveaway.entryCount / giveaway.maxEntries) * 100;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{giveaway.title}</CardTitle>
            <CardDescription>{giveaway.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline">Ended</Badge>
            {giveaway.userWon && (
              <Badge variant="default" className="bg-yellow-500">
                <Crown className="w-3 h-3 mr-1" />
                You Won!
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-lg">
            <Gift className="w-16 h-16 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Prize Value</span>
                <span className="font-bold text-green-600">{giveaway.prizeValue}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Entries</span>
                <span className="font-medium">{giveaway.entryCount}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {Math.ceil((giveaway.endDate.getTime() - giveaway.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fill Rate</span>
                <span className="font-medium">{entryPercentage.toFixed(0)}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {giveaway.startDate.toLocaleDateString()} - {giveaway.endDate.toLocaleDateString()}
            </span>
          </div>
          
          <Separator />
          
          {/* Winner Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-sm">Winner</span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {giveaway.winner.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{giveaway.winner.name}</span>
                  <span className="text-xs text-gray-500">{giveaway.winner.location}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 italic">
                  &quot;{giveaway.winner.testimonial}&quot;
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {giveaway.userParticipated && (
                <div className="flex items-center gap-1 text-blue-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">You entered</span>
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm" asChild>
              <Link href={`/giveaways/${giveaway.id}`}>
                View Details
                <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GiveawayHistoryPage() {
  const userWins = mockPastGiveaways.filter(g => g.userWon);
  const userEntries = mockPastGiveaways.filter(g => g.userParticipated);
  const totalPrizeValue = mockPastGiveaways.reduce((sum, g) => sum + parseInt(g.prizeValue.replace('$', '').replace(',', '')), 0);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Giveaway History</h1>
            <p className="text-gray-600">
              Browse past giveaways and see who won amazing prizes
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/giveaways">View Active Giveaways</Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockPastGiveaways.length}</div>
              <div className="text-sm text-gray-600">Total Giveaways</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${totalPrizeValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Prizes Given</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userEntries.length}</div>
              <div className="text-sm text-gray-600">Your Entries</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{userWins.length}</div>
              <div className="text-sm text-gray-600">Your Wins</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Wins Section */}
      {userWins.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Your Wins</h2>
            <Badge variant="default" className="bg-yellow-500">{userWins.length}</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userWins.map(giveaway => (
              <PastGiveawayCard key={giveaway.id} giveaway={giveaway} />
            ))}
          </div>
        </section>
      )}

      {/* All Past Giveaways */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Gift className="w-6 h-6 text-gray-500" />
          <h2 className="text-2xl font-bold text-gray-900">All Past Giveaways</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPastGiveaways.map(giveaway => (
            <PastGiveawayCard key={giveaway.id} giveaway={giveaway} />
          ))}
        </div>
      </section>

      {/* Empty State */}
      {mockPastGiveaways.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Past Giveaways</h3>
          <p className="text-gray-600">
            Past giveaways will appear here once they&apos;re completed
          </p>
        </div>
      )}
    </div>
  );
} 