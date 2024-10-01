"use client";
import { Speech, Verified } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Testimonial {
  name: string;
  username: string;
  image: string;
  quote: string;
  role: "Job Seeker" | "Employer";
}

const WhatpeopleAreSaying = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center align-middle items-center text-center flex-col w-full overflow-hidden"
    >
      <div className="badge bg-black max-w-max flex justify-center align-middle items-center text-white rounded-full px-2 py-[6px] text-xs gap-1">
        <Speech /> People Are Talking
      </div>
      <div className="head text-center">
        <h1 className="text-3xl  font-semibold py-5">
          What People Are Talking About Us?
        </h1>
        <span className="text-sm text-gray-400">
          Job seekers and employers consistently praise our platform for its
          exceptional job matching, ease of use, and outstanding career support.
        </span>
      </div>
      <motion.div
        style={{ x: x1 }}
        className="testimonial_row_1  flex relative overflow-hidden scrollbar-hide"
      >
        {testimonials.map((testi, index) => (
          <div
            key={index}
            className="bg-black text-white  space-y-3 border border-red-500 md:p-4 p-2 md:m-4 m-2 rounded-2xl   md:w-[20rem] w-[12rem]  "
          >
            <div className="Profile flex justify-start align-middle items-center md:gap-3 gap-1">
              <Image
                src={testi.image}
                alt="profilePic"
                width={40}
                height={40}
                className="border border-white/40 rounded-full md:size-10 size-7"
              />
              <div className="flex flex-col justify-start align-start items-start">
                <span className="text-xs md:text-base px-1 flex justify-center align-middle items-center gap-1">
                  {testi.name} <Verified className="text-blue-600 size-4" />
                </span>
                <span className="md:text-sm text-xs text-white/40">
                  {testi.role}
                </span>{" "}
              </div>
            </div>

            <div className="text-start">
              <p>{testi.quote}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="testimonial_row_1  flex relative overflow-hidden scrollbar-hide"
      >
        {testimonials.map((testi, index) => (
          <div
            key={index}
            className="bg-black text-white  space-y-3 border border-red-500 md:p-4 p-2 md:m-4 m-2 rounded-2xl   md:w-[20rem] w-[12rem]  "
          >
            <div className="Profile flex justify-start align-middle items-center md:gap-3 gap-1">
              <Image
                src={testi.image}
                alt="profilePic"
                width={40}
                height={40}
                className="border border-white/40 rounded-full md:size-10 size-7"
              />
              <div className="flex flex-col justify-start align-start items-start">
                <span className="text-xs md:text-base px-1 flex justify-center align-middle items-center gap-1">
                  {testi.name} <Verified className="text-blue-600 size-4" />
                </span>
                <span className="md:text-sm text-xs text-white/40">
                  {testi.role}
                </span>{" "}
              </div>
            </div>

            <div className="text-start">
              <p>{testi.quote}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhatpeopleAreSaying;

const testimonials: Testimonial[] = [
  {
    name: "Savannah Nguyen",
    username: "savannah",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Found my dream job within weeks. The platform's job matching algorithm is spot-on!",
    role: "Job Seeker",
  },
  {
    name: "Marvin McKinney",
    username: "marvinmn",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "As an employer, I've never had an easier time finding qualified candidates. Excellent service!",
    role: "Employer",
  },
  {
    name: "Dianne Russell",
    username: "diannerus",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The resume builder tool helped me create a standout application. I got hired in no time!",
    role: "Job Seeker",
  },
  {
    name: "Ronald Richards",
    username: "ronaldric",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Streamlined hiring process and top-notch candidate pool. Couldn't ask for more!",
    role: "Employer",
  },
  {
    name: "Courtney Henry",
    username: "courtneyh",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The career advice section was a game-changer. It helped me pivot to a new industry successfully.",
    role: "Job Seeker",
  },
  {
    name: "Arlene McCoy",
    username: "arlenemc",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Posting jobs and managing applications is a breeze. Highly recommend for all employers!",
    role: "Employer",
  },
];
