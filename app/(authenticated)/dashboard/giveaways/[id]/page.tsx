import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Gift, Users, Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockGiveaways = [
  {
    id: '1',
    title: 'Bass Fishing Gear Bundle',
    description: 'Win a complete bass fishing setup including rod, reel, and tackle box',
    longDescription: 'This incredible bass fishing gear bundle includes everything you need to dominate the water. The package contains a premium bass fishing rod, high-quality reel, comprehensive tackle box filled with proven lures, and additional accessories to give you the edge on your next fishing adventure.',
    prizeValue: '$500',
    entryCount: 234,
    maxEntries: 1000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    status: 'active',
    image: '/images/giveaway-fishing-gear.jpg',
    rules: [
      'Must be 18 years or older to enter',
      'One entry per person',
      'Winner will be announced within 48 hours of giveaway end',
      'Prize cannot be exchanged for cash',
      'Shipping included within US only'
    ],
    prizeItems: [
      'Professional Bass Fishing Rod (7ft Medium Action)',
      'High-Performance Spinning Reel',
      'Complete Tackle Box with 50+ Lures',
      'Fishing Line (Multiple Weights)',
      'Bass Fishing Techniques Guide'
    ],
    sponsor: 'Bass Pro Shops',
    userHasEntered: false
  },
  {
    id: '2',
    title: 'Tournament Entry Package',
    description: 'Free entry to our next bass fishing tournament plus accommodation',
    longDescription: 'Join our exclusive bass fishing tournament with this all-inclusive package. Entry fee covered, accommodation provided, and tournament gear included. This is your chance to compete with the best anglers in the region.',
    prizeValue: '$300',
    entryCount: 156,
    maxEntries: 500,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-01'),
    status: 'upcoming',
    image: '/images/giveaway-tournament.jpg',
    rules: [
      'Must be 18 years or older to enter',
      'Valid fishing license required',
      'Must be available for tournament dates',
      'Transportation not included',
      'Must follow tournament rules and regulations'
    ],
    prizeItems: [
      'Tournament Entry Fee ($150 value)',
      '2 nights accommodation',
      'Tournament welcome package',
      'Meals during tournament',
      'Official tournament merchandise'
    ],
    sponsor: 'Bass Clown Co',
    userHasEntered: true
  },
  {
    id: '3',
    title: 'Video Equipment Giveaway',
    description: 'Professional camera equipment for creating fishing content',
    longDescription: 'Perfect for aspiring fishing content creators! This professional video equipment package will help you capture stunning fishing footage and create engaging content for your audience.',
    prizeValue: '$800',
    entryCount: 89,
    maxEntries: 200,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-20'),
    status: 'active',
    image: '/images/giveaway-camera.jpg',
    rules: [
      'Must be 18 years or older to enter',
      'Content creator with active social media presence preferred',
      'Winner may be asked to create content featuring the prize',
      'Equipment warranty handled by manufacturer',
      'Winner responsible for taxes on prize value'
    ],
    prizeItems: [
      'Professional Action Camera (4K Recording)',
      'Waterproof Housing',
      'Floating Grip Handle',
      'Extra Batteries and Memory Cards',
      'Video Editing Software License'
    ],
    sponsor: 'GoPro',
    userHasEntered: false
  }
];

interface GiveawayPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GiveawayPage({ params }: GiveawayPageProps) {
  const { id } = await params;
  const giveaway = mockGiveaways.find(g => g.id === id);

  if (!giveaway) {
    notFound();
  }

  const isActive = giveaway.status === 'active';
  const isUpcoming = giveaway.status === 'upcoming';
  const isEnded = giveaway.status === 'ended';
  const daysLeft = Math.ceil((giveaway.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const entryPercentage = (giveaway.entryCount / giveaway.maxEntries) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/giveaways">← Back to Giveaways</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{giveaway.title}</CardTitle>
                  <CardDescription className="text-base">{giveaway.description}</CardDescription>
                </div>
                <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"}>
                  {isActive ? "Active" : isUpcoming ? "Upcoming" : "Ended"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center rounded-lg mb-4">
                <Gift className="w-24 h-24 text-blue-500" />
              </div>
              
              <p className="text-gray-700 leading-relaxed">{giveaway.longDescription}</p>
            </CardContent>
          </Card>

          {/* Prize Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Prize Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Prize Value</span>
                  <span className="text-xl font-bold text-green-600">{giveaway.prizeValue}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sponsored By</span>
                  <span className="font-medium">{giveaway.sponsor}</span>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">What&apos;s Included:</h4>
                  <ul className="space-y-2">
                    {giveaway.prizeItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Rules & Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {giveaway.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold text-sm mt-1">{index + 1}.</span>
                    <span className="text-sm text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Entry Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enter Giveaway</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Entries</span>
                  <span>{giveaway.entryCount} / {giveaway.maxEntries}</span>
                </div>
                <Progress value={entryPercentage} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Started</span>
                  </div>
                  <span className="text-sm">{giveaway.startDate.toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Ends</span>
                  </div>
                  <span className="text-sm">{giveaway.endDate.toLocaleDateString()}</span>
                </div>
                
                {isActive && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Left</span>
                    <span className="text-sm font-medium">{daysLeft} days</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              {isActive && (
                <div className="space-y-2">
                  {giveaway.userHasEntered ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">You&apos;ve entered this giveaway!</span>
                    </div>
                  ) : (
                    <Button className="w-full" size="lg">
                      Enter Giveaway
                    </Button>
                  )}
                </div>
              )}
              
              {isUpcoming && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">This giveaway starts soon!</p>
                  <Button variant="outline" className="w-full">
                    Set Reminder
                  </Button>
                </div>
              )}
              
              {isEnded && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">This giveaway has ended</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Giveaway Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{giveaway.entryCount}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{daysLeft}</div>
                  <div className="text-sm text-gray-600">Days Left</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{giveaway.prizeValue}</div>
                <div className="text-sm text-gray-600">Prize Value</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 