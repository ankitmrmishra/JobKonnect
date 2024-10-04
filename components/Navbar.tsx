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
import { Button } from "./ui/button";

export default function Navbar() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" p-4 md:px-36 md:mt-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="">
            <Link
              href={"/"}
              className="logo flex items-center text-xl md:text-2xl"
            >
              <Workflow className="text-blue-600 mr-2" /> Job
              <span className="text-blue-600">Konnect</span>
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center lg:space-x-4">
            <NavItem href="/GetHired">Find Jobs</NavItem>
            <NavItem href="/PostAJob">Hire a Talent</NavItem>
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
                    <DropdownMenuItem>Profile</DropdownMenuItem>{" "}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="bg-blue-300 p-2 rounded-md outline outline-blue-400 ">
                      <Link href={"/PostAJob"}>Post A Job</Link>
                    </DropdownMenuLabel>
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

          <button className="md:hidden">
            {isMenuOpen ? (
              <X size={24} onClick={toggleMenu} />
            ) : (
              <div className="flex justify-center align-middle items-center">
                {user ? (
                  <div className="flex gap-2">
                    <Image
                      src={user?.picture || "/path/to/default-image.jpg"}
                      alt={user?.given_name || "User"}
                      width={100}
                      height={100}
                      className="rounded-full size-6"
                    />
                    <Menu onClick={toggleMenu} size={24} />
                  </div>
                ) : (
                  <div className="flex gap-3  rounded-md ">
                    <div className=" text-white bg-black px-3 py-1 rounded-md ">
                      <LoginLink>Sign In</LoginLink>
                    </div>
                    <div className=" text-white bg-black px-3 py-1 rounded-md ">
                      <RegisterLink>Sign Up</RegisterLink>
                    </div>
                  </div>
                )}
              </div>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-2">
            <NavItem href="/GetHired" onClick={toggleMenu}>
              Find Jobs
            </NavItem>
            <NavItem href="/PostAJob" onClick={toggleMenu}>
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
              <div className="flex gap-2">
                <Button className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]">
                  <LogoutLink>Log Out</LogoutLink>
                </Button>
                <Button className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]">
                  Profile
                </Button>
              </div>
            ) : (
              <>
                <Button className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]">
                  <LoginLink>Sign In</LoginLink>
                </Button>
                <Button className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]">
                  <RegisterLink>Sign Up</RegisterLink>
                </Button>
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
