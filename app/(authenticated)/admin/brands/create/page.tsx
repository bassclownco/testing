'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateBrandPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle logo upload logic here
    console.log('Logo upload:', event.target.files);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image upload logic here
    console.log('Image upload:', event.target.files);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Brand Partner</h1>
          <p className="text-gray-600 mt-1">Create a new brand partnership profile</p>
        </div>
        <Link href="/admin/brands">
          <Button variant="outline">Back to Brands</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the brand{"'"}s fundamental details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input id="brand-name" placeholder="Enter brand name" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the brand and their products/services"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tournament-fishing">Tournament Fishing</SelectItem>
                        <SelectItem value="fly-fishing">Fly Fishing</SelectItem>
                        <SelectItem value="ice-fishing">Ice Fishing</SelectItem>
                        <SelectItem value="tackle-gear">Tackle & Gear</SelectItem>
                        <SelectItem value="boats-marine">Boats & Marine</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tier">Partnership Tier</Label>
                    <Select defaultValue="basic">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Brand Logo</Label>
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Click to upload logo</p>
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary contact details for partnership management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Primary contact person" />
                  </div>
                  <div>
                    <Label htmlFor="contact-title">Contact Title</Label>
                    <Input id="contact-title" placeholder="e.g., Marketing Manager" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="contact@brand.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" placeholder="https://www.brand.com" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Company address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Partnership Details */}
            <Card>
              <CardHeader>
                <CardTitle>Partnership Details</CardTitle>
                <CardDescription>Define the terms and scope of the partnership</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Annual Budget ($)</Label>
                    <Input id="budget" type="number" placeholder="10000" />
                  </div>
                  <div>
                    <Label htmlFor="commission">Commission Rate (%)</Label>
                    <Input id="commission" type="number" placeholder="10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="partnership-goals">Partnership Goals</Label>
                  <Textarea 
                    id="partnership-goals" 
                    placeholder="What does the brand hope to achieve through this partnership?"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="products">Products/Services</Label>
                  <Textarea 
                    id="products" 
                    placeholder="List the main products or services the brand offers"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="exclusive" />
                  <Label htmlFor="exclusive">Exclusive partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="contests" defaultChecked />
                  <Label htmlFor="contests">Can sponsor contests</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="giveaways" defaultChecked />
                  <Label htmlFor="giveaways">Can sponsor giveaways</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status & Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Settings</CardTitle>
              <CardDescription>Brand partnership configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Partnership Status</Label>
                <Select defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="featured-brand" />
                <Label htmlFor="featured-brand">Featured brand</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="public-profile" defaultChecked />
                <Label htmlFor="public-profile">Public profile</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" defaultChecked />
                <Label htmlFor="email-notifications">Email notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Brand social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" placeholder="https://facebook.com/brand" />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" placeholder="https://instagram.com/brand" />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input id="twitter" placeholder="https://twitter.com/brand" />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input id="youtube" placeholder="https://youtube.com/brand" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Create Brand Partnership</Button>
              <Button variant="outline" className="w-full">Save as Draft</Button>
              <Button variant="ghost" className="w-full">Preview Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 