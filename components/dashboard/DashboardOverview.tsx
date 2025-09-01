'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Trophy, FileText, TrendingUp } from 'lucide-react';

export const DashboardOverview = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Projects',
      value: '3',
      icon: Video,
      description: 'Currently in production',
      color: 'text-blue-500'
    },
    {
      title: 'Contests Entered',
      value: '12',
      icon: Trophy,
      description: 'This month',
      color: 'text-yellow-500'
    },
    {
      title: 'Reviews Submitted',
      value: '8',
      icon: FileText,
      description: 'Awaiting approval',
      color: 'text-green-500'
    },
    {
      title: 'Total Earnings',
      value: '$1,250',
      icon: TrendingUp,
      description: 'This quarter',
      color: 'text-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-red-100">
          Here's what's happening with your projects and contests.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-[#2D2D2D] border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-400">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}; 