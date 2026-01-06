"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Dock from "../components/Dock";
import { VscHome, VscFolder, VscAccount } from "react-icons/vsc";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function About() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      const ref = sectionRefs.current[key];
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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

  const timelineEvents = [
    { year: '2012', event: 'Wrote my first theatre play' },
    { year: '2015', event: 'Made my first short film' },
    { year: '2017', event: 'Moved to San Francisco' },
    { year: '2018', event: 'Took my first UX design class' },
    { year: '2020', event: 'Finished film school' },
    { year: '2020', event: 'Started my second master\'s' },
    { year: '2020', event: 'Moved to New York City' },
    { year: '2021', event: 'Shipped my first design prototype' },
    { year: '2023', event: 'Moved to Chicago' },
    { year: '2024', event: 'Co-founded a startup' },
    { year: '2025', event: 'Moved to Amsterdam' },
  ];

  // Calculate spacing between events based on time gaps
  const getTimelineSpacing = (index: number) => {
    if (index === 0) return 0; // First item has no spacing before it
    
    const currentYear = parseInt(timelineEvents[index].year);
    const previousYear = parseInt(timelineEvents[index - 1].year);
    const gap = currentYear - previousYear;
    
    // For same year events, use very minimal spacing (0.005) to keep them close together
    // For different years, use gap as flex-grow value (with minimum of 0.5)
    return gap === 0 ? 0.005 : Math.max(0.5, gap);
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated background gradient */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
        {/* Page Title */}
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-20 text-white"
          style={{ 
            fontFamily: "'Kumlien Pro', serif", 
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          About
        </h1>

        {/* Timeline Section - Simplified horizontal timeline */}
        <section 
          className="mb-24 md:mb-32 overflow-visible"
          ref={(el) => { sectionRefs.current['timeline'] = el; }}
        >
          <h2 
            className="text-3xl md:text-4xl mb-16 text-white"
            style={{ 
              fontFamily: "'Post Grotesk', sans-serif", 
              fontWeight: 400,
              opacity: isVisible['timeline'] ? 1 : 0,
              transform: isVisible['timeline'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            Journey
          </h2>
          
          <div 
            className="relative overflow-visible"
            style={{
              opacity: isVisible['timeline'] ? 1 : 0,
              transform: isVisible['timeline'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            {/* Desktop: Horizontal timeline */}
            <div className="hidden md:block relative overflow-visible">
              {/* Horizontal line */}
              <div className="absolute top-6 left-0 right-0 h-px bg-gray-800" />
              
              {/* Timeline items */}
              <div className="flex items-start">
                {timelineEvents.map((item, index) => {
                  const spacing = getTimelineSpacing(index);
                  return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center group"
                    style={{ flexGrow: spacing, flexShrink: 0, flexBasis: 0 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Circle */}
                    <div className="relative z-10 mb-4">
                      <div 
                        className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                          hoveredIndex === index ? 'scale-150 shadow-lg shadow-white/20' : ''
                        }`}
                        style={{
                          boxShadow: hoveredIndex === index ? '0 0 12px rgba(255, 255, 255, 0.3)' : 'none',
                        }}
                      />
                    </div>
                    
                    {/* Year label */}
                    <div 
                      className={`text-sm transition-colors duration-300 text-center ${
                        hoveredIndex === index ? 'text-white' : 'text-gray-500'
                      }`}
                      style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                    >
                      {item.year}
                    </div>
                    
                    {/* Tooltip on hover */}
                    {hoveredIndex === index && (
                      <div 
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-black/90 backdrop-blur-sm border border-gray-700 shadow-xl min-w-[180px] text-center whitespace-normal"
                        style={{
                          opacity: 0.95,
                          pointerEvents: 'auto',
                        }}
                      >
                        <div 
                          className="text-sm text-white leading-relaxed"
                          style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                        >
                          {item.event}
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black/90 border-l border-t border-gray-700 rotate-45" />
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="block md:hidden relative overflow-visible">
              {/* Vertical line on left */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700" />
              
              {/* Stacked milestones */}
              <div className="space-y-12 pl-12">
                {timelineEvents.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Dot on line */}
                    <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-white border-4 border-black" />
                    
                    {/* Content */}
                    <div>
                      <div 
                        className="text-gray-400 text-xs uppercase tracking-wider mb-1"
                        style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                      >
                        {item.year}
                      </div>
                      <div 
                        className="text-white text-lg font-semibold"
                        style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 600 }}
                      >
                        {item.event}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
        
        </section>

        {/* Hero Section - Enhanced with animations */}
        <section className="mb-24 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
            {/* Left Column - Portrait Image with parallax */}
            <div 
              className="md:col-span-2"
              ref={(el) => { sectionRefs.current['hero-image'] = el; }}
            >
              <div 
                className="w-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                  opacity: isVisible['hero-image'] ? 1 : 0,
                  transition: 'opacity 0.8s ease-out, transform 0.1s ease-out',
                }}
              >
                <div className="relative group">
                  <img
                    src="/yao-profile-photo.jpg"
                    alt="Yao Zhou profile photo"
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ 
                      borderRadius: '14px',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                    }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* Right Column - Heading and Intro with fade-in */}
            <div 
              className="md:col-span-3 space-y-6"
              ref={(el) => { sectionRefs.current['hero-text'] = el; }}
              style={{
                opacity: isVisible['hero-text'] ? 1 : 0,
                transform: isVisible['hero-text'] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
              }}
            >
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-4"
                style={{ 
                  fontFamily: "'Post Grotesk', sans-serif", 
                  fontWeight: 400,
                }}
              >
                Thanks for taking a look around!
              </h3>
              
              <p 
                className="text-xl md:text-2xl text-gray-300 mb-6"
                style={{ 
                  fontFamily: "'Post Grotesk', sans-serif", 
                  fontWeight: 400,
                }}
              >
                I'm Yao — most friends just call me Shay.
              </p>
              
              <div className="space-y-4 max-w-2xl">
                <p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                >
                  I'm a versatile designer, builder, and storyteller with a self-starter streak and classic INTP curiosity. My background spans UX design, startups, theater, and filmmaking, so I see design as more than problem-solving — it's interactive storytelling.
                </p>
                
                <p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  style={{ fontFamily: "'Post Grotesk'", fontWeight: 400 }}
                >
                  I've worked across small startups and unstructured teams, where I learned to adapt quickly, wear multiple hats, and push ideas from rough concepts into real products. I also co-founded and launched a wellness marketplace from the ground up, leading design and product through the full 0→1 journey.
                </p>
                
                <p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  style={{ fontFamily: "'Post Grotesk'", fontWeight: 400 }}
                >
                  If any part of my work or story resonates with you, I'd love to connect. I'm currently open to new design opportunities and collaborations, especially on early-stage products.
                </p>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-4 md:gap-6 mt-6">
                  <a
                    href="https://www.linkedin.com/in/yaozhou5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-[24px] text-white hover:border-gray-600 transition-all duration-300 overflow-hidden"
                    style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FaLinkedin size={18} />
                      <span>LinkedIn</span>
                    </span>
                    <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                  
                  <a
                    href="https://drive.google.com/file/d/1x6-Ir7emPiEo1AfzULgPsb55T5uMlubO/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-[24px] text-white hover:border-gray-600 transition-all duration-300 overflow-hidden"
                    style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                  >
                    <span className="relative z-10">Resume</span>
                    <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                  
                  <a
                    href="mailto:hello@yaozhou.me"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-[24px] text-white hover:border-gray-600 transition-all duration-300 overflow-hidden"
                    style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FaEnvelope size={18} />
                      <span>Email</span>
                    </span>
                    <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                  
                  <a
                    href="https://byshay.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-[24px] text-white hover:border-gray-600 transition-all duration-300 overflow-hidden"
                    style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                  >
                    <span className="relative z-10">Substack</span>
                    <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coffee Section - Enhanced card design */}
        <section 
          className="mb-24 md:mb-32"
          ref={(el) => { sectionRefs.current['coffee'] = el; }}
        >
          <div 
            className="relative p-8 md:p-12 border border-gray-800 rounded-[24px] bg-gradient-to-br from-gray-900/50 to-black overflow-hidden group"
            style={{
              opacity: isVisible['coffee'] ? 1 : 0,
              transform: isVisible['coffee'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <div className="relative z-10">
              <h3 
                className="text-3xl md:text-4xl mb-6 text-white"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                ☕ Coffee in Amsterdam?
              </h3>
              
              <div className="space-y-4 mb-8 max-w-3xl">
                <p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  style={{ fontFamily: "'Post Grotesk'", fontWeight: 400 }}
                >
                  Always down to meet over coffee (or Zoom if you're not here).
                </p>
                <p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                >
                  Just send me a quick message and I'll reach out ☺️
                </p>
              </div>
              
              <a
                href="mailto:hello@yaozhou.me?subject=Coffee Chat in Amsterdam&body=Hey Shay, let's grab coffee!"
                className="group/btn relative inline-flex items-center gap-2 px-8 py-4 border-2 border-white rounded-[24px] text-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 500 }}
              >
                <span>Yes! Let's do it</span>
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
          </div>
        </section>

        {/* Back to Home */}
        <div 
          className="mt-12 md:mt-16"
          ref={(el) => { sectionRefs.current['back'] = el; }}
          style={{
            opacity: isVisible['back'] ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
            style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Back to Home</span>
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
    </>
  );
}
