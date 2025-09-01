'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Plus, Minus } from 'lucide-react';

export const PointsHistory: React.FC = () => {
  const pointsHistory = [
    {
      id: 1,
      type: 'earned',
      amount: 100,
      description: 'Contest participation - Video Challenge #47',
      date: '2024-01-15',
      time: '2:30 PM',
      status: 'completed',
    },
    {
      id: 2,
      type: 'earned',
      amount: 50,
      description: 'Video submission approved',
      date: '2024-01-14',
      time: '4:15 PM',
      status: 'completed',
    },
    {
      id: 3,
      type: 'redeemed',
      amount: -200,
      description: 'Bass Clown Co. T-shirt - 20% discount',
      date: '2024-01-12',
      time: '11:45 AM',
      status: 'completed',
    },
    {
      id: 4,
      type: 'earned',
      amount: 25,
      description: 'Monthly review completed',
      date: '2024-01-10',
      time: '9:20 AM',
      status: 'completed',
    },
    {
      id: 5,
      type: 'earned',
      amount: 75,
      description: 'Referral bonus - New member signup',
      date: '2024-01-08',
      time: '3:10 PM',
      status: 'completed',
    },
    {
      id: 6,
      type: 'redeemed',
      amount: -150,
      description: 'Contest entry fee waiver',
      date: '2024-01-05',
      time: '1:30 PM',
      status: 'completed',
    },
    {
      id: 7,
      type: 'earned',
      amount: 100,
      description: 'Contest participation - Video Challenge #46',
      date: '2024-01-03',
      time: '5:45 PM',
      status: 'completed',
    },
    {
      id: 8,
      type: 'pending',
      amount: 50,
      description: 'Video submission under review',
      date: '2024-01-02',
      time: '12:15 PM',
      status: 'pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'failed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <Plus className="w-4 h-4 text-green-400" />;
      case 'redeemed':
        return <Minus className="w-4 h-4 text-red-400" />;
      default:
        return <History className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'earned':
        return 'text-green-400';
      case 'redeemed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <History className="w-5 h-5" />
          Points History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pointsHistory.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg border border-gray-600"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-[#2D2D2D] rounded-full">
                  {getTypeIcon(transaction.type)}
                </div>
                
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-400">
                    {transaction.date} at {transaction.time}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-semibold ${getAmountColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} points
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(transaction.status)} text-white text-xs`}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Load More History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 