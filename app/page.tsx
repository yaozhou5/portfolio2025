"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [articles, setArticles] = useState([
    {
      title: "4 Reasons to Build (Only One Is Your Portfolio)",
      date: "December 11, 2025",
      link: "https://open.substack.com/pub/byshay/p/4-reasons-to-build-only-one-is-your?r=5bh8rr&utm_campaign=post&utm_medium=web",
    },
    {
      title: "Do We Always Have to Pay for Our Knowledge Gap?",
      date: "December 8, 2025",
      link: "https://byshay.substack.com/p/do-we-always-have-to-pay-for-our",
    },
    {
      title: "The Control Paradox: Why Vibe Coding Feels So Different",
      date: "November 20, 2025",
      link: "https://byshay.substack.com/p/the-control-paradox-why-vibe-coding",
    },
    {
      title: "We Should Build AI That Isn't Always Helpful",
      date: "November 5, 2025",
      link: "https://open.substack.com/pub/byshay/p/we-should-build-ai-that-isnt-always?utm_campaign=post-expanded-share&utm_medium=web",
    },
  ]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const activeProjectIndexRef = useRef<number | null>(0);

  const projects = [
    {
      title: "From Swipes to Actual Dates",
      description: "MVP redesign for a dating App targeting Gen Z",
      image: "/Afterhours_cover2.png",
      slug: "afterhours",
    },
    {
      title: "Decentralized News Reading",
      description: "Award-winning Web3 News Reading App concept",
      image: "/Decentralized.png",
      slug: "clearfeed",
    },
    {
      title: "Faster Co-Presenting, Less Friction",
      description: "Redesigned a key interaction for virtual classroom hosts",
      image: "/Hilink Mockup.png",
      slug: "project-three",
    },
  ];


  const vibeCodingProjects = [
    {
      name: "Habi",
      description: "Scan your furniture, discover your global IKEA \"twins,\" and explore the world's shared collection with Habi",
      keyTech: "Base 44",
      date: "Sep 2025",
      link: "https://habi.base44.app/",
      image: "/Habi1.png",
    },
    {
      name: "Straatology",
      description: "Decode Dutch street names so you'll never get lost again.",
      keyTech: "Lovable",
      date: "Oct 2025",
      link: "#",
      image: "/straatology.png",
    },
    {
      name: "Insight48",
      description: "A design feedback service delivering actionable UX insights within 48 hours",
      keyTech: "Lovable",
      date: "Sep 2025",
      link: "https://insight48.info/",
      image: "/insight48_sample copy.png",
    },
    {
      name: "Contextual Dutch Learning App",
      description: "A Dutch language app that teaches words based on your real-world environment",
      keyTech: "Gemini 3",
      date: "Working in Progress",
      link: "#",
      image: "/Dutch Commuter.png",
    },
    {
      name: "Foundry Pantry",
      description: "AI research lab exploring new tools for indie builders",
      keyTech: "Cursor + Claude Code",
      date: "Working in Progress",
      link: "#",
      image: "/foundry pantry.png",
    },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const intersectionRatios = new Map<number, number>();

    // Observe hero section (sentinel at top of projects)
    if (heroRef.current) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hero is visible if sentinel is in viewport
            setIsHeroVisible(entry.isIntersecting);
          });
        },
        {
          threshold: 0,
          rootMargin: "0px 0px -60% 0px",
        }
      );

      heroObserver.observe(heroRef.current);
      observers.push(heroObserver);
    }

    const updateActiveProject = () => {
      // Find the project with the highest intersection ratio
      let maxRatio = 0;
      let maxIndex = -1;
      
      intersectionRatios.forEach((ratio, idx) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxIndex = idx;
        }
      });

      // Update if a project has significant visibility (centered in viewport)
      // Use a lower threshold to make it more responsive
      if (maxRatio > 0.1 && maxIndex !== -1 && maxIndex !== activeProjectIndexRef.current) {
        activeProjectIndexRef.current = maxIndex;
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveProjectIndex(maxIndex);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 50);
        }, 150);
      } else if (maxRatio === 0 && intersectionRatios.size === 0 && activeProjectIndexRef.current !== null) {
        // If no projects are visible, keep the last active project
        // Don't reset, just keep showing the last one
      }
    };

    // Observe project sections
    setTimeout(() => {
      projectRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Update intersection ratio for this project
                intersectionRatios.set(index, entry.intersectionRatio);
              } else {
                // Clear ratio when project leaves view
                intersectionRatios.delete(index);
              }
              // Update active project whenever intersection changes
              updateActiveProject();
            });
          },
          {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            rootMargin: "-40% 0px -40% 0px",
          }
        );

        observer.observe(ref);
        observers.push(observer);
      });
      
      // Initialize first project when hero is not visible
      const checkInitialProject = () => {
        if (projectRefs.current[0] && !isHeroVisible) {
          const rect = projectRefs.current[0].getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          if (rect.top < viewportHeight * 0.5) {
            activeProjectIndexRef.current = 0;
            setActiveProjectIndex(0);
          }
        }
      };
      
      // Check after a short delay to ensure refs are set
      setTimeout(checkInitialProject, 300);
    }, 200);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Fetch Substack articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/substack');
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          // Limit to 4 articles maximum
          setArticles(data.articles.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Keep fallback articles if fetch fails
      }
    };
    
    fetchArticles();
  }, []);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;


  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 relative">
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
      {/* Hero Section - Two-Column Layout */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Left Column - Hero Text and Project Titles (Sticky) */}
        <div className="w-full md:w-[32%] md:sticky md:top-0 md:h-screen flex flex-col px-6 md:px-12 pt-6 md:pt-8 pb-16 md:pb-24 overflow-y-auto overflow-x-visible scrollbar-hide">
          <div className="w-full overflow-visible min-h-0">
            {/* Intro Text - Fades in/out based on hero visibility */}
            <div
              className={`transition-opacity duration-500 mb-12 mt-0 ${
                isHeroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight leading-tight italic text-gray-900" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
                Yao Zhou
              </h1>
              <p className="text-lg md:text-[20px] text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: '"Post Grotesk"', fontWeight: 400 }}>
                Product Designer with agency, startup, and founder experience, working end-to-end to turn ambiguity into progress.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com/in/shay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="mailto:shay@example.com"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>

            {/* Project Titles List - Scroll-linked activation */}
            <div className="space-y-8 md:space-y-12 pt-12">
              {projects.map((project, index) => (
                <div key={index} className="min-w-0">
                  <Link
                    href={`/work/${project.slug}`}
                    className="block transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      const projectElement = document.getElementById(`project-${project.slug}`);
                      if (projectElement) {
                        projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    <h3 className={`text-[24px] md:text-[28px] mb-2 transition-all duration-300 ${
                      activeProjectIndex === index 
                        ? "underline decoration-gray-600 underline-offset-4 text-gray-900" 
                        : "text-gray-600 hover:text-gray-800"
                    }`} style={{ 
                      fontFamily: "'Clash Display'", 
                      fontWeight: 500
                    }}>
                      {project.title}
                    </h3>
                  </Link>
                  {activeProjectIndex === index && (
                    <p className="text-base leading-relaxed transition-opacity duration-300 mt-2 break-words whitespace-normal mb-4 text-gray-700" style={{ fontFamily: "'Post Grotesk'", fontWeight: 400, wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '18px' }}>
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Selected Work in Hero Area */}
        <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12 relative">
          {/* Hero Sentinel - Used for Intersection Observer */}
          <div ref={heroRef} className="absolute top-0 left-0 w-full h-screen pointer-events-none z-0" />
          
          {/* Match left column's top padding */}
          <div className="pt-6 md:pt-8">
            {/* Project Previews */}
            <div className="space-y-8 md:space-y-12 relative z-10">
            {projects.map((project, index) => (
              <div
                key={index}
                id={`project-${project.slug}`}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="block group cursor-pointer transition-opacity hover:opacity-90 relative"
                  onMouseEnter={() => {
                    if (activeProjectIndex !== index) {
                      setActiveProjectIndex(index);
                    }
                  }}
                >
                  <div className="w-full bg-transparent rounded-[30px] overflow-hidden relative">
                    <div className="aspect-[4/3] w-full relative bg-transparent flex items-center justify-center">
                      {project.image ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full md:w-[85%] h-full md:h-[85%] object-cover rounded-[30px]"
                          />
                          {/* Hover Overlay with Project Title - matches image size */}
                          <div className="absolute w-full md:w-[85%] h-full md:h-[85%] bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[30px] p-6 md:p-8">
                            <h3 className="text-[24px] md:text-[28px] text-white px-4 md:px-6" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                              {project.title}
                            </h3>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-[30px]">
                          <span className="text-gray-600 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            </div>
          </div>
          
          {/* Match left column's bottom padding */}
          <div className="pb-16 md:pb-24"></div>
        </div>
      </div>

      {/* I build things with AI tools Section */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Aligned with Selected work titles */}
          <div className="w-full md:w-[32%] px-6 md:px-12 mb-8 md:mb-0">
              <h2 
              className="text-[32px] md:text-[40px] mb-6 text-gray-900"
              style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}
            >
              I build things with AI tools.
            </h2>
            
            <p 
              className="text-base md:text-xl text-gray-700 leading-relaxed"
              style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
            >
              Since September 2025, I've been independently experimenting with vibe coding through focused two-week sprints. Each project is built within a 14-day window, and I'll be sharing case studies soon.
            </p>
          </div>
          
          {/* Right Column - Projects - Same structure as Selected Work above */}
          <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12">
            {/* Projects Grid - Aligned with image left edge (images are 85% width, centered, so left edge is at 7.5%) */}
            <div className="w-full md:w-[85%] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch md:mx-auto">
              {vibeCodingProjects.map((project, index) => {
              const cardContent = (
                <div className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Image Preview - Top of card */}
                  {project.image ? (
                    <div className="w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Coming soon</span>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    {/* Title with Tag */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 
                        className="text-[24px] md:text-[28px] text-gray-900 flex-1"
                        style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}
                      >
                        {project.name}
                      </h3>
                      <span 
                        className="text-xs px-2.5 py-1 rounded-[99px] bg-gray-100 text-gray-600 whitespace-nowrap flex-shrink-0 shadow-sm"
                        style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                      >
                        {project.keyTech}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p 
                      className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 flex-grow"
                      style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                    >
                      {project.description}
                    </p>
                    
                    {/* Footer - Status Tag */}
                    <div className="mt-auto pt-3">
                      {project.date === "Working in Progress" ? (
                        <span 
                          className="text-xs px-2.5 py-1 rounded-[99px] bg-orange-100 text-orange-700 whitespace-nowrap inline-block shadow-sm"
                          style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                        >
                          Working in Progress
                        </span>
                      ) : (
                        <span 
                          className="text-xs px-2.5 py-1 rounded-[99px] bg-green-100 text-green-700 whitespace-nowrap inline-block shadow-sm"
                          style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                        >
                          Launched {project.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );

              if (project.link && project.link !== "#") {
                return (
                  <a 
                    key={index} 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={index}>
                  {cardContent}
                </div>
              );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Writing Section - Full Width */}
      <section id="writing" className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Aligned with Selected work titles and AI tools header */}
          <div className="w-full md:w-[32%] px-6 md:px-12 mb-8 md:mb-0">
            <h2 
              className="text-[32px] md:text-[40px] text-gray-900 mb-4"
              style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}
            >
              Writing
            </h2>
            <p 
              className="text-sm md:text-base mb-8 md:mb-16 text-gray-700"
              style={{ fontFamily: "'Post Grotesk'", fontWeight: 400, fontSize: '18px' }}
            >
              Thoughts on design, building, and working with AI
            </p>
          </div>
          
          {/* Right Column - Articles - Same structure as AI projects above */}
          <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12">
            {/* Articles Grid - Aligned with project cards left edge (same as projects: 85% width, 7.5% left margin) */}
            <div className="w-full md:w-[85%] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mx-auto">
              {articles.slice(0, 4).map((article, index) => {
                const content = (
                  <div className="group cursor-pointer transition-opacity hover:opacity-80">
                    <h3 className="text-xl font-medium mb-2 text-gray-900">{article.title}</h3>
                    <p className="text-gray-600 text-sm">{article.date}</p>
                  </div>
                );
                
                if (article.link) {
                  return (
                    <a
                      key={index}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }
                
                return (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
            <a
              href="https://byshay.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base inline-flex items-center gap-2"
              style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400, marginLeft: '7.5%' }}
            >
              Read more on Substack →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 md:py-24 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end">
            {/* Right side - Built with Cursor */}
            <p className="text-gray-600 text-sm whitespace-nowrap" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              100% Built with Cursor
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
