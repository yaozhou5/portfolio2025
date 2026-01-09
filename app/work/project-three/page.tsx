"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedLogo from "../../components/AnimatedLogo";

export default function ProjectThreeCaseStudy() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Faster Co-Presenting, Less Friction",
    "description": "Streamlining Virtual Classroom Interactions",
    "author": {
      "@type": "Person",
      "name": "Shay Zhou"
    },
    "datePublished": "2023-04-01",
    "image": "https://www.shayworks.com/Hilink Mockup.png"
  };

  // Inject structured data script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'project-three-structured-data';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('project-three-structured-data');
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
            <AnimatedLogo />

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
              src="/Hilink Mockup.png"
              alt="HiLink Co-Presenting Feature Mockup"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
          Faster Co-Presenting, Less Friction
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-6" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
          Streamlining Virtual Classroom Interactions
        </p>

        {/* Role and Timeline */}
        <div className="mb-8 space-y-2">
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Role:</span> Lead Product Designer
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Focus:</span> UX Strategy, Interaction Design, Design Systems
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Timeline:</span> April 2023 · 2 weeks
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Team:</span> 1 Product Manager, 6 Engineers
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Status:</span> Shipped
          </p>
        </div>

        {/* Brief Paragraph */}
        <div className="mb-12 md:mb-16 space-y-6">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            HiLink is a B2B EdTech platform powering live virtual classrooms for K–8 education companies. During real-time classes, teachers often need to share control with assistants, guest instructors, or students — instantly and without disrupting the session.
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            I led the design of Co-Presenting Mode, a streamlined interaction that allows hosts to promote participants to co-presenters in seconds. The solution focused on speed, clarity, and reversibility, making collaboration feel natural while preserving structure and safety in a live classroom.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <a
            href="https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v/0772affb-c413-4015-8162-61111c23d80f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-[30px] text-white hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
          >
            <span>View Full Case Study Presentation</span>
            <span>→</span>
          </a>
        </div>

      </div>

    </main>
  );
}

