"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";

import Postpage from "./postpage";
// import JobPostSkeleton from "./PostPageSkeleton";
import { CustomSession } from "@/lib/auth";
import CreateCompany, { CompanyData } from "./CreateCompany";
import JobPostSkeleton from "./PostPageSkeleton";
export interface Com extends CompanyData {
  id: string;
}
const Page = () => {
  const { data: session } = useSession() as {
    data: CustomSession | null;
  };
  const { status } = useSession();
  // const [comapanies, setcompany] = useState<Com[]>([]);

  console.log(session, "this is postpage session");
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/companies");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log(data, "this is company ");

      console.log(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();

  if (status === "loading")
    return (
      <div>
        <JobPostSkeleton />
      </div>
    );

  return session ? (
    <div className="flex flex-col gap-16">
      <Postpage />
      <CreateCompany />
    </div>
  ) : (
    <div className="w-full top-1/2 fixed left-[20%] text-6xl justify-center align-middle items-center gap-2">
      You have to{" "}
      <button
        onClick={() => signIn()}
        className="bg-black px-3 py-1 text-white rounded-md p-2"
      >
        Sign In
      </button>{" "}
      to see this page
    </div>
  );
};

export default Page;
