import type { Metadata } from 'next';
import Link from "next/link";
import { CTASection } from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Shop for Bass Clown Co branded merchandise and fishing accessories.',
  alternates: {
    canonical: 'https://bassclown.com/store',
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


export default function Store() {
  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-cream relative">
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="font-phosphate text-5xl md:text-7xl tracking-wider text-cream uppercase mb-4 text-shadow-lg title-text">
          THE BASS CLOWN STORE
        </h1>
        <p className="text-lg md:text-xl tracking-wide text-cream/90 font-phosphate max-w-3xl mx-auto title-text mb-8">
          Shop for Bass Clown Co branded merchandise and fishing accessories. 
          Show your love for fishing content with our quality products.
        </p>
        <p className="text-cream/80 text-lg mb-8">
          Products coming soon!
        </p>
        <div className="bg-[#2D2D2D] p-8 md:p-12 rounded-lg text-center shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-phosphate text-cream mb-4 title-text">Looking for Custom Merchandise?</h2>
          <p className="text-cream/80 mb-6 leading-relaxed">
            We offer custom-branded merchandise for fishing brands and organizations. 
            Create promotional items that showcase your brand with our quality products.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-phosphate title-text px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all text-lg"
          >
            Contact for Custom Orders
          </Link>
        </div>
      </div>
      <CTASection />
    </main>
  );
}
