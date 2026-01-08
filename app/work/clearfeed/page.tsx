"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

function FeatureCard({ videoSrc, title, description }: { videoSrc: string; title: string; description: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div
      className="rounded-[20px] bg-white overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-auto"
          muted
          playsInline
          loop
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-base md:text-lg mb-1.5 text-gray-900 font-semibold" style={{ fontFamily: "'Post Grotesk', sans-serif" }}>
          {title}
        </h3>
        <p className="text-xs md:text-sm mb-2 text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400, lineHeight: '100%' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function DecentralizedNewsReadingCaseStudy() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "ClearFeed: Decrypting the Paywall — A Decentralized Vision for News Reading",
    "description": "Award-winning Web3 News Reading App concept",
    "author": {
      "@type": "Person",
      "name": "Shay Zhou"
    },
    "datePublished": "2025-02-01",
    "image": "https://www.shayworks.com/Decentralized.png"
  };

  // Inject structured data script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'clearfeed-structured-data';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('clearfeed-structured-data');
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
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Hero Image */}
        <div className="mb-12 md:mb-16">
          <div className="w-full bg-black rounded-[30px] overflow-hidden flex items-center justify-center">
            <img
              src="/Decentralized.png"
              alt="Decentralized News Reading App Mockup"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
          ClearFeed: Decrypting the Paywall — A Decentralized Vision for News Reading
        </h1>

        {/* Meta Info */}
        <div className="mb-12 md:mb-16 space-y-2">
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Role:</span> Product Design (Lead), UX Research Collaboration
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Team:</span> Yao Zhou (Product Designer), Gurmandeep Kaur (UX Researcher)
          </p>
          <p className="text-base md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">Timeline:</span> 8 Weeks (Dec 2024 ~ Feb 2025)
          </p>
          <p className="text-base md:text-lg text-gray-700 mt-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            <span className="text-gray-600 font-semibold">The Core Idea:</span> A Web3 news app concept that replaces rigid subscriptions with pay-per-article micropayments and community-driven content curation.
          </p>
        </div>

        {/* Overview Section */}
        <section className="mb-16 md:mb-24">
          {/* Awards Recognition */}
          <h2 className="text-[32px] md:text-[40px] mb-6" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            Awards Recognition
          </h2>
          {/* Certificates */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
            <img
              src="/French-Design-Awards-E-Certificate.png"
              alt="French Design Awards Certificate"
              className="h-auto max-w-full flex-1 min-w-0"
            />
            <img
              src="/London_e-certificate.png"
              alt="London Design Awards Certificate"
              className="h-auto max-w-full flex-1 min-w-0"
            />
            <img
              src="/NYC_e-certificate.png"
              alt="NYX Awards Certificate"
              className="h-auto max-w-full flex-1 min-w-0"
            />
          </div>
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            The Uncomfortable Truth: Subscription Fatigue & The Search for Trust
          </h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              We've all been there: hitting a paywall for one article, then forgetting you had three subscriptions you barely used. The current news model is broken — it demands commitment before value and often sacrifices trust for algorithmic engagement.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              I wanted to pay for <strong>just the stories I read</strong> and have a voice in validating their perspective.
            </p>
            <blockquote className="text-xl md:text-3xl text-gray-900 leading-relaxed my-8 md:my-12 text-left border-l-4 border-gray-400 pl-4 md:pl-8 py-4 italic" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400, textAlign: 'left' }}>
              What if news access was flexible, transparent, and owned by the readers?
            </blockquote>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              The result was <strong>ClearFeed</strong> — an award-winning concept that leverages Web3's decentralized power to reshape the economics and ethics of journalism.
            </p>
          </div>
        </section>

        {/* Discovery Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            Discovery: The Cracks in the Current Model
          </h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              Our initial research phase with Gurmandeep focused on dissecting the modern reader's experience. The insights were stark:
            </p>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-8">
              {/* Card 1 */}
              <div className="bg-white rounded-[30px] p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-5xl md:text-6xl text-gray-900 mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  75%+
                </div>
                <h3 className="text-[24px] md:text-[28px] text-gray-900 mb-3" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                  The Paywall Friction
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Top news is locked away. Casual discovery is constantly interrupted, creating a frustrating, stop-start reading experience.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-[30px] p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-5xl md:text-6xl text-gray-900 mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  62%
                </div>
                <h3 className="text-[24px] md:text-[28px] text-gray-900 mb-3" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                  The Trust Deficit
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Readers express concern over media bias. They are actively seeking independent, unfiltered voices that the current ecosystem often fails to surface.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white rounded-[30px] p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-5xl md:text-6xl text-gray-900 mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  40%+
                </div>
                <h3 className="text-[24px] md:text-[28px] text-gray-900 mb-3" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                  The Subscription Trap
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Users are churning annually. They aren't rejecting news; they're rejecting the rigid, all-or-nothing commitment.
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              These pain points crystallized our opportunity: We needed a design that delivered <strong>flexible access</strong>, <strong>Web3-powered frictionless payment</strong>, and <strong>user-driven curation</strong>.
            </p>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            Designing the Breakthrough: Making Decentralization Feel Familiar
          </h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              The 8-week timeline was structured to move from insight to interactive prototype:
            </p>
            
            {/* Timeline Table */}
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <div className="min-w-full px-6 md:px-0">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-900 font-semibold" style={{ fontFamily: "'Post Grotesk', sans-serif" }}>
                        Weeks
                      </th>
                      <th className="text-left py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-900 font-semibold" style={{ fontFamily: "'Post Grotesk', sans-serif" }}>
                        Phase
                      </th>
                      <th className="text-left py-3 md:py-4 text-sm md:text-lg text-gray-900 font-semibold" style={{ fontFamily: "'Post Grotesk', sans-serif" }}>
                        Focus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Weeks 1–2
                      </td>
                      <td className="py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Research & Strategy
                      </td>
                      <td className="py-3 md:py-4 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Desk research, competitive analysis, defining the opportunity.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Weeks 3–6
                      </td>
                      <td className="py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        UX Exploration & Design
                      </td>
                      <td className="py-3 md:py-4 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Rapid sketching, mid-fidelity wireframing of core flows (pay-per-article, curation), and initial prototyping in Figma.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Weeks 7–8
                      </td>
                      <td className="py-3 md:py-4 pr-4 md:pr-6 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Prototype Polish & Presentation
                      </td>
                      <td className="py-3 md:py-4 text-sm md:text-lg text-gray-700" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                        Visual design refinement, micro-interaction polish, and building the final award-winning interactive prototype.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Design Approach Introduction */}
        <section className="mb-16 md:mb-24">
          <div className="w-full md:max-w-[85%]">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              My design approach centered on two critical interactions. The goal was to remove friction from the financial transaction and seamlessly integrate a mechanism for reader-driven trust validation.
            </p>

            {/* Mid-Fidelity Wireframes */}
            <div className="mb-16">
              <h3 className="text-[24px] md:text-[28px] mb-6" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                1. Mid-Fidelity Wireframes: Speed to Concept
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                I bypassed detailed upfront UX mapping and focused on visualizing the core experience immediately. Mid-fidelity wireframes allowed us to quickly test the viability of key moments—discovery, the pay-per-article purchase, and content curation—ensuring the overall concept felt intuitive and not overly technical.
              </p>
              {/* Wireframes Image */}
              <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center mt-8">
                <img
                  src="/midfi_clearFeed.png"
                  alt="Mid-fidelity wireframes showing ClearFeed interface screens"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rapid Design System with AI Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            Rapid Design System with AI
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                To move fast without sacrificing consistency, I leveraged AI tools to rapidly generate a foundational design system. This gave us a cohesive visual language — color tokens, typography scale, component library — without weeks of manual setup. It freed up time to focus on what mattered most: refining the core interactions that would define the experience.
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Built with
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="/lovable-logo-bg-light.png"
                    alt="Lovable logo"
                    className="h-6 md:h-8 w-auto opacity-60"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
                <div className="w-full bg-black rounded-[30px] overflow-hidden">
                <img
                  src="/Design System Creation.png"
                  alt="Design system preview"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Design Approach Introduction - Continued */}
        <section className="mb-16 md:mb-24">
          <div className="w-full md:max-w-[85%]">
            {/* Core Interaction Iteration */}
            <div className="mb-16">
              <h3 className="text-[24px] md:text-[28px] mb-6" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                2. Core Interaction Iteration: From Clunky to Clear
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                I explored how decentralized payment models — particularly Web3-based micropayments — could enable more flexible, seamless access to individual articles. In parallel, I iterated on how a transparent, user-driven rating flow could give readers more control over content curation. These two areas became central to expressing how a decentralized news experience could feel more open, trustworthy, and aligned with user needs.
              </p>

              {/* Payment Flow Iteration */}
              <div className="mb-12">
                <h4 className="text-xl md:text-2xl mb-4" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                  Payment Flow Iteration: Bringing Web3 to iOS Principles
                </h4>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  <strong>The Initial Problem:</strong> The first payment version felt too much like a crypto app: manual currency input, technical terminology, and high friction.
                </p>
                {/* Comparison Image */}
                <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center mt-8 mb-8">
                  <img
                    src="/ClearFeed_comparision1.png"
                    alt="Before and after comparison of payment flow design"
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  <strong>The Fix:</strong> I restructured the flow around familiar iOS design principles. I added clear, single-tap entry points, simplified deposit options (Bank / Crypto Wallet), and introduced preset payment amounts with immediate visual feedback.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  <strong>The Outcome:</strong> The final design makes Web3 micropayments feel as familiar and low-friction as a standard mobile purchase.
                </p>
              </div>

              {/* Rating Flow Iteration */}
              <div className="mb-12">
                <h4 className="text-xl md:text-2xl mb-4" style={{ fontFamily: "'Clash Display'", fontWeight: 500 }}>
                  Rating Flow Iteration: Curation as a Conversation
                </h4>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  <strong>The Initial Problem:</strong> The original star-rating system was multi-step, disconnected from the content, and resulted in user drop-off. It felt like homework.
                </p>
                {/* Comparison Image */}
                <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center mt-8 mb-8">
                  <img
                    src="/Clearfeed_comparision2.png"
                    alt="Before and after comparison of rating flow design"
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  <strong>The Fix:</strong> I designed an inline rating flow where the user first sees the community's aggregated rating (e.g., Left-leaning, Neutral) to provide context and encourage participation. After a quick rating (political leaning, quality, bias), a simple thank-you message closes the loop.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  <strong>The Outcome:</strong> The updated flow is quicker, more intuitive, and positions content curation as a natural, value-adding part of the reading experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Design Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            The Final Design: ClearFeed's Four Pillars
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
            ClearFeed is a flexible, pay-per-article ecosystem powered by Web3 and community trust. The final prototype showcases how these principles fundamentally change the reading contract:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
            {/* Feature 1 */}
            <FeatureCard
              videoSrc="/Video4.mp4"
              title="Discover Independent Journalism"
              description="The platform is designed to surface diverse content from independent creators, offering direct support and visibility to voices often sidelined by traditional algorithms."
            />

            {/* Feature 2 */}
            <FeatureCard
              videoSrc="/flow2.mp4"
              title="Flexible Pay-Per-Article"
              description="Eliminate subscription anxiety. Readers unlock individual stories on demand, paying only for the value they immediately receive."
            />

            {/* Feature 3 */}
            <FeatureCard
              videoSrc="/video2.mp4"
              title="Seamless Crypto Micropayments"
              description="Low-cost, frictionless Web3-based payments power the experience, enabling minute transactions without platform lock-in."
            />

            {/* Feature 4 */}
            <FeatureCard
              videoSrc="/video3.mp4"
              title="Transparent User-Driven Curation"
              description="Readers rate articles on factors like political leaning (Left, Center, Right) and perceived bias. This transparent, community-vetted data gives readers control over how content is surfaced, promoting trust-driven discovery."
            />
          </div>
        </section>

        {/* Next Chapter Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-[32px] md:text-[40px] mb-8" style={{ fontFamily: "'Clash Display'", fontWeight: 600 }}>
            What's Next
          </h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              This concept proved that Web3 can address real problems in digital journalism — not just theoretically, but in ways that feel intuitive to everyday readers. If I were to keep building ClearFeed, here's where I'd focus:
            </p>
            
            {/* Next Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
              <div className="pl-6 border-l-2 border-primary">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Test the core flows. Run usability sessions on the payment and rating interactions to see where friction still hides.
                </p>
              </div>
              
              <div className="pl-6 border-l-2 border-primary">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Onboard the skeptics. Design a lightweight intro for users who've never touched crypto — make Web3 invisible.
                </p>
              </div>
              
              <div className="pl-6 border-l-2 border-primary">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Validate the trust hypothesis. Do community-driven ratings actually change how confident readers feel? Time to find out.
                </p>
              </div>
              
              <div className="pl-6 border-l-2 border-primary">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
                  Expand discovery. Push users beyond their filter bubbles into perspectives they wouldn't normally see.
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 400 }}>
              The goal stays the same: a reading experience that's open, trustworthy, and fair to both readers and the journalists they support.
            </p>
          </div>
        </section>

        {/* Footer Tagline */}
        <div className="mb-12 md:mb-16 pt-8">
          <p className="text-lg md:text-xl text-gray-600 italic" style={{ fontFamily: "'Post Grotesk', sans-serif", fontWeight: 300 }}>
            Independent journalism. On your terms.
          </p>
        </div>

      </div>

    </main>
  );
}
