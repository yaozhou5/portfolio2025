"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Only register plugins on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const splitTextRef = useRef<any>(null);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, [isMounted]);

  // Try to load GSAP SplitText dynamically (premium plugin)
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    
    let mounted = true;
    
    import('gsap/SplitText')
      .then((module) => {
        if (!mounted) return;
        const GSAPSplitText = module.SplitText || module.default;
        if (GSAPSplitText && typeof window !== 'undefined') {
          try {
            gsap.registerPlugin(GSAPSplitText);
            splitTextRef.current = GSAPSplitText;
          } catch (e) {
            // Silently fail - SplitText is optional
          }
        }
      })
      .catch(() => {
        // GSAP SplitText is a premium plugin - gracefully handle if not available
        // This is expected if the plugin is not installed
      });
    
    return () => {
      mounted = false;
    };
  }, [isMounted]);

  useGSAP(
    () => {
      if (!isMounted || !ref.current || !text || !fontsLoaded) return;
      if (typeof window === 'undefined') return;
      // Prevent re-animation if already completed
      if (animationCompletedRef.current) return;
      
      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: any;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {}
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const GSAPSplitText = splitTextRef.current;

      // Check if GSAP SplitText is available
      if (!GSAPSplitText) {
        // Fallback: animate the whole element
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isInViewport) {
            gsap.fromTo(
              el,
              { ...from },
              {
                ...to,
                duration,
                ease,
                onComplete: () => {
                  animationCompletedRef.current = true;
                  onCompleteRef.current?.();
                }
              }
            );
          } else {
            gsap.fromTo(
              el,
              { ...from },
              {
                ...to,
                duration,
                ease,
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true
                },
                onComplete: () => {
                  animationCompletedRef.current = true;
                  onCompleteRef.current?.();
                }
              }
            );
          }
        });
        return;
      }

      let targets: Element[] = [];
      
      const assignTargets = (self: any) => {
        if (splitType.includes('chars') && self.chars?.length)
          targets = self.chars;
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };
      
      try {
        const splitInstance = new GSAPSplitText(el, {
          type: splitType,
          smartWrap: true,
          autoSplit: splitType === 'lines',
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          reduceWhiteSpace: false,
          onSplit: (self: any) => {
            assignTargets(self);
            
            // Ensure targets exist
            if (!targets || targets.length === 0) {
              console.warn('SplitText: No targets found for animation');
              return;
            }
            
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
              // Check if element is already in viewport (for elements at top of page)
              const rect = el.getBoundingClientRect();
              const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
              
              // If already in viewport, play animation immediately without ScrollTrigger
              if (isInViewport) {
                gsap.fromTo(
                  targets,
                  { ...from },
                  {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    onComplete: () => {
                      animationCompletedRef.current = true;
                      onCompleteRef.current?.();
                    },
                    willChange: 'transform, opacity',
                    force3D: true
                  }
                );
              } else {
                // Otherwise use ScrollTrigger
                gsap.fromTo(
                  targets,
                  { ...from },
                  {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    scrollTrigger: {
                      trigger: el,
                      start,
                      once: true,
                      fastScrollEnd: true,
                      anticipatePin: 0.4
                    },
                    onComplete: () => {
                      animationCompletedRef.current = true;
                      onCompleteRef.current?.();
                    },
                    willChange: 'transform, opacity',
                    force3D: true
                  }
                );
              }
            });
          }
        });
        el._rbsplitInstance = splitInstance;
      } catch (error) {
        console.error('SplitText error:', error);
        // Fallback: animate the whole element if SplitText fails
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          gsap.fromTo(
            el,
            { ...from },
            {
              ...to,
              duration,
              ease,
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              }
            }
          );
        } else {
          gsap.fromTo(
            el,
            { ...from },
            {
              ...to,
              duration,
              ease,
              scrollTrigger: {
                trigger: el,
                start,
                once: true
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              }
            }
          );
        }
      }
      
      return () => {
        if (typeof window === 'undefined') return;
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          if (el._rbsplitInstance) {
            el._rbsplitInstance.revert();
          }
        } catch (_) {}
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        isMounted
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity',
      lineHeight: '1.2',
      paddingBottom: '0.1em'
    };
    const classes = `split-parent inline-block whitespace-normal overflow-visible ${className}`;
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };

  return renderTag();
};

export default SplitText;
