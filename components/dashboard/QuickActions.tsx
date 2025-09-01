'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Edit, MessageCircle } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'New Project',
      description: 'Start a new video project',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Upload Content',
      description: 'Upload video or images',
      icon: Upload,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Submit Review',
      description: 'Write a product review',
      icon: Edit,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: MessageCircle,
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start h-auto p-4 ${action.color} text-white hover:text-white`}
            >
              <div className="flex items-center space-x-4">
                <Icon size={20} />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}; 