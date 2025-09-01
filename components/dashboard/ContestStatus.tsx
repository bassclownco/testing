'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, Award } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  deadline: string;
  prize: string;
  participants: number;
  status: 'Active' | 'Submitted' | 'Judging' | 'Closed';
  submitted: boolean;
}

export const ContestStatus = () => {
  const contests: Contest[] = [
    {
      id: '1',
      title: 'Best Bass Fishing Technique 2024',
      deadline: 'March 15, 2024',
      prize: '$1,000',
      participants: 342,
      status: 'Active',
      submitted: false
    },
    {
      id: '2',
      title: 'Spring Fishing Adventure',
      deadline: 'March 20, 2024',
      prize: '$500',
      participants: 156,
      status: 'Submitted',
      submitted: true
    },
    {
      id: '3',
      title: 'Tackle Box Setup Challenge',
      deadline: 'March 25, 2024',
      prize: '$750',
      participants: 89,
      status: 'Active',
      submitted: false
    },
    {
      id: '4',
      title: 'Winter Fishing Stories',
      deadline: 'February 28, 2024',
      prize: '$300',
      participants: 234,
      status: 'Judging',
      submitted: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Submitted': return 'bg-blue-500';
      case 'Judging': return 'bg-yellow-500';
      case 'Closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Contest Status</span>
        </CardTitle>
        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          View All Contests
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contests.map((contest) => (
            <div key={contest.id} className="p-4 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-white text-sm">{contest.title}</h3>
                <Badge className={`${getStatusColor(contest.status)} text-white text-xs`}>
                  {contest.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar size={12} />
                  <span>Deadline: {contest.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award size={12} />
                  <span>Prize: {contest.prize}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={12} />
                  <span>{contest.participants} participants</span>
                </div>
              </div>
              
              <div className="mt-4">
                {contest.submitted ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="h-2 w-2 bg-green-400 rounded-full" />
                    <span className="text-xs">Submitted</span>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={contest.status === 'Closed'}
                  >
                    {contest.status === 'Closed' ? 'Contest Closed' : 'Submit Entry'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 