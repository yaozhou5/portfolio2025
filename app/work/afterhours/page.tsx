"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dock from "../../components/Dock";
import { VscHome, VscFolder, VscAccount } from "react-icons/vsc";

export default function AfterhoursCaseStudy() {
  const router = useRouter();

  // Navigation handlers for Dock
  const handleHomeClick = () => {
    router.push('/');
  };

  const handleWorkClick = () => {
    router.push('/work');
  };

  const handleAboutClick = () => {
    router.push('/about');
  };

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: handleHomeClick },
    { icon: <VscFolder size={18} />, label: 'Work', onClick: handleWorkClick },
    { icon: <VscAccount size={18} />, label: 'About', onClick: handleAboutClick },
  ];

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
    <main className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Hero Image */}
        <div className="mb-12 md:mb-16">
          <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/Afterhours_cover2.png"
              alt="Afterhours App Mockup"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight not-italic" style={{ fontFamily: "'Kumlien Pro'", fontWeight: 400 }}>
          From Swipes to Actual Dates
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-6" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
          MVP redesign for a dating App targeting Gen Z
        </p>

        {/* Role and Timeline */}
        <div className="mb-8 space-y-2">
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Role:</span> UX Strategy, Visual Design, Design System
          </p>
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Timeline:</span> August 2025, 1 month
          </p>
        </div>

        {/* Brief Paragraph */}
        <div className="mb-12 md:mb-16">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            A dating app startup wanted a visual refresh before launch. User research said the branding felt outdated for Gen Z. They asked for a reskin. I delivered a strategic reframe. Their real differentiator was already there, just buried. I elevated it to the hero moment, established design principles to sharpen positioning, and built a dark UI system with redesigned core flows. What started as a visual refresh became a product that actually stood out.
          </p>
        </div>

        {/* Confidential Note */}
        <div className="mb-8">
          <a
            href="mailto:hello@yaozhou.me?subject=Request:%20Dating%20App%20Case%20Study&body=Hi%20Yao,%20I'd%20like%20to%20access%20the%20full%20case%20study.%20Thanks!"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 rounded-[24px] text-white font-light hover:bg-gray-800 hover:border-gray-600 transition-colors"
          >
            <span>Request Full Case Study</span>
            <span>🔒</span>
          </a>
        </div>

        {/* Back to Work */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/work"
            className="text-gray-400 hover:text-white transition-colors text-sm font-light"
          >
            ← Back to Work
          </Link>
        </div>
      </div>

      {/* Dock Navigation */}
      <Dock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={40}
      />
    </main>
  );
}

