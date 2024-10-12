"use client";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import { Job } from "../PostAJob/postpage";

import JobListingCard from "./JobCard";

const Jobs = ({ className }: { className: string }) => {
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [numberofJobs, setNumberofJobs] = useState<number>(0);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log("this is data", data);

      setPostedJobs(data.jobs);
      setNumberofJobs(data.jobs.length);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  return (
    <div
      className={cn(
        " space-y-4  flex flex-col justify-start items-start",
        className
      )}
    >
      <div className="flex">
        <span className="md:text-4xl text-2xl text-black ">
          {numberofJobs} Jobs
        </span>
      </div>

      <div className="jobcards">
        {postedJobs.map((jobs, index) => (
          <div key={index} className="py-5">
            <JobListingCard
              title={jobs.jobPosition}
              description={jobs.description}
              location={jobs.location}
              salary={jobs.salary}
              type={jobs.employmentType}
              companyNew={jobs.companyId}
              jobId={jobs.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
