import React from "react";
import People from "@/components/ui/people";
import { ArrowRight, Circle } from "lucide-react";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-black text-white flex flex-col justify-center items-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 xl:px-16 xl:py-24 rounded-3xl">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <span className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full flex items-center gap-2 mb-4">
            <Circle className="w-3 h-3 fill-green-500" />
            Join us now
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <People />
            <span className="text-white/60 italic text-sm text-center sm:text-left">
              100+ got Hired from JobKonnect
            </span>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-4">
            Elevating Careers, Connecting Futures
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mx-auto">
            At JobConnect, we are not just another job board. We are your career
            catalyst, bringing together ambitious professionals and visionary
            companies to create perfect matches that drive success.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href={"/GetHired"}
            className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md"
          >
            Get Started
          </Link>
          <Link
            href={"PostAJob"}
            className="text-white w-full sm:w-auto flex justify-between align-middle items-center hover:underline"
          >
            Hire <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
