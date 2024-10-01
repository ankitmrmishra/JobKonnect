"use client";

import { Workflow, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" p-4 md:px-36 md:mt-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="logo flex items-center text-xl md:text-2xl">
            <Workflow className="text-blue-600 mr-2" /> Job
            <span className="text-blue-600">Konnect</span>
          </div>
          <div className="hidden md:flex justify-center items-center lg:space-x-4">
            <NavItem href="/find-jobs">Find Jobs</NavItem>
            <NavItem href="/hire-talent">Hire a Talent</NavItem>
            <NavItem href="/contact">Contact Us</NavItem>
            <NavItem href="/about">About</NavItem>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-2">
            <NavItem href="/find-jobs" onClick={toggleMenu}>
              Find Jobs
            </NavItem>
            <NavItem href="/hire-talent" onClick={toggleMenu}>
              Hire a Talent
            </NavItem>
            <NavItem href="/contact" onClick={toggleMenu}>
              Contact Us
            </NavItem>
            <NavItem href="/about" onClick={toggleMenu}>
              About
            </NavItem>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            <Button variant="outline" className="w-full">
              Log In
            </Button>
            <Button className="w-full">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="block py-2 px-4 text-sm hover:bg-black hover:text-white rounded transition duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
