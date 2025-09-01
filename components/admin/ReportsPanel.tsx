'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Download, FileText, TrendingUp, Users, Trophy, DollarSign, Calendar } from 'lucide-react';

export default function ReportsPanel() {
  const reportTypes = [
    {
      id: 'user-activity',
      title: 'User Activity Report',
      description: 'Detailed analysis of user engagement and activity patterns',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 'contest-performance',
      title: 'Contest Performance Report',
      description: 'Analytics on contest participation, submissions, and success rates',
      icon: Trophy,
      color: 'bg-yellow-500',
    },
    {
      id: 'revenue-analysis',
      title: 'Revenue Analysis',
      description: 'Financial performance and subscription revenue breakdown',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      id: 'platform-metrics',
      title: 'Platform Metrics',
      description: 'Overall platform health and key performance indicators',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  const recentReports = [
    {
      id: '1',
      title: 'Monthly User Activity - January 2024',
      type: 'User Activity',
      generated: '2024-01-31',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Contest Performance Q1 2024',
      type: 'Contest Performance',
      generated: '2024-01-28',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Revenue Analysis - January 2024',
      type: 'Revenue Analysis',
      generated: '2024-01-25',
      status: 'processing',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Generated this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contest Entries</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Create comprehensive reports for platform analysis and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${report.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                        <Button className="w-full" variant="outline">
                          <BarChart className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                View and download previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500">{report.type} • Generated on {report.generated}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 