import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, Clock, Star } from "lucide-react";
import { CTASection } from '@/components/home/CTASection';
import HookLine from "@/components/HookLine";
import BassFishy from "@/components/BassFishy";
import Bubbles from "@/components/Bubbles";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert tips, industry insights, and behind-the-scenes content from the Bass Clown Co team.',
  alternates: {
    canonical: 'https://bassclown.com/blog',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

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
  const blogPosts: any[] = []; // Empty - ready for blog posts API

  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      {/* Current simple version */}
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="font-phosphate text-5xl md:text-7xl tracking-wider text-cream uppercase mb-4 text-shadow-lg title-text">
          THE BASS CLOWN BLOG
        </h1>
        <p className="text-lg md:text-xl tracking-wide text-cream/90 font-phosphate max-w-3xl mx-auto title-text mb-8">
          Expert tips, industry insights, and behind-the-scenes content from the Bass Clown Co team.
        </p>
        <p className="text-cream/80 text-lg">
          Blog posts coming soon!
        </p>
      </div>
      
      {/* TODO: Uncomment when blog API is ready
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
      
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-12">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-[#2D2D2D] rounded-lg overflow-hidden shadow-xl">
                  <div className="relative h-60">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center mb-4 text-sm text-cream/70">
                      <div className="flex items-center mr-4 mb-1 md:mb-0">
                        <Calendar className="h-4 w-4 mr-1.5 text-red-500" />
                        {post.date}
                      </div>
                      <div className="flex items-center mr-4 mb-1 md:mb-0">
                        <User className="h-4 w-4 mr-1.5 text-red-500" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1.5 text-red-500" />
                        {post.category}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-phosphate text-cream mb-3 title-text hover:text-red-500 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className="text-cream/80 mb-6 leading-relaxed">{post.excerpt}</p>
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="inline-block bg-red-600 text-white font-phosphate py-2 px-6 rounded-md hover:bg-red-700 transition-colors text-lg"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <a 
                  href="#" 
                  className="px-4 py-2 border border-slate-700 text-cream/80 rounded-l-md hover:bg-slate-700 transition-colors"
                >
                  Previous
                </a>
                <a 
                  href="#" 
                  className="px-4 py-2 border-y border-slate-700 text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  1
                </a>
                <a 
                  href="#" 
                  className="px-4 py-2 border border-slate-700 text-cream/80 hover:bg-slate-700 transition-colors"
                >
                  2
                </a>
                <a 
                  href="#" 
                  className="px-4 py-2 border-y border-r border-slate-700 text-cream/80 rounded-r-md hover:bg-slate-700 transition-colors"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
          
          <aside className="md:col-span-1 space-y-8">
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
            
            <div className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl">
              <h3 className="text-xl md:text-2xl font-phosphate text-cream mb-4 title-text">Recent Posts</h3>
              <ul className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <li key={post.id} className="border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/blog/${post.id}`} className="group">
                      <h4 className="font-semibold text-cream group-hover:text-red-500 transition-colors mb-1">{post.title}</h4>
                      <div className="text-xs text-cream/70 flex items-center">
                        <Calendar className="h-3 w-3 mr-1.5 text-red-500" />
                        {post.date}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      */}
      
      <CTASection />
    </main>
  );
}
