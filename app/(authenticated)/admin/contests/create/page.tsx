import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';

export default function CreateContestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/contests">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contests
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Contest</h1>
            <p className="text-gray-600 mt-1">Set up a new contest with all the details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Create Contest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Contest Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contest Information</CardTitle>
              <CardDescription>Basic details about the contest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Contest Title</Label>
                  <Input id="title" placeholder="Enter contest title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Contest Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contest type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Contest</SelectItem>
                      <SelectItem value="photo">Photo Contest</SelectItem>
                      <SelectItem value="educational">Educational Contest</SelectItem>
                      <SelectItem value="review">Product Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the contest, rules, and requirements"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand Partner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand partner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bass-masters">Bass Masters</SelectItem>
                      <SelectItem value="river-pro">River Pro</SelectItem>
                      <SelectItem value="arctic-gear">Arctic Gear</SelectItem>
                      <SelectItem value="learn-to-fish">Learn to Fish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bass-fishing">Bass Fishing</SelectItem>
                      <SelectItem value="fly-fishing">Fly Fishing</SelectItem>
                      <SelectItem value="ice-fishing">Ice Fishing</SelectItem>
                      <SelectItem value="saltwater">Saltwater Fishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contest Timeline</CardTitle>
              <CardDescription>Set the important dates for your contest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="application-deadline">Application Deadline</Label>
                  <Input id="application-deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="judging-deadline">Judging Deadline</Label>
                  <Input id="judging-deadline" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prize Information</CardTitle>
              <CardDescription>Configure the contest rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prize-pool">Total Prize Pool ($)</Label>
                  <Input id="prize-pool" type="number" placeholder="2500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="winner-count">Number of Winners</Label>
                  <Input id="winner-count" type="number" placeholder="3" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prize-description">Prize Description</Label>
                <Textarea 
                  id="prize-description" 
                  placeholder="Describe the prizes for 1st, 2nd, 3rd place, etc."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contest Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Contest</Label>
                  <div className="text-sm text-gray-600">
                    Make this contest visible to all users
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Application</Label>
                  <div className="text-sm text-gray-600">
                    Users must apply before participating
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-approve Applications</Label>
                  <div className="text-sm text-gray-600">
                    Automatically approve all applications
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <div className="text-sm text-gray-600">
                    Send updates to participants
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participation Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-participants">Max Participants</Label>
                <Input id="max-participants" type="number" placeholder="100" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-followers">Minimum Followers</Label>
                <Input id="min-followers" type="number" placeholder="1000" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="creator-only">Creator Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="verified">Verified Users Only</SelectItem>
                    <SelectItem value="creators">Creators Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Judging Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="judging-type">Judging Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select judging method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="panel">Expert Panel</SelectItem>
                    <SelectItem value="community">Community Voting</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Panel + Community)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="criteria">Judging Criteria</Label>
                <Textarea 
                  id="criteria" 
                  placeholder="Describe how submissions will be evaluated"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 