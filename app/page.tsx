"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Dock from "./components/Dock";
import { VscHome, VscFolder, VscAccount } from "react-icons/vsc";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
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
      slug: "vibelab",
    },
    {
      title: "Faster Co-Presenting, Less Friction",
      description: "Redesigned a key interaction for virtual classroom hosts",
      image: "/Hilink Mockup.png",
      slug: "project-three",
    },
  ];

  const articles = [
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
      image: "/insight48 cover.png.jpg",
    },
    {
      name: "Foundry Pantry",
      description: "AI research lab exploring new tools for indie builders",
      keyTech: "Cursor + Claude Code",
      date: "Working in Progress",
      link: "#",
    },
    {
      name: "Contextual Dutch Learning App",
      description: "A Dutch language app that teaches words based on your real-world environment",
      keyTech: "Gemini 3",
      date: "Working in Progress",
      link: "#",
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

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  // Navigation handlers for Dock
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Hero Section - Two-Column Layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Column - Hero Text and Project Titles (Sticky) */}
        <div className="w-full md:w-[32%] md:sticky md:top-0 md:h-screen flex flex-col px-6 md:px-12 pt-8 pb-8 md:pb-24 overflow-y-auto overflow-x-visible">
          <div className="w-full overflow-visible">
            {/* Intro Text - Fades in/out based on hero visibility */}
            <div
              className={`transition-opacity duration-500 mb-12 ${
                isHeroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-[15px] text-gray-500 mb-2 tracking-wider" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>Product Designer</p>
              <h1 className="text-[40px] md:text-[56px] mb-4 tracking-tight leading-tight italic text-white" style={{ fontFamily: "'Kumlien Pro', serif", fontWeight: 400, fontSize: 'clamp(40px, 8vw, 65px)' }}>
                Yao Zhou
              </h1>
              <p className="text-lg md:text-[20px] text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: '"Post Grotesk"', fontWeight: 400 }}>
                I help early-stage products find their form, their flow, and their first users.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com/in/shay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="mailto:shay@example.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>

            {/* Project Titles List - Scroll-linked activation */}
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="min-w-0">
                  {project.slug === "project-three" ? (
                    <a
                      href="https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v", "_blank", "noopener,noreferrer");
                      }}
                    >
                      <h2 className={`text-[22px] md:text-[28px] mb-2 transition-all duration-300 not-italic ${
                        activeProjectIndex === index 
                          ? "underline decoration-gray-400 underline-offset-4 text-white" 
                          : "text-gray-500 hover:text-gray-300"
                      }`} style={{ 
                        fontFamily: "'Kumlien Pro'", 
                        fontWeight: 400, 
                        fontSize: 'clamp(22px, 4vw, 30px)',
                        fontStyle: 'italic'
                      }}>
                        {project.title}
                      </h2>
                    </a>
                  ) : (
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
                      <h2 className={`text-[22px] md:text-[28px] mb-2 transition-all duration-300 not-italic ${
                        activeProjectIndex === index 
                          ? "underline decoration-gray-400 underline-offset-4 text-white" 
                          : "text-gray-500 hover:text-gray-300"
                      }`} style={{ 
                        fontFamily: "'Kumlien Pro'", 
                        fontWeight: 400, 
                        fontSize: 'clamp(22px, 4vw, 30px)',
                        fontStyle: 'italic'
                      }}>
                        {project.title}
                      </h2>
                    </Link>
                  )}
                  {activeProjectIndex === index && (
                    <p className="text-base leading-relaxed transition-opacity duration-300 mt-2 break-words whitespace-normal mb-4" style={{ fontFamily: "'Post Grotesk'", fontWeight: 400, wordWrap: 'break-word', overflowWrap: 'break-word', color: 'rgba(229, 231, 235, 1)', fontSize: '18px' }}>
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Selected Work in Hero Area */}
        <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12 py-12 md:py-24 relative">
          {/* Hero Sentinel - Used for Intersection Observer */}
          <div ref={heroRef} className="absolute top-0 left-0 w-full h-screen pointer-events-none" />
          
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
                {project.slug === "project-three" ? (
                  <a
                    href="https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group cursor-pointer transition-opacity hover:opacity-90 relative"
                    onMouseEnter={() => {
                      if (activeProjectIndex !== index) {
                        setActiveProjectIndex(index);
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v", "_blank", "noopener,noreferrer");
                    }}
                  >
                    <div className="w-full bg-black rounded-lg overflow-hidden relative">
                      <div className="aspect-[4/3] w-full relative bg-black flex items-center justify-center">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full md:w-[85%] h-full md:h-[85%] object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      {/* Hover Overlay with Project Title */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <h3 className="text-2xl md:text-3xl font-light text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    href={`/work/${project.slug}`}
                    className="block group cursor-pointer transition-opacity hover:opacity-90 relative"
                    onMouseEnter={() => {
                      if (activeProjectIndex !== index) {
                        setActiveProjectIndex(index);
                      }
                    }}
                  >
                    <div className="w-full bg-black rounded-lg overflow-hidden relative">
                      <div className="aspect-[4/3] w-full relative bg-black flex items-center justify-center">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full md:w-[85%] h-full md:h-[85%] object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      {/* Hover Overlay with Project Title */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <h3 className="text-2xl md:text-3xl font-light text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* I build things with AI tools Section */}
      <section className="py-16 md:py-24 border-t border-gray-900">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Aligned with Selected work titles */}
          <div className="w-full md:w-[32%] px-6 md:px-12 mb-8 md:mb-0">
              <h2 
              className="text-2xl md:text-4xl mb-6 font-light text-white"
              style={{ fontFamily: "'Kumlien Pro'", fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '100%' }}
            >
              I build things with AI tools.
            </h2>
            
            <p 
              className="text-base md:text-xl text-gray-300 leading-relaxed"
              style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
            >
              Since September 2025, I've been independently experimenting with vibe coding through focused two-week sprints. Each project is built within a 14-day window, and I'll be sharing case studies soon.
            </p>
          </div>
          
          {/* Right Column - Projects - Same structure as Selected Work above */}
          <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12">
            {/* Projects Grid - Aligned with image left edge (images are 85% width, centered, so left edge is at 7.5%) */}
            <div className="w-full md:w-[85%] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch md:mx-auto" style={{ borderRadius: '20px' }}>
              {vibeCodingProjects.map((project, index) => {
              const cardContent = (
                <div className="bg-gray-900/30 border border-gray-800 rounded-[24px] overflow-hidden relative group cursor-pointer transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/50 h-full flex flex-col">
                  {/* Hover Image - Fills entire card, fades in on hover */}
                  {project.image && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-0 pointer-events-none">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Text Content - Fades out on hover only if image exists */}
                  <div className={`p-4 md:p-5 flex flex-col flex-grow relative z-10 transition-opacity duration-300 ${project.image ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'}`}>
                    {/* Project Name */}
                    <h3 
                      className="text-lg md:text-xl font-medium text-white mb-2"
                      style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 500 }}
                    >
                      {project.name}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-sm md:text-base text-gray-400 leading-relaxed mb-3 flex-grow"
                      style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                    >
                      {project.description}
                    </p>
                    
                    {/* Tech Label and Value */}
                    <div className="mb-3">
                      <span 
                        className="text-xs uppercase tracking-wider text-gray-500 mb-1 block"
                        style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                      >
                        Tech
                      </span>
                      <p 
                        className="text-sm md:text-base font-medium text-white"
                        style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 500 }}
                      >
                        {project.keyTech}
                      </p>
                    </div>
                    
                    {/* Date */}
                    <div className="mb-3">
                      <p 
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                      >
                        {project.date}
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA Button - Always visible, styled to stand on its own */}
                  {project.link && (
                    <div className="p-4 md:p-5 pt-0 relative z-20">
                      <div className="pt-3 border-t border-gray-800 group-hover:border-transparent transition-colors duration-300">
                        <button
                          className="w-full px-4 py-3 bg-black/90 hover:bg-black border border-gray-700/50 hover:border-gray-600 rounded-[24px] text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                          style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 500 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (project.link) {
                              window.open(project.link, '_blank');
                            }
                          }}
                        >
                          {project.name === "Foundry Pantry" || project.name === "Contextual Dutch Learning App"
                            ? "Coming Soon"
                            : "View"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );

              if (project.link) {
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
      <section id="writing" className="py-16 md:py-24 border-t border-gray-900">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Aligned with Selected work titles and AI tools header */}
          <div className="w-full md:w-[32%] px-6 md:px-12 mb-8 md:mb-0">
            <h2 
              className="text-2xl md:text-4xl font-light text-white mb-4"
              style={{ fontFamily: "'Kumlien Pro'", fontWeight: 400, fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '100%', fontStyle: 'italic' }}
            >
              Writing
            </h2>
            <p 
              className="text-sm md:text-base mb-8 md:mb-16"
              style={{ fontFamily: "'Post Grotesk'", fontWeight: 400, fontSize: '18px', color: 'rgba(209, 213, 219, 1)' }}
            >
              Thoughts on design, building, and working with AI
            </p>
          </div>
          
          {/* Right Column - Articles - Same structure as AI projects above */}
          <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12">
            {/* Articles Grid - Aligned with project cards left edge (same as projects: 85% width, 7.5% left margin) */}
            <div className="w-full md:w-[85%] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mx-auto">
              {articles.map((article, index) => {
                const content = (
                  <div className="group cursor-pointer transition-opacity hover:opacity-80">
                    <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                    <p className="text-gray-400 text-sm">{article.date}</p>
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
              className="text-gray-400 hover:text-white transition-colors text-sm md:text-base inline-flex items-center gap-2"
              style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400, marginLeft: '7.5%' }}
            >
              Read more on Substack →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 md:py-24 lg:px-12 border-t border-gray-900">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Based in Amsterdam, matches Writing section layout */}
          <div className="w-full md:w-[32%] px-6 md:px-12 mb-8 md:mb-0 flex items-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              Based in Amsterdam, NL
            </p>
          </div>
          
          {/* Right Column - Aligned with Writing section articles */}
          <div className="w-full md:w-[68%] flex flex-col px-6 md:px-12">
            {/* Container matching Writing section article blocks width (85%) */}
            <div className="w-full md:w-[85%] md:mx-auto flex justify-end items-center">
              {/* Right side - Built with Cursor */}
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-sm whitespace-nowrap" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  100% Built with Cursor
                </p>
                <img 
                  src="/Cursor-brand-logo-2.svg" 
                  alt="Cursor" 
                  className="w-40 h-40"
                  style={{ 
                    backgroundColor: 'transparent',
                    mixBlendMode: 'normal',
                    marginLeft: '-8px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

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
