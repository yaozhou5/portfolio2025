"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AnimatedLogo() {
  const pathRef = useRef<SVGPathElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check sessionStorage to see if we've already animated in this session
    // Temporarily disabled for testing - uncomment after validation
    // const hasAnimatedThisSession = sessionStorage.getItem('logo-animated') === 'true';
    const hasAnimatedThisSession = false; // Force animation for testing
    
    if (!prefersReducedMotion && !hasAnimatedThisSession) {
      // Small delay for intentional feel (120-180ms as requested)
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        sessionStorage.setItem('logo-animated', 'true');
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!shouldAnimate || !pathRef.current) return;

    // Use requestAnimationFrame to ensure DOM is ready
    const frameId = requestAnimationFrame(() => {
      const path = pathRef.current;
      if (!path) return;
      
      // Try to get path length, retry if needed
      let pathLength = path.getTotalLength();
      
      if (pathLength === 0) {
        // Retry after a short delay
        setTimeout(() => {
          const retryPath = pathRef.current;
          if (retryPath) {
            pathLength = retryPath.getTotalLength();
            if (pathLength > 0) {
              retryPath.style.strokeDasharray = `${pathLength}`;
              retryPath.style.strokeDashoffset = `${pathLength}`;
              
              const retryAnimation = retryPath.animate(
                [
                  { strokeDashoffset: pathLength },
                  { strokeDashoffset: 0 }
                ],
                {
                  duration: 1100,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  fill: 'forwards'
                }
              );
              
              retryAnimation.onfinish = () => {
                if (retryPath) {
                  retryPath.style.strokeDashoffset = '0';
                }
              };
              
              animationRef.current = retryAnimation;
            }
          }
        }, 100);
        return;
      }
      
      // Set up initial state for animation
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;
      
      // Animate using Web Animations API
      // Duration: 900-1200ms (using 1100ms), ease-out, no bounce
      const animation = path.animate(
        [
          { strokeDashoffset: pathLength },
          { strokeDashoffset: 0 }
        ],
        {
          duration: 1100,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
          fill: 'forwards'
        }
      );

      animation.onfinish = () => {
        // Ensure dashoffset stays at 0 after animation completes
        if (path) {
          path.style.strokeDashoffset = '0';
        }
      };

      animationRef.current = animation;
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };
  }, [shouldAnimate]);

  return (
    <Link 
      href="/" 
      aria-label="Home"
      className="flex items-center justify-center w-[40px] h-[40px] transition-opacity duration-200 hover:opacity-70"
    >
      <svg 
        className="h-[20px] w-auto md:h-[24px]"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Handwritten Y - SINGLE CONTINUOUS PATH for stroke animation */}
        {/* TODO: Replace this placeholder path with traced path from Y_logo.png */}
        {/* Single continuous path: Start top-left, go to center, then top-right, back to center, then down */}
        <path 
          ref={pathRef}
          d="M 9 2 L 12 8 L 15 2 L 12 8 L 12 16" 
          stroke="#111827" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </Link>
  );
}
