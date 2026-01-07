"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Dock from "../components/Dock";
import { VscHome, VscFolder, VscAccount } from "react-icons/vsc";

const professionalProjects = [
  {
    slug: "vibelab",
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

  // Navigation handlers for Dock
  const handleHomeClick = () => {
    router.push('/');
  };

  const handleWorkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    router.push('/about');
  };

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: handleHomeClick },
    { icon: <VscFolder size={18} />, label: 'Work', onClick: handleWorkClick },
    { icon: <VscAccount size={18} />, label: 'About', onClick: handleAboutClick },
  ];

  const featuredProject = professionalProjects.find(p => p.isFeatured);
  const regularProjects = professionalProjects.filter(p => !p.isFeatured);

  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-16 md:mb-20 font-light tracking-tight italic" style={{ fontFamily: "'Crimson Pro'" }}>
            Design Case Studies
          </h1>

          {/* Featured Project - Large Feature Slot */}
          {featuredProject && (
            <div className="mb-16 md:mb-24">
              <Link
                href={`/work/${featuredProject.slug}`}
                className="group block"
              >
                <div className="bg-gray-900/30 border-2 border-gray-800 rounded-[24px] overflow-hidden hover:border-gray-700 transition-all duration-500 hover:bg-gray-900/50">
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
                            className="text-xs md:text-sm font-medium px-3 py-1 rounded-full border border-gray-700 text-gray-300 bg-gray-800/50"
                            style={{ fontFamily: "'Post Grotesk', sans-serif" }}
                          >
                            {featuredProject.specialization}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 
                          className="text-3xl md:text-4xl lg:text-5xl mb-4 font-medium text-white group-hover:text-gray-300 transition-colors duration-300"
                          style={{ fontFamily: "'Crimson Pro'" }}
                        >
                          {featuredProject.title}
                        </h2>

                        {/* Elevator Pitch */}
                        <p 
                          className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
                          style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                        >
                          {featuredProject.elevatorPitch}
                        </p>
                      </div>

                      {/* CTA on Hover */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span 
                          className="text-sm font-medium inline-flex items-center gap-2 text-gray-400"
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
                <div className="bg-gray-900/30 border border-gray-800 rounded-[24px] overflow-hidden hover:border-gray-700 transition-all duration-500 hover:bg-gray-900/50 h-full flex flex-col">
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
                        className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-700 text-gray-300 bg-gray-800/50"
                        style={{ fontFamily: "'Post Grotesk', sans-serif" }}
                      >
                        {project.specialization}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 
                      className="text-2xl md:text-3xl mb-3 font-medium text-white group-hover:text-gray-300 transition-colors duration-300"
                      style={{ fontFamily: "'Kumlien Pro'" }}
                    >
                      {project.title}
                    </h2>

                    {/* Elevator Pitch */}
                    <p 
                      className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed flex-grow"
                      style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
                    >
                      {project.elevatorPitch}
                    </p>

                    {/* CTA on Hover */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span 
                        className="text-sm font-medium inline-flex items-center gap-2 text-gray-400"
                        style={{ fontFamily: "'Post Grotesk', sans-serif" }}
                      >
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              );

              if (project.slug === "project-three") {
                return (
                  <a
                    key={project.slug}
                    href="https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v", "_blank", "noopener,noreferrer");
                    }}
                  >
                    {cardContent}
                  </a>
                );
              }

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
