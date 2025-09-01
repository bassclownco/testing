'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function CreateGiveawayPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image upload logic here
    console.log('Image upload:', event.target.files);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Giveaway</h1>
          <p className="text-gray-600 mt-1">Set up a new giveaway with prizes and entry rules</p>
        </div>
        <Link href="/admin/giveaways">
          <Button variant="outline">Back to Giveaways</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Set up the fundamental details of your giveaway</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Giveaway Title</Label>
                  <Input id="title" placeholder="Enter giveaway title" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the giveaway and its prizes"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Giveaway Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product Giveaway</SelectItem>
                        <SelectItem value="bundle">Bundle Giveaway</SelectItem>
                        <SelectItem value="experience">Experience Giveaway</SelectItem>
                        <SelectItem value="digital">Digital Giveaway</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="brand">Partner Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bass-masters">Bass Masters</SelectItem>
                        <SelectItem value="river-pro">River Pro</SelectItem>
                        <SelectItem value="tackle-pro">Tackle Pro</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prize Information */}
            <Card>
              <CardHeader>
                <CardTitle>Prize Information</CardTitle>
                <CardDescription>Define the prizes and their values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prize-name">Prize Name</Label>
                    <Input id="prize-name" placeholder="e.g., Premium Fishing Rod" />
                  </div>
                  <div>
                    <Label htmlFor="prize-value">Prize Value ($)</Label>
                    <Input id="prize-value" type="number" placeholder="500" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="prize-description">Prize Description</Label>
                  <Textarea 
                    id="prize-description" 
                    placeholder="Detailed description of the prize"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Prize Images</Label>
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Click to upload images</p>
                        <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Entry Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Entry Rules</CardTitle>
                <CardDescription>Configure how users can enter the giveaway</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-entries">Maximum Entries</Label>
                    <Input id="max-entries" type="number" placeholder="1000" />
                  </div>
                  <div>
                    <Label htmlFor="entries-per-user">Entries per User</Label>
                    <Input id="entries-per-user" type="number" placeholder="1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="entry-requirements">Entry Requirements</Label>
                  <Textarea 
                    id="entry-requirements" 
                    placeholder="List the requirements for entering (e.g., follow social media, share post, etc.)"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-required" />
                  <Label htmlFor="email-required">Require email address</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="phone-required" />
                  <Label htmlFor="phone-required">Require phone number</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Set the giveaway timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : 'Select start date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : 'Select end date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-draw" />
                <Label htmlFor="auto-draw">Auto-draw winner</Label>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Additional giveaway configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="featured" />
                <Label htmlFor="featured">Feature this giveaway</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="public" defaultChecked />
                <Label htmlFor="public">Public giveaway</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Send notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Create Giveaway</Button>
              <Button variant="outline" className="w-full">Save as Draft</Button>
              <Button variant="ghost" className="w-full">Preview</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 