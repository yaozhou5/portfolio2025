"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dock from "../../components/Dock";
import { VscHome, VscFolder, VscAccount } from "react-icons/vsc";

export default function ProjectThreeCaseStudy() {
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
    <main className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Hero Image */}
        <div className="mb-12 md:mb-16">
          <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/Hilink Mockup.png"
              alt="HiLink Co-Presenting Feature Mockup"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight italic" style={{ fontFamily: "'Crimson Pro'", fontWeight: 400 }}>
          Faster Co-Presenting, Less Friction
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-6" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
          Streamlining Virtual Classroom Interactions
        </p>

        {/* Role and Timeline */}
        <div className="mb-8 space-y-2">
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Role:</span> Lead Product Designer
          </p>
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Focus:</span> UX Strategy, Interaction Design, Design Systems
          </p>
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Timeline:</span> April 2023 · 2 weeks
          </p>
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Team:</span> 1 Product Manager, 6 Engineers
          </p>
          <p className="text-base md:text-lg text-gray-400" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-500 font-semibold">Status:</span> Shipped
          </p>
        </div>

        {/* Brief Paragraph */}
        <div className="mb-12 md:mb-16 space-y-6">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            HiLink is a B2B EdTech platform powering live virtual classrooms for K–8 education companies. During real-time classes, teachers often need to share control with assistants, guest instructors, or students — instantly and without disrupting the session.
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            I led the design of Co-Presenting Mode, a streamlined interaction that allows hosts to promote participants to co-presenters in seconds. The solution focused on speed, clarity, and reversibility, making collaboration feel natural while preserving structure and safety in a live classroom.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <a
            href="https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v/0772affb-c413-4015-8162-61111c23d80f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 rounded-[24px] text-white font-light hover:bg-gray-800 hover:border-gray-600 transition-colors"
            style={{ fontFamily: "'Post Grotesk', sans-serif" }}
          >
            <span>View Full Case Study Presentation</span>
            <span>→</span>
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

