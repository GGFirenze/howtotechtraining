import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AmplitudeInit } from "@/components/analytics/amplitude-init";
import { IubendaBanner } from "@/components/legal/iubenda-banner";
import { IubendaBannerCloseFix } from "@/components/legal/iubenda-banner-close-fix";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crackvilt.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CrackVILT — Crack the secret to a successful VILT session",
    template: "%s · CrackVILT",
  },
  description:
    "The practical guide to designing and delivering Virtual Instructor-Led Training that actually sticks. By Giuliano Giannini.",
  applicationName: "CrackVILT",
  authors: [{ name: "Giuliano Giannini" }],
  creator: "Giuliano Giannini",
  publisher: "CrackVILT",
  keywords: [
    "VILT",
    "virtual instructor-led training",
    "technical training",
    "developer training",
    "training delivery",
    "instructional design",
  ],
  openGraph: {
    type: "website",
    siteName: "CrackVILT",
    title: "CrackVILT — Crack the secret to a successful VILT session",
    description:
      "The practical guide to designing and delivering Virtual Instructor-Led Training that actually sticks.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "CrackVILT — Crack the secret to a successful VILT session",
    description:
      "The practical guide to designing and delivering Virtual Instructor-Led Training that actually sticks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <IubendaBanner />
        <IubendaBannerCloseFix />
        <AmplitudeInit />
        {children}
      </body>
    </html>
  );
}
