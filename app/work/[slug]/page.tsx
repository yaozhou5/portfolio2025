"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

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
  
  // Redirect project-three to Pitch.com
  useEffect(() => {
    if (params.slug === "project-three") {
      window.open("https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v", "_blank", "noopener,noreferrer");
      router.push("/work");
    }
  }, [params.slug, router]);

  const project = projects[params.slug];

  if (!project) {
    notFound();
  }
  
  // Don't render anything for project-three since we're redirecting
  if (params.slug === "project-three") {
    return null;
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
    <main className="min-h-screen bg-black text-white">
        {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-gray-900 bg-black">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            href="/"
            className="text-[15px] text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[15px] text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[15px] text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/#writing"
              className="text-[15px] text-gray-400 hover:text-white transition-colors"
            >
              Writing
            </Link>
          </div>
        </div>
      </nav>

      {/* Project Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Project Name and Category */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-[15px] text-gray-400">{project.title}</span>
            <span className="text-[15px] text-gray-600">·</span>
            <span className="text-[15px] text-gray-400">{project.category}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-tight max-w-4xl italic" style={{ fontFamily: "'Crimson Pro'" }}>
            {project.headline}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl">
            {project.description}
          </p>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-900 rounded-[24px] p-6 border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Role
              </p>
              <p className="text-base text-gray-300">{project.role}</p>
            </div>
            <div className="bg-gray-900 rounded-[24px] p-6 border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Team
              </p>
              <div className="space-y-1">
                {project.team.map((member, index) => (
                  <p key={index} className="text-base text-gray-300">
                    {member}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 rounded-[24px] p-6 border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Duration
              </p>
              <p className="text-base text-gray-300">{project.duration}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-6 md:px-12 py-12 md:py-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Overview</h2>

          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-3xl">
              {project.overview}
            </p>
            {params.slug === "project-three" && (
              <button
                onClick={() => {
                  window.open("https://pitch.com/v/hilink-case-study-presentation---yao-zhou-gw7v6v", "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 rounded-[24px] text-white font-light hover:bg-gray-800 hover:border-gray-600 transition-colors cursor-pointer"
                style={{ fontFamily: "'Post Grotesk', sans-serif" }}
              >
                <span>View Case Study Presentation</span>
                <span>→</span>
              </button>
            )}
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-6">Goals</h3>
            <div className="space-y-6">
              {project.goals.map((goal, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-500 rounded-full mt-2"></div>
                  <p className="text-lg text-gray-300 font-light leading-relaxed">
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
          <div className="w-full bg-gray-900 rounded-[24px] overflow-hidden">
            <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-gray-600">Project Screenshot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 py-12 md:py-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            {project.title}
          </h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8">
              {/* Project content will be added here */}
            </p>
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gray-900 rounded-[24px] overflow-hidden">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Image</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-[24px] overflow-hidden">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-12 text-gray-300">
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
                <div className="bg-gray-900 rounded-[24px] overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-light text-gray-300 group-hover:text-white transition-colors">
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
      <footer className="px-6 py-16 md:py-24 lg:px-12 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-gray-400 text-sm">100% Built with Cursor</p>
            <div className="flex gap-6">
              <a
                href="mailto:shay@example.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Email
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
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
