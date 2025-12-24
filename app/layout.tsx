import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shay - Product Designer",
  description: "Portfolio of Shay, Product Designer",
  openGraph: {
    title: "Shay - Product Designer",
    description: "I help early-stage products find their form, their flow, and their first users.",
    url: "https://www.shayworks.com",
    siteName: "Shay Works",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shay - Product Designer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shay - Product Designer",
    description: "I help early-stage products find their form, their flow, and their first users.",
    images: ["/og-image.png"],
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

