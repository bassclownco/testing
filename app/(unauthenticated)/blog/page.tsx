import type { Metadata } from 'next';
import { CTASection } from '@/components/home/CTASection';

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


export default function Blog() {
  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
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
      
      <CTASection />
    </main>
  );
}
