'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, ShoppingCart, Percent } from 'lucide-react';

export const PointsRewards: React.FC = () => {
  const availableRewards = [
    {
      id: 1,
      title: 'Contest Entry Fee Waiver',
      description: 'Skip the entry fee for any video contest',
      pointsCost: 150,
      type: 'service',
      available: true,
      icon: '🎯',
    },
    {
      id: 2,
      title: '20% Merchandise Discount',
      description: 'Get 20% off any Bass Clown Co. merchandise',
      pointsCost: 200,
      type: 'discount',
      available: true,
      icon: '🛍️',
    },
    {
      id: 3,
      title: 'Bass Clown Co. T-Shirt',
      description: 'Official Bass Clown Co. branded t-shirt',
      pointsCost: 500,
      type: 'merchandise',
      available: true,
      icon: '👕',
    },
    {
      id: 4,
      title: 'Video Review Priority',
      description: 'Get your video reviewed within 24 hours',
      pointsCost: 300,
      type: 'service',
      available: true,
      icon: '⚡',
    },
    {
      id: 5,
      title: 'Custom Video Consultation',
      description: '30-minute one-on-one video consultation',
      pointsCost: 800,
      type: 'service',
      available: true,
      icon: '🎬',
    },
    {
      id: 6,
      title: 'Bass Clown Co. Hoodie',
      description: 'Premium Bass Clown Co. hoodie',
      pointsCost: 750,
      type: 'merchandise',
      available: false,
      icon: '🧥',
    },
  ];

  const currentPoints = 2450; // This would come from context/props in real app

  const handleRedeem = (rewardId: number, pointsCost: number) => {
    if (currentPoints >= pointsCost) {
      // Handle redemption
      console.log(`Redeeming reward ${rewardId} for ${pointsCost} points`);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service':
        return 'bg-blue-600';
      case 'discount':
        return 'bg-green-600';
      case 'merchandise':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Gift className="w-4 h-4" />;
      case 'discount':
        return <Percent className="w-4 h-4" />;
      case 'merchandise':
        return <ShoppingCart className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-400" />
          Available Rewards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availableRewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 bg-[#1A1A1A] rounded-lg border border-gray-600 ${
                !reward.available ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{reward.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{reward.title}</h3>
                    <p className="text-sm text-gray-400">{reward.description}</p>
                  </div>
                </div>
                
                <Badge 
                  variant="secondary" 
                  className={`${getTypeColor(reward.type)} text-white flex items-center gap-1`}
                >
                  {getTypeIcon(reward.type)}
                  {reward.type}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">
                    {reward.pointsCost} points
                  </span>
                  {!reward.available && (
                    <Badge variant="secondary" className="bg-gray-600 text-white">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                
                <Button
                  size="sm"
                  onClick={() => handleRedeem(reward.id, reward.pointsCost)}
                  disabled={!reward.available || currentPoints < reward.pointsCost}
                  className={`${
                    currentPoints >= reward.pointsCost && reward.available
                      ? 'bg-[#8B4513] hover:bg-[#A0522D]'
                      : 'bg-gray-600 cursor-not-allowed'
                  } text-white`}
                >
                  {currentPoints >= reward.pointsCost && reward.available ? 'Redeem' : 'Not Enough Points'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            View All Rewards
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 