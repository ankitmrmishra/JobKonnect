"use client";
import { useSession, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

import Postpage from "./postpage";
// import JobPostSkeleton from "./PostPageSkeleton";
import { CustomSession } from "@/lib/auth";
import CreateCompany, { CompanyData } from "./CreateCompany";
import JobPostSkeleton from "./PostPageSkeleton";
// import { company } from "@prisma/client";
export interface Com extends CompanyData {
  id: string;
}
const Page = () => {
  const { data: session } = useSession() as {
    data: CustomSession | null;
  };
  const { status } = useSession();
  const [comapanies, setcompany] = useState<Com[]>([]);
  const [companyJustCreated, setCompanyJustCreated] = useState(false);
  const [companycreated, setcompanycreated] = useState<string>("");
  console.log(session, "this is postpage session");

  useEffect(() => {
    if (session?.user?.uid) {
      fetchcompanies();
    }
  }, [session]);

  const fetchcompanies = async () => {
    try {
      const response = await fetch("/api/companies");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log(data.companies[0].id, "this is company ");
      const filteredJobs = data.companies.filter(
        (company: Com) => company.id === session?.user?.uid
      );

      if (filteredJobs.length > 0) {
        setcompany(filteredJobs);
        setcompanycreated(filteredJobs[0].companyName);
      } else {
        console.log("No companies found for this user");
        setcompanycreated(""); // or some default value
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleCompanyCreated = () => {
    setCompanyJustCreated(true);
    fetchcompanies(); // Refetch companies after creation
  };

  if (status === "loading")
    return (
      <div>
        <JobPostSkeleton />
      </div>
    );

  return session ? (
    <div className="flex flex-col gap-16">
      {comapanies.length > 0 || (companyJustCreated && companycreated) ? (
        <Postpage companyName={companycreated} />
      ) : (
        <CreateCompany handlecompanycreated={handleCompanyCreated} />
      )}
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
