import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./Providers";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "JobKonnect - Connect with Your Dream Career",
    template: "%s | JobKonnect",
  },
  description:
    "JobKonnect is a modern job board platform connecting talented individuals with their ideal job opportunities. Find your next career move today.",
  keywords: [
    "job board",
    "career opportunities",
    "job search",
    "employment",
    "recruitment",
    "hiring",
  ],
  authors: [{ name: "ANKIT MISHRA" }],
  creator: "ANKIT MISHRA",
  publisher: "ANKIT MISHRA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jobkonnect.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JobKonnect - Connect with Your Dream Career",
    description:
      "Find your next career opportunity with JobKonnect, the innovative job board platform connecting talented individuals with their ideal jobs.",
    url: "https://jobkonnect.vercel.app",
    siteName: "JobKonnect",
    images: [
      {
        url: "https://jobkonnect.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "JobKonnect - Modern Job Board Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobKonnect - Connect with Your Dream Career",
    description:
      "Find your next career opportunity with JobKonnect, the innovative job board platform connecting talented individuals with their ideal jobs.",
    images: ["https://jobkonnect.vercel.app/opengraph-image.png"],
    creator: "@ankitmrmishraexe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
