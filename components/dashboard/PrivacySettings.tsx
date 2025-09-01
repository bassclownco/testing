'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Save, Trash2 } from 'lucide-react';

export const PrivacySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    showEmail: false,
    showProjects: true,
    allowDataCollection: false,
    showOnlineStatus: true,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    // Handle save
    console.log('Privacy settings saved:', settings);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Account deletion requested');
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="profileVisibility" className="text-gray-300">
              Public Profile
            </Label>
            <Switch
              id="profileVisibility"
              checked={settings.profileVisibility}
              onCheckedChange={() => handleToggle('profileVisibility')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="showEmail" className="text-gray-300">
              Show Email Address
            </Label>
            <Switch
              id="showEmail"
              checked={settings.showEmail}
              onCheckedChange={() => handleToggle('showEmail')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="showProjects" className="text-gray-300">
              Show My Projects
            </Label>
            <Switch
              id="showProjects"
              checked={settings.showProjects}
              onCheckedChange={() => handleToggle('showProjects')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="allowDataCollection" className="text-gray-300">
              Allow Data Collection
            </Label>
            <Switch
              id="allowDataCollection"
              checked={settings.allowDataCollection}
              onCheckedChange={() => handleToggle('allowDataCollection')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="showOnlineStatus" className="text-gray-300">
              Show Online Status
            </Label>
            <Switch
              id="showOnlineStatus"
              checked={settings.showOnlineStatus}
              onCheckedChange={() => handleToggle('showOnlineStatus')}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleSave}
            className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Privacy Settings
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#2D2D2D] border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}; 