'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Video, Star, TrendingUp, Award } from 'lucide-react';

export const ProfileStats = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Projects Completed',
      value: '15',
      icon: Video,
      color: 'text-blue-500'
    },
    {
      label: 'Contests Won',
      value: '3',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      label: 'Total Earnings',
      value: '$2,450',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      label: 'Average Rating',
      value: '4.8',
      icon: Star,
      color: 'text-red-500'
    }
  ];

  const achievements = [
    {
      title: 'First Video',
      description: 'Completed your first video project',
      icon: Video,
      earned: true,
      date: '2024-01-20'
    },
    {
      title: 'Contest Winner',
      description: 'Won your first contest',
      icon: Trophy,
      earned: true,
      date: '2024-02-15'
    },
    {
      title: 'Top Reviewer',
      description: 'Submitted 10+ product reviews',
      icon: Star,
      earned: true,
      date: '2024-03-01'
    },
    {
      title: 'Community Champion',
      description: 'Helped 50+ community members',
      icon: Award,
      earned: false,
      date: null
    }
  ];

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'bass-admin': return 'Bass Admin';
      case 'brand-admin': return 'Brand Admin';
      case 'member': return 'Member';
      case 'guest': return 'Guest';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'bass-admin': return 'bg-red-600';
      case 'brand-admin': return 'bg-purple-600';
      case 'member': return 'bg-blue-600';
      case 'guest': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Summary */}
      <Card className="bg-[#2D2D2D] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Profile Summary</span>
            <Badge className={`${getRoleBadgeColor(user?.role || '')} text-white`}>
              {getRoleDisplayName(user?.role || '')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar size={16} />
            <span>Joined {user?.joinDate}</span>
          </div>
          <div className="text-sm text-gray-300">
            Active member of the Bass Clown Co community, contributing to video production and content creation in the fishing industry.
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="bg-[#2D2D2D] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm text-gray-300">{stat.label}</span>
                </div>
                <span className="text-lg font-semibold text-white">{stat.value}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-[#2D2D2D] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                achievement.earned ? 'bg-[#1A1A1A]' : 'bg-gray-800/30'
              }`}>
                <div className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.earned ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      Earned on {achievement.date}
                    </p>
                  )}
                </div>
                {achievement.earned && (
                  <Badge className="bg-green-600 text-white text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}; 