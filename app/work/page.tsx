"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import AnimatedLogo from "../components/AnimatedLogo";

const professionalProjects = [
  {
    slug: "clearfeed",
    title: "Decentralized News Reading",
    elevatorPitch: "Re-architecting Media Payments with Web3",
    description: "Award-winning Web3 News Reading App concept",
    specialization: "Product Strategy, Web3 UX",
    tags: "/ Series A / AI",
    image: "/Decentralized.png",
    isFeatured: true,
  },
  {
    slug: "afterhours",
    title: "From Swipes to Actual Dates",
    elevatorPitch: "Transforming Dating App Engagement for Gen Z",
    description: "MVP redesign for a dating App targeting Gen Z",
    specialization: "Mobile Design, UX Strategy",
    tags: "/ Series A / Dating",
    image: "/Afterhours_cover2.png",
    isFeatured: false,
  },
  {
    slug: "project-three",
    title: "Faster Co-Presenting, Less Friction",
    elevatorPitch: "Streamlining Virtual Classroom Interactions",
    description: "Redesigned a key interaction for virtual classroom hosts",
    specialization: "B2B SaaS, Interaction Design",
    tags: "/ Seed / SaaS",
    image: "/Hilink Mockup.png",
    isFeatured: false,
  },
];


export default function WorkPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const featuredProject = professionalProjects.find(p => p.isFeatured);
  const regularProjects = professionalProjects.filter(p => !p.isFeatured);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 relative">
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
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-20 tracking-tight text-gray-900" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            Design Case Studies
          </h1>

          {/* Featured Project - Large Feature Slot */}
          {featuredProject && (
            <div className="mb-16 md:mb-24">
              <Link
                href={`/work/${featuredProject.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section - Left Side */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px] bg-black overflow-hidden">
                      <img
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Content Section - Right Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-between">
                      <div>
                        {/* Specialization Tag */}
                        <div className="inline-flex items-center gap-2 mb-4">
                          <span 
                            className="text-xs md:text-sm font-medium px-3 py-1 rounded-[99px] text-gray-300 bg-gray-800/50 shadow-md"
                            style={{ fontFamily: "'Post Grotesk', sans-serif", borderRadius: '99px' }}
                          >
                            {featuredProject.specialization}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          className="text-[24px] md:text-[28px] mb-4 text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                          style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}
                        >
                          {featuredProject.title}
                        </h3>

                        {/* Elevator Pitch */}
                        <p 
                          className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
                          style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                        >
                          {featuredProject.elevatorPitch}
                        </p>
                      </div>

                      {/* CTA on Hover */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span 
                          className="text-sm font-medium inline-flex items-center gap-2 text-gray-700"
                          style={{ fontFamily: "'Post Grotesk', sans-serif" }}
                        >
                          View Case Study →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Regular Projects - Combined width equals featured card */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-20 md:mb-24">
            {regularProjects.map((project) => {
              const cardContent = (
                <div className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* Specialization Tag */}
                    <div className="mb-4">
                      <span 
                        className="text-xs font-medium px-2.5 py-1 rounded-full text-gray-700 bg-gray-100 shadow-sm"
                        style={{ fontFamily: "'Post Grotesk', sans-serif" }}
                      >
                        {project.specialization}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-[24px] md:text-[28px] mb-3 text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                      style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}
                    >
                      {project.title}
                    </h3>

                    {/* Elevator Pitch */}
                    <p 
                      className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed flex-grow"
                      style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                    >
                      {project.elevatorPitch}
                    </p>

                    {/* CTA on Hover */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span 
                        className="text-sm font-medium inline-flex items-center gap-2 text-gray-700"
                        style={{ fontFamily: "'Post Grotesk', sans-serif" }}
                      >
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              );

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group block flex-1"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>

        </div>
      </div>

    </main>
  );
}
