import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./Providers";
import { Toaster } from "sonner";

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
  title: "JobKonnect - Connect with Your Dream Career",
  description:
    "JobKonnect is a modern job board platform connecting talented individuals with their ideal job opportunities.",
  openGraph: {
    title: "JobKonnect - Connect with Your Dream Career",
    description:
      "Find your next career opportunity with JobKonnect, the innovative job board platform.",
    url: "https://jobkonnect.com",
    siteName: "JobKonnect",
    images: [
      {
        url: "https://jobkonnect.com/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobKonnect - Connect with Your Dream Career",
    description:
      "Find your next career opportunity with JobKonnect, the innovative job board platform.",
    images: ["https://jobkonnect.com/opengraph-image.png"],
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
