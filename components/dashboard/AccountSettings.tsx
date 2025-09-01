'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { Save, Edit } from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Account settings updated:', formData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-[#2D2D2D] border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Account Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={!isEditing}
              className="bg-[#1A1A1A] border-gray-600 text-white disabled:opacity-50"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!isEditing}
              className="bg-[#1A1A1A] border-gray-600 text-white disabled:opacity-50"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 