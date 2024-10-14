"use client";
import Faq from "@/components/Faq";
import FeatPortal from "@/components/featPortal";
import Hero from "@/components/Hero";
import TrustedByCompanies from "@/components/ui/Companies";
import WhatpeopleAreSaying from "@/components/WhatpeopleAreSaying";
// import { useSession } from "next-auth/react";

export default function Home() {
  // const { status } = useSession();
  // if (status === "loading") return <div>loading</div>;
  return (
    <>
      <div className="md:px-10 lg:px-24 px-2 md:py-20 p-5 flex flex-col justify-center align-middle gap-3 items-center">
        <Hero />
        <TrustedByCompanies />
        <FeatPortal />
      </div>
      <WhatpeopleAreSaying />
      <Faq />
    </>
  );
}
