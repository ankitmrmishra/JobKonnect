"use client";

import { Workflow, Menu, X, MenuIcon } from "lucide-react";
import React, { useState } from "react";

import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

export default function Navbar() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();
  console.log(isAuthenticated, "this is testing");

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
          <div className="hidden md:flex align-middle items-center space-x-2 ">
            {user && (
              <div className="profile flex justify-center align-middle items-center gap-2 ">
                <Image
                  src={user.picture || "/path/to/default-image.jpg"}
                  alt={user.given_name || "User"}
                  width={100}
                  height={100}
                  className="rounded-full size-10"
                />
                {/* <span>
                  {user?.given_name} {user.family_name}
                </span> */}
              </div>
            )}
            {isAuthenticated ? (
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MenuIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <LogoutLink>Log Out </LogoutLink>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <LoginLink className="bg-black text-white p-2 rounded-lg">
                  Sign In
                </LoginLink>
                <RegisterLink className="bg-black text-white p-2 rounded-lg">
                  Sign Up
                </RegisterLink>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <div className="flex justify-center align-middle items-center">
                {user ? (
                  <Image
                    src={user?.picture || "/path/to/default-image.jpg"}
                    alt={user?.given_name || "User"}
                    width={100}
                    height={100}
                    className="rounded-full size-6"
                  />
                ) : (
                  ""
                )}

                <Menu size={24} />
              </div>
            )}
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
            {isAuthenticated ? (
              <div className="flex justify-center align-middle items-center gap-3 text-white">
                <LogoutLink className="bg-black p-2 rounded-lg">
                  Log Out
                </LogoutLink>
                <div className="bg-black p-2 rounded-lg">Profile</div>
              </div>
            ) : (
              <>
                <LoginLink>Sign In</LoginLink>
                <RegisterLink>Sign Up</RegisterLink>
              </>
            )}
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
