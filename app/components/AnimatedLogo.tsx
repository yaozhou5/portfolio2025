"use client";

import Link from "next/link";

export default function AnimatedLogo() {
  return (
    <Link 
      href="/" 
      aria-label="Home"
      className="transition-opacity duration-200 hover:opacity-70"
      style={{ fontFamily: "'Clash Display'", fontWeight: 600, fontSize: '28px' }}
    >
      Yao Zhou
    </Link>
  );
}
