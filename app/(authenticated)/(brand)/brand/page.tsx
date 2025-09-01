import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ContestStatus } from '@/components/dashboard/ContestStatus';

export const metadata: Metadata = {
  title: 'Brand Dashboard - Bass Clown Co',
  description: 'Brand dashboard for managing contests, campaigns, and content.',
};

export default function BrandDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Brand Dashboard Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Brand Dashboard</h1>
          <p className="text-gray-600 mb-4">Manage your contests, campaigns, and brand content</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Active Contests</h3>
              <p className="text-2xl font-bold text-blue-700">3</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Total Entries</h3>
              <p className="text-2xl font-bold text-green-700">247</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Pending Review</h3>
              <p className="text-2xl font-bold text-purple-700">12</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900">This Month</h3>
              <p className="text-2xl font-bold text-orange-700">89</p>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <RecentProjects />
          </div>
        </div>
        
        {/* Contest Status */}
        <ContestStatus />
      </div>
    </DashboardLayout>
  );
} 