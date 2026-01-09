import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shay - Product Designer",
  description: "Product designer specializing in early-stage startups and AI-assisted development. 5+ years experience designing products that find product-market fit through user research and rapid prototyping.",
  authors: [{ name: "Shay Zhou" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.shayworks.com/",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
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

