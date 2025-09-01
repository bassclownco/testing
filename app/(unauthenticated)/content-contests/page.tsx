'use client';

import { useState, useEffect } from 'react';
import { Contest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContestCard from '@/components/contests/ContestCard';
import { Search, Filter, Trophy, Calendar, Users, DollarSign, Tag, ArrowRight, Video, Camera, Edit, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BassFishy from '@/components/BassFishy';
import Bubbles from '@/components/Bubbles';
import WaitlistForm from '@/components/WaitlistForm';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

// Mock data for content contests
const mockContentContests: Contest[] = [
  {
    id: '1',
    title: 'Best Fishing Video Tutorial',
    description: 'Create an educational video tutorial showcasing your fishing techniques, tips, or gear reviews. Help fellow anglers improve their skills while competing for amazing prizes!',
    shortDescription: 'Create educational fishing content and win professional video equipment',
    image: '/images/video-review-thumb-1.jpg',
    prize: '$1,500 Video Equipment Package',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    applicationDeadline: '2024-02-15',
    submissionDeadline: '2024-03-15',
    status: 'open',
    category: 'Video Production',
    requirements: [
      'Original tutorial content only',
      'Minimum 5 minutes, maximum 15 minutes',
      'High definition (1080p or higher)',
      'Clear audio and narration',
      'Educational value for fishing community'
    ],
    judges: ['Content Creator Pro', 'Fishing Instructor', 'Video Production Expert'],
    maxParticipants: 50,
    currentParticipants: 23,
    rules: 'Content must be original and educational. No copyrighted material without permission. Judged on educational value, video quality, and engagement.',
    submissionGuidelines: 'Upload video in MP4 format, maximum 1GB. Include detailed description of techniques taught and target audience.',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Fishing Photography Challenge',
    description: 'Capture stunning fishing moments, landscapes, and wildlife in this photography contest. Show us the beauty of fishing through your lens.',
    shortDescription: 'Photography contest for fishing and outdoor enthusiasts',
    image: '/images/video-review-thumb-1.jpg',
    prize: '$1,000 Photography Equipment',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    applicationDeadline: '2024-03-01',
    submissionDeadline: '2024-04-15',
    status: 'open',
    category: 'Photography',
    requirements: [
      'Original photography only',
      'High resolution (minimum 2000x2000px)',
      'Fishing or outdoor theme',
      'Minimal post-processing allowed',
      'Submit up to 5 photos'
    ],
    judges: ['Professional Photographer', 'Outdoor Magazine Editor', 'Wildlife Photographer'],
    maxParticipants: 100,
    currentParticipants: 67,
    rules: 'Photos must be original and taken within contest period. Light editing allowed but no heavy manipulation. Judged on composition, technical quality, and storytelling.',
    submissionGuidelines: 'Upload in JPEG format, maximum 10MB per image. Include brief description of location and story behind each photo.',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Fishing Blog Writing Contest',
    description: 'Write compelling articles about fishing experiences, techniques, or gear reviews. Share your knowledge and stories with the fishing community.',
    shortDescription: 'Write engaging fishing articles and win writing opportunities',
    image: '/images/video-review-thumb-1.jpg',
    prize: '$500 + Publishing Opportunity',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    applicationDeadline: '2024-02-01',
    submissionDeadline: '2024-03-01',
    status: 'open',
    category: 'Writing',
    requirements: [
      'Original written content only',
      'Minimum 1,000 words',
      'Fishing-related topic',
      'Proper grammar and structure',
      'Include relevant images if available'
    ],
    judges: ['Fishing Magazine Editor', 'Content Writer', 'Fishing Expert'],
    maxParticipants: 75,
    currentParticipants: 34,
    rules: 'Content must be original and well-researched. Proper citations required for any references. Judged on writing quality, originality, and value to fishing community.',
    submissionGuidelines: 'Submit in PDF or Word format. Include title, author bio, and any supporting images. Ensure content is well-structured with clear headings.',
    createdBy: 'Bass Clown Co',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

export default function ContentContestsPage() {
  const [contests, setContests] = useState<Contest[]>(mockContentContests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contest.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || contest.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', 'Video Production', 'Photography', 'Writing'];
  const statuses = ['all', 'open', 'upcoming', 'closed'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Enhanced Coming Soon Overlay */}


      <ComingSoonOverlay 
        title="CONTENT CONTESTS"
        description="We're setting up an epic creative battleground! Our content contests will connect talented creators 
        with fishing brands for amazing collaborations and prizes."
        cta={<WaitlistForm />}
      />

      {/* Existing content remains unchanged 
      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Content Creation Contests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcase your creative skills in video, photography, and writing contests. 
            Win amazing prizes while sharing your passion for fishing with the community.
          </p>
        </div>

 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Video className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contests.filter(c => c.category === 'Video Production').length}
                </p>
                <p className="text-sm text-gray-600">Video Contests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Camera className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contests.filter(c => c.category === 'Photography').length}
                </p>
                <p className="text-sm text-gray-600">Photo Contests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Edit className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contests.filter(c => c.category === 'Writing').length}
                </p>
                <p className="text-sm text-gray-600">Writing Contests</p>
              </div>
            </CardContent>
          </Card>
        </div>


        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search contests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>


        {filteredContests.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No contests found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more contests.
            </p>
          </div>
        )}


        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Ready to showcase your creativity?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join our content creation contests and win amazing prizes while sharing your passion for fishing.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      */}
    </div>
  );
}
