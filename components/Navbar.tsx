"use client";

import { Workflow, Menu, X, MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 md:px-36 md:mt-10">
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
            {session?.user && (
              <div className="profile flex justify-center align-middle items-center gap-2 ">
                <Image
                  src={session.user.image || "/path/to/default-image.jpg"}
                  alt={session.user.name || "User"}
                  width={100}
                  height={100}
                  className="rounded-full size-10"
                />
              </div>
            )}
            {status === "authenticated" ? (
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MenuIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <button onClick={() => signOut()}>Log Out</button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {" "}
                      <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="bg-blue-300 p-2 rounded-md outline outline-blue-400 ">
                      <Link href={"/PostAJob"}>Post A Job</Link>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button onClick={() => signIn()}>Log In</Button>
            )}
          </div>

          <button className="md:hidden">
            {isMenuOpen ? (
              <X size={24} onClick={toggleMenu} />
            ) : (
              <div className="flex justify-center align-middle items-center">
                {session?.user ? (
                  <div className="flex gap-2">
                    <Image
                      src={session.user.image || "/path/to/default-image.jpg"}
                      alt={session.user.name || "User"}
                      width={100}
                      height={100}
                      className="rounded-full size-6"
                    />
                    <Menu onClick={toggleMenu} size={24} />
                  </div>
                ) : (
                  <div className="flex gap-3 rounded-md ">
                    <Button
                      onClick={() => signIn()}
                      className="text-white bg-black px-3 py-1 rounded-md"
                    >
                      Sign In
                    </Button>
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
            {status === "authenticated" ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => signOut()}
                  className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]"
                >
                  Log Out
                </Button>
                <Button className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]">
                  Profile
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => signIn()}
                className="flex justify-center align-middle items-center gap-3 text-white min-w-[10rem]"
              >
                Sign In
              </Button>
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
