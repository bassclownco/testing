'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    contestUpdates: true,
    newProjects: false,
    marketingEmails: false,
    pointsUpdates: true,
    billingAlerts: true,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    // Handle save
    console.log('Notification settings saved:', settings);
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="text-gray-300">
              Email Notifications
            </Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="contestUpdates" className="text-gray-300">
              Contest Updates
            </Label>
            <Switch
              id="contestUpdates"
              checked={settings.contestUpdates}
              onCheckedChange={() => handleToggle('contestUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="newProjects" className="text-gray-300">
              New Project Notifications
            </Label>
            <Switch
              id="newProjects"
              checked={settings.newProjects}
              onCheckedChange={() => handleToggle('newProjects')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="marketingEmails" className="text-gray-300">
              Marketing Emails
            </Label>
            <Switch
              id="marketingEmails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="pointsUpdates" className="text-gray-300">
              Points Updates
            </Label>
            <Switch
              id="pointsUpdates"
              checked={settings.pointsUpdates}
              onCheckedChange={() => handleToggle('pointsUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="billingAlerts" className="text-gray-300">
              Billing Alerts
            </Label>
            <Switch
              id="billingAlerts"
              checked={settings.billingAlerts}
              onCheckedChange={() => handleToggle('billingAlerts')}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}; 