"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Ankit from "../../public/Ankit.jpg";
import Anmol from "../../public/Anmol.jpg";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  interface TeamMembersInterface {
    name: string;
    role: string;
    image: string | StaticImageData;
  }

  const teamMembers: TeamMembersInterface[] = [
    {
      name: "Anmol Sinha",
      role: "CEO & Co-Founder",
      image: Anmol,
    },
    {
      name: "Ankit Mishra",
      role: "CTO & Co-Founder",
      image: Ankit,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted md:px-44 px-4">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container mx-auto px-4 py-16 space-y-24"
      >
        <motion.section variants={fadeIn} className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            About{" "}
            <h1 className=" text-black font-bold mb-4">
              Job<span className="text-blue-500">Konnect</span>
            </h1>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing the job market by connecting talented individuals
            with their dream careers through innovative technology and
            personalized experiences.
          </p>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-12">
          <h2 className="text-3xl font-semibold text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Empower Careers", "Foster Innovation", "Build Communities"].map(
              (item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-card text-card-foreground rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-4">{item}</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-12">
          <h2 className="text-3xl font-semibold text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            {[2020, 2021, 2022, 2023].map((year, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`flex items-center mb-8 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  }`}
                >
                  <h3 className="text-xl font-semibold">{year}</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-12">
          <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
          <div className="flex justify-center align-middle items-center gap-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center space-y-4"
              >
                <div className="relative size-32 md:size-48 mx-auto overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="text-center space-y-8">
          <h2 className="text-3xl font-semibold">Join Our Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of the revolution in job searching and recruitment.
            Let&apos;s shape the future of work together.
          </p>
          <Button size="lg" className="animate-pulse">
            Explore Opportunities
          </Button>
        </motion.section>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
      ></motion.div>
    </div>
  );
}
