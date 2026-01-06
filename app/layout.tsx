import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shay - Product Designer",
  description: "Product designer specializing in early-stage startups and AI-assisted development. 5+ years experience designing products that find product-market fit through user research and rapid prototyping.",
  keywords: "product designer Amsterdam, early-stage product design, AI product designer, startup product designer, UX designer Netherlands, product design portfolio",
  authors: [{ name: "Shay Zhou" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.shayworks.com/",
  },
  other: {
    publisher: "Shay Zhou",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

