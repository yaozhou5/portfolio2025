import type { Metadata } from "next";
import "./globals.css";
import FontPreloader from "./components/FontPreloader";

export const metadata: Metadata = {
  title: "Yao Zhou - Product Designer",
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
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/ClashDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/ClashDisplay-Semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Post Grotesk.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <FontPreloader />
        {children}
      </body>
    </html>
  );
}

