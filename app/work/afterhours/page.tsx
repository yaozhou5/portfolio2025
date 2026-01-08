"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AfterhoursCaseStudy() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "From Swipes to Actual Dates",
    "description": "MVP redesign for a dating App targeting Gen Z",
    "author": {
      "@type": "Person",
      "name": "Shay Zhou"
    },
    "datePublished": "2025-08-01",
    "image": "https://www.shayworks.com/Afterhours_cover2.png"
  };

  // Inject structured data script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'afterhours-structured-data';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('afterhours-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Sticky Top Navigation - Minimal Style */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <Link 
              href="/" 
              className="flex items-center justify-center h-16 transition-colors duration-200 hover:opacity-70"
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M 8.5 2 L 12 8 M 15.5 2 L 12 8 M 12 8 L 12 14" 
                  stroke="#111827" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Navigation links on the right */}
            <div className="hidden md:flex items-center gap-4">
              {/* Home */}
              <Link 
                href="/" 
                className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                  pathname === '/'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                Home
              </Link>
              
              {/* About */}
              <Link 
                href="/about" 
                className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                  pathname === '/about'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                About
              </Link>
              
              {/* Resume */}
              <a
                href="https://drive.google.com/file/d/1x6-Ir7emPiEo1AfzULgPsb55T5uMlubO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                Resume
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 text-gray-900"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-[1.5px] bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
          
          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
              <Link 
                href="/" 
                className={`block px-4 py-2 rounded-full text-base ${
                  pathname === '/'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                }`}
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`block px-4 py-2 rounded-full text-base ${
                  pathname === '/about'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                }`}
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="https://drive.google.com/file/d/1x6-Ir7emPiEo1AfzULgPsb55T5uMlubO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded-full text-base text-gray-700"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>
            </div>
          )}
        </div>
      </nav>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Hero Image */}
        <div className="mb-12 md:mb-16">
          <div className="w-full bg-black rounded-[30px] overflow-hidden flex items-center justify-center">
            <img
              src="/Afterhours_cover2.png"
              alt="Afterhours App Mockup"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
          From Swipes to Actual Dates
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-6" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
          MVP redesign for a dating App targeting Gen Z
        </p>

        {/* Role and Timeline */}
        <div className="mb-8 space-y-2">
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Role:</span> UX Strategy, Visual Design, Design System
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Timeline:</span> August 2025, 1 month
          </p>
        </div>

        {/* Brief Paragraph */}
        <div className="mb-12 md:mb-16">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            A dating app startup wanted a visual refresh before launch. User research said the branding felt outdated for Gen Z. They asked for a reskin. I delivered a strategic reframe. Their real differentiator was already there, just buried. I elevated it to the hero moment, established design principles to sharpen positioning, and built a dark UI system with redesigned core flows. What started as a visual refresh became a product that actually stood out.
          </p>
        </div>

        {/* Confidential Note */}
        <div className="mb-8">
          <a
            href="mailto:hello@yaozhou.me?subject=Request:%20Dating%20App%20Case%20Study&body=Hi%20Yao,%20I'd%20like%20to%20access%20the%20full%20case%20study.%20Thanks!"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-[30px] text-white font-light hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Request Full Case Study</span>
            <span>🔒</span>
          </a>
        </div>

      </div>

    </main>
  );
}

