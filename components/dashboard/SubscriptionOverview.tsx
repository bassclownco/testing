'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, CreditCard, Crown, Users } from 'lucide-react';

export const SubscriptionOverview: React.FC = () => {
  const subscription = {
    plan: 'Pro',
    status: 'Active',
    billingCycle: 'Monthly',
    nextBillingDate: '2024-02-15',
    amount: 29.99,
    currency: 'USD',
    features: {
      projectLimit: 10,
      currentProjects: 3,
      storageLimit: 100, // GB
      storageUsed: 23.5, // GB
      videoUploads: 'Unlimited',
      collaborators: 5,
    }
  };

  const progressPercentage = (subscription.features.currentProjects / subscription.features.projectLimit) * 100;
  const storagePercentage = (subscription.features.storageUsed / subscription.features.storageLimit) * 100;

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Current Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{subscription.plan} Plan</h3>
            <p className="text-gray-400">{subscription.billingCycle} billing</p>
          </div>
          <Badge variant="secondary" className="bg-green-600 text-white">
            {subscription.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Monthly Cost</p>
              <p className="text-white font-semibold">${subscription.amount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Next Billing</p>
              <p className="text-white font-semibold">{subscription.nextBillingDate}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Projects Used</span>
              <span className="text-sm text-white">
                {subscription.features.currentProjects} / {subscription.features.projectLimit}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Storage Used</span>
              <span className="text-sm text-white">
                {subscription.features.storageUsed} GB / {subscription.features.storageLimit} GB
              </span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-600">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Collaborators</p>
              <p className="text-white font-semibold">{subscription.features.collaborators}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-gray-400">📹</div>
            <div>
              <p className="text-sm text-gray-400">Video Uploads</p>
              <p className="text-white font-semibold">{subscription.features.videoUploads}</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
            Change Plan
          </Button>
          <Button variant="destructive" className="flex-1">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 