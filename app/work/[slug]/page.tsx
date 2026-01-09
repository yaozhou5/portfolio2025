"use client";

import Link from "next/link";
import { notFound, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedLogo from "../../components/AnimatedLogo";

const projects: Record<
  string,
  {
    title: string;
    description: string;
    category: string;
    headline: string;
    role: string;
    team: string[];
    duration: string;
    overview: string;
    goals: string[];
  }
> = {
  afterhours: {
    title: "Afterhours",
    category: "Product Design",
    headline: "Redesigning the dating app experience",
    description:
      "I worked on redesigning the core user experience for Afterhours, a modern dating app focused on meaningful connections. The work involved rethinking the matching flow, profile design, and conversation interface to create a more authentic and engaging experience.",
    role: "Lead Product Designer",
    team: ["Head of Design", "VP of Product", "Product Manager"],
    duration: "6 month contract 2024",
    overview:
      "The goal for this work was to create a more authentic and engaging dating experience that moved away from superficial swiping. We focused on redesigning key user flows including profile creation, matching, and conversation initiation to foster more meaningful connections.",
    goals: [
      "Increase user engagement and time spent in app",
      "Improve match quality and conversation rates",
      "Create a scalable design system for future features",
    ],
  },
  vibelab: {
    title: "VibeLab",
    category: "Product Design & Strategy",
    headline: "A tool recommendation platform for indie builders",
    description:
      "I designed and built VibeLab, a platform that helps indie builders discover and compare tools for their projects. The work included user research, information architecture, and creating a recommendation engine that matches users with the right tools based on their needs.",
    role: "Product Designer & Founder",
    team: ["Solo Project"],
    duration: "Ongoing 2024",
    overview:
      "VibeLab was created to solve the problem of tool discovery for indie builders. The platform combines curated recommendations with community insights to help users find the best tools for their specific use cases.",
    goals: [
      "Build a comprehensive tool database",
      "Create an intuitive recommendation system",
      "Foster community engagement and tool reviews",
    ],
  },
  "project-three": {
    title: "Project Three",
    category: "Product Design",
    headline: "A brief description of the third project",
    description:
      "This project involved designing a comprehensive solution for a complex problem space. The work included user research, prototyping, and iterative design improvements.",
    role: "Product Designer",
    team: ["Design Lead", "Product Manager"],
    duration: "3 months 2024",
    overview:
      "The goal was to create a user-centered solution that addressed key pain points while maintaining scalability and performance.",
    goals: [
      "Improve user satisfaction scores",
      "Reduce support tickets",
      "Increase feature adoption",
    ],
  },
};

export default function WorkPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const project = projects[params.slug];

  if (!project) {
    notFound();
  }

  // Inject structured data script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const imageMap: Record<string, string> = {
      afterhours: "https://www.shayworks.com/Afterhours_cover2.png",
      vibelab: "https://www.shayworks.com/Decentralized.png",
    };

    const dateMap: Record<string, string> = {
      afterhours: "2024-01-01", // Based on "6 month contract 2024"
      vibelab: "2024-01-01", // Based on "Ongoing 2024"
    };

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.headline || project.title,
      "description": project.description,
      "author": {
        "@type": "Person",
        "name": "Shay Zhou"
      },
      "datePublished": dateMap[params.slug] || "2024-01-01",
      "image": imageMap[params.slug] || "https://www.shayworks.com/og-image.png"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `${params.slug}-structured-data`;
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`${params.slug}-structured-data`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [params.slug, project]);

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

      {/* Project Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Project Name and Category */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-[15px] text-gray-600" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>{project.title}</span>
            <span className="text-[15px] text-gray-600">·</span>
            <span className="text-[15px] text-gray-600" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>{project.category}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-tight max-w-4xl" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            {project.headline}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            {project.description}
          </p>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-[30px] p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                Role
              </p>
              <p className="text-base text-gray-900" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>{project.role}</p>
            </div>
            <div className="bg-white rounded-[30px] p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                Team
              </p>
              <div className="space-y-1">
                {project.team.map((member, index) => (
                  <p key={index} className="text-base text-gray-900" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                    {member}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[30px] p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                Duration
              </p>
              <p className="text-base text-gray-900" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>{project.duration}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>Overview</h2>

          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              {project.overview}
            </p>
            {params.slug === "project-three" && (
              <button
                onClick={() => {
                  window.open("https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v", "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-[30px] text-white hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                <span>View Case Study Presentation</span>
                <span>→</span>
              </button>
            )}
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-[24px] md:text-[28px] mb-6" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>Goals</h3>
            <div className="space-y-6">
              {project.goals.map((goal, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></div>
                  <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Image */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="w-full bg-white rounded-[30px] overflow-hidden shadow-lg">
            <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">Project Screenshot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            {project.title}
          </h2>

          <div className="prose max-w-none">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              {/* Project content will be added here */}
            </p>
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image</span>
              </div>
            </div>
            <div className="bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] mb-12 text-gray-900" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            Featured work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Afterhours", slug: "afterhours" },
              { title: "VibeLab", slug: "vibelab" },
              { title: "Project Three", slug: "project-three" },
            ].map((project, index) => (
              <Link
                key={index}
                href={`/work/${project.slug}`}
                className="group"
              >
                <div className="bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-gray-900 group-hover:text-gray-700 transition-colors" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 md:py-24 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-gray-600 text-sm" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>100% Built with Cursor</p>
            <div className="flex gap-6">
              <a
                href="mailto:hello@yaozhou.me"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/yaozhou5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
