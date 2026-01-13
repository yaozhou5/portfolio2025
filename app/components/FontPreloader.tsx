"use client";

import { useEffect } from 'react';

export default function FontPreloader() {
  useEffect(() => {
    // Run immediately, not waiting for mount
    if (typeof window === 'undefined') return;
    
    // Preload additional fonts that aren't in HTML head
    const fonts = [
      { href: '/ClashDisplay-Medium.woff2', type: 'font/woff2' },
      { href: '/ClashDisplay-Bold.woff2', type: 'font/woff2' },
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

    // Wait for fonts to load, then add fonts-loaded class to prevent shifting
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded');
      }, 100);
    }
  }, []);

  return null;
}

