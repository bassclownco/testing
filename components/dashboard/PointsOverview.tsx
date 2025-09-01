'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, TrendingUp, Star, Gift } from 'lucide-react';

export const PointsOverview: React.FC = () => {
  const pointsData = {
    currentBalance: 2450,
    totalEarned: 8920,
    totalRedeemed: 6470,
    monthlyEarned: 320,
    membershipTier: 'Silver',
    nextTier: 'Gold',
    pointsToNextTier: 550,
    recentActivity: [
      { id: 1, type: 'earned', amount: 100, description: 'Contest participation', date: '2024-01-15' },
      { id: 2, type: 'earned', amount: 50, description: 'Video submission', date: '2024-01-14' },
      { id: 3, type: 'redeemed', amount: -200, description: 'Merchandise discount', date: '2024-01-12' },
    ]
  };

  const tierProgress = (pointsData.currentBalance / (pointsData.currentBalance + pointsData.pointsToNextTier)) * 100;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return 'bg-orange-600';
      case 'Silver':
        return 'bg-gray-400';
      case 'Gold':
        return 'bg-yellow-500';
      case 'Platinum':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          Points Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
            <div className="text-2xl font-bold text-white">{pointsData.currentBalance}</div>
            <div className="text-sm text-gray-400">Current Balance</div>
          </div>
          
          <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
            <div className="text-2xl font-bold text-green-400">{pointsData.totalEarned}</div>
            <div className="text-sm text-gray-400">Total Earned</div>
          </div>
          
          <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
            <div className="text-2xl font-bold text-red-400">{pointsData.totalRedeemed}</div>
            <div className="text-sm text-gray-400">Total Redeemed</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-medium">Membership Tier</span>
            </div>
            <Badge 
              variant="secondary" 
              className={`${getTierColor(pointsData.membershipTier)} text-white`}
            >
              {pointsData.membershipTier}
            </Badge>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Progress to {pointsData.nextTier}
              </span>
              <span className="text-sm text-white">
                {pointsData.pointsToNextTier} points needed
              </span>
            </div>
            <Progress value={tierProgress} className="h-2" />
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">This Month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Points Earned</span>
            <span className="text-green-400 font-semibold">+{pointsData.monthlyEarned}</span>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Ways to Earn</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Contest Participation</span>
              <span className="text-white">100 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Video Submission</span>
              <span className="text-white">50 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Review</span>
              <span className="text-white">25 points</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 