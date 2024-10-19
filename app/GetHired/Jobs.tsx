"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Job } from "../PostAJob/postpage";
import JobListingCard from "./JobCard";

interface JobsProps {
  className: string;
  searchQuery: string;
  filters: Record<string, string | null>;
}

const Jobs = ({ className, searchQuery, filters }: JobsProps) => {
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [numberofJobs, setNumberofJobs] = useState<number>(0);

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, filters]);

  const fetchJobs = async () => {
    try {
      // Convert filters and search query to URL parameters
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key.toLowerCase(), value);
      });

      const queryString = params.toString();
      const response = await fetch(
        `/api/jobs${queryString ? `?${queryString}` : ""}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setPostedJobs(data.jobs);
      setNumberofJobs(data.jobs.length);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const filteredJobs = postedJobs.filter((job) =>
    searchQuery
      ? job.jobPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div
      className={cn(
        "space-y-4 flex flex-col justify-start items-start",
        className
      )}
    >
      <div className="flex">
        <span className="md:text-4xl text-2xl text-black">
          {filteredJobs.length} Jobs
        </span>
      </div>

      <div className="jobcards">
        {filteredJobs.map((jobs, index) => (
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
