"use client";

import { useEffect } from 'react';

export default function FontPreloader() {
  useEffect(() => {
    // Run immediately, not waiting for mount
    if (typeof window === 'undefined') return;
    
    // Preload critical fonts to prevent font switching
    const fonts = [
      { href: '/ClashDisplay-Regular.woff2', type: 'font/woff2' },
      { href: '/ClashDisplay-Medium.woff2', type: 'font/woff2' },
      { href: '/ClashDisplay-Semibold.woff2', type: 'font/woff2' },
      { href: '/Post Grotesk.woff', type: 'font/woff' },
    ];

    fonts.forEach((font) => {
      // Check if link already exists
      const existing = document.querySelector(`link[href="${font.href}"]`);
      if (existing) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.href;
      link.as = 'font';
      link.type = font.type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

