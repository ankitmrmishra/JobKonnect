"use client";

import React from "react";
import Link from "next/link";
import { Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-white transition duration-300"
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <div className="md:px-20 md:py-20">
      <footer className="bg-black text-white px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 xl:px-16 xl:py-24 md:rounded-3xl rounded-t-3xl mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center text-2xl mb-4">
                <Workflow className="text-blue-600 mr-2" /> Job
                <span className="text-blue-600">Konnect</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Elevating Careers, Connecting Futures. JobKonnect brings
                together ambitious professionals and visionary companies.
              </p>
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-white/90"
              >
                Get Started
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/GetHired">Find Jobs</FooterLink>
                </li>
                <li>
                  <FooterLink href="/PostAJob">Hire a Talent</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/about">About</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </li>
                <li>
                  <FooterLink href="/terms">Terms of Service</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cookies">Cookie Policy</FooterLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} JobKonnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
