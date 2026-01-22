'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag } from "lucide-react";
import { CTASection } from '@/components/home/CTASection';
import HookLine from "@/components/HookLine";
import { Skeleton } from '@/components/ui/skeleton';

// Metadata moved to layout or removed for client component

// TODO: Replace with API call to fetch blog posts
// const blogPosts: any[] = []; // Empty - ready for blog posts API

/* Sample blog posts data - for future use when blog API is ready
const blogPosts = [
  {
    id: 1,
    title: "5 Essential Tips for Effective Fishing Product Videos",
    excerpt: "Learn how to showcase your fishing products in the most compelling way with these expert video production tips.",
    date: "May 5, 2025",
    author: "Alex Rivers",
    category: "Video Production",
    image: "/images/assets/bass-clown-co-fish-chase.png"
  },
  {
    id: 2,
    title: "Behind the Scenes: Our Recent Lure Launch Campaign",
    excerpt: "Take a look at how we created an engaging video series for a major fishing lure manufacturer's new product line.",
    date: "April 28, 2025",
    author: "Morgan Lakes",
    category: "Case Studies",
    image: "/images/assets/bass-taking-picture.svg"
  },
  {
    id: 3,
    title: "How Video Content Is Transforming the Fishing Industry",
    excerpt: "Explore the growing impact of video marketing on fishing brands and consumer behavior in the digital age.",
    date: "April 15, 2025",
    author: "Jordan Streams",
    category: "Industry Insights",
    image: "/images/assets/video-reel-1.svg"
  },
  {
    id: 4,
    title: "Creating Authentic Fishing Stories That Resonate",
    excerpt: "Discover the art of storytelling in fishing videos and how it can strengthen your brand's connection with anglers.",
    date: "April 3, 2025",
    author: "Taylor Brooks",
    category: "Content Strategy",
    image: "/images/assets/bubbles.svg"
  },
  {
    id: 5,
    title: "Video Review Ethics: Our Approach to Honest Product Coverage",
    excerpt: "Learn about our philosophy and practices for creating fishing product review videos with integrity.",
    date: "March 22, 2025",
    author: "Alex Rivers",
    category: "Reviews",
    image: "/images/assets/bass-clown-co-fish-chase.png"
  },
  {
    id: 6,
    title: "The Technical Side: Equipment We Use for Water-Based Filming",
    excerpt: "A detailed look at our specialized video gear for capturing stunning footage on and around water.",
    date: "March 10, 2025",
    author: "Morgan Lakes",
    category: "Equipment",
    image: "/images/assets/bass-taking-picture.svg"
  },
];
*/

const categories = [
  "Video Production",
  "Case Studies",
  "Industry Insights",
  "Content Strategy",
  "Reviews",
  "Equipment"
];

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?published=true&limit=50', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const result = await response.json();

      if (result.success && result.data?.posts) {
        setBlogPosts(result.data.posts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      {/* Hero Section */}
      <section 
        id="blog-hero" 
        className="relative min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-20 px-4"
        style={{ backgroundColor: '#2C3E50' }}
      >
        <HookLine
          size={80}
          color="#ECE9D9"
          className="absolute top-0 left-1/2 -translate-x-1/2 z-[1]"
        />
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="font-phosphate text-5xl md:text-7xl tracking-wider text-cream uppercase mb-4 text-shadow-lg title-text">
            THE BASS CLOWN BLOG
          </h1>
          <p className="text-lg md:text-xl tracking-wide text-cream/90 font-phosphate max-w-3xl title-text">
            Expert tips, industry insights, and behind-the-scenes content from the Bass Clown Co team.
          </p>
        </div>
      </section>
      
      {/* Main Blog Content Area */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#2D2D2D] rounded-lg overflow-hidden">
                  <Skeleton className="h-60 w-full" />
                  <div className="p-6 md:p-8">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
            <aside className="md:col-span-1">
              <Skeleton className="h-64 w-full rounded-lg" />
            </aside>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-phosphate text-cream mb-4 title-text">Blog Coming Soon!</h2>
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              We're working on exciting content to share with you. Check back soon for expert tips, 
              industry insights, and behind-the-scenes stories from the Bass Clown Co team.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Blog Posts Column */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-12">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-[#2D2D2D] rounded-lg overflow-hidden shadow-xl">
                      {post.featuredImage && (
                        <div className="relative h-60">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center mb-4 text-sm text-cream/70">
                          <div className="flex items-center mr-4 mb-1 md:mb-0">
                            <Calendar className="h-4 w-4 mr-1.5 text-red-500" />
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                          </div>
                          {post.authorName && (
                            <div className="flex items-center mr-4 mb-1 md:mb-0">
                              <User className="h-4 w-4 mr-1.5 text-red-500" />
                              {post.authorName}
                            </div>
                          )}
                          {post.category && (
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-1.5 text-red-500" />
                              {post.category}
                            </div>
                          )}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-phosphate text-cream mb-3 title-text hover:text-red-500 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        {post.excerpt && (
                          <p className="text-cream/80 mb-6 leading-relaxed">{post.excerpt}</p>
                        )}
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="inline-block bg-red-600 text-white font-phosphate py-2 px-6 rounded-md hover:bg-red-700 transition-colors text-lg"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sidebar Column */}
              <aside className="md:col-span-1 space-y-8">
                {/* Categories */}
                <div className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl">
                  <h3 className="text-xl md:text-2xl font-phosphate text-cream mb-4 title-text">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          className="text-cream/80 hover:text-red-500 transition-colors flex items-center group"
                        >
                          <Tag className="h-4 w-4 mr-2 text-red-500 group-hover:text-red-400 transition-colors" />
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </>
        )}
      </section>
      
      <CTASection />
    </main>
  );
}
