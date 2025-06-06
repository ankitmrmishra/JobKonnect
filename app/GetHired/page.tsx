"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";
import Filters from "./Filters";
import Jobs from "./Jobs";
import HiringCTAs from "./HiringCTAs";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string | null>
  >({});

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filters: Record<string, string | null>) => {
    setActiveFilters(filters);
  };

  return (
    <div className="">
      <div className="top md:py-12 mb-4 p-3 md:px-36">
        <div className="header py-3">
          <h1 className="text-4xl md:text-6xl font-semibold">
            Find Your <span className="text-blue-600">Dream </span>Job
          </h1>
          <span className="text-sm text-gray-500">
            Thousands of jobs in the computer, engineering and technology
            sectors are waiting for you.
          </span>
        </div>
        <div className="search_job flex justify-start align-middle items-center gap-2">
          <input
            type="text"
            className="w-[30rem] py-2 rounded-md outline-none px-2 border-2 border-gray-200"
            placeholder="Search For Your Job"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button className="font-medium py-5">
            <Search className="size-4 space-x-1" /> Search
          </Button>
        </div>
      </div>
      <div className="mainComponent bg-gray-100 rounded-t-lg md:grid grid-cols-5 flex flex-col w-full md:items-start justify-center align-middle items-center">
        <div className="col-span-1 flex p-4 gap-3">
          <Filters
            className=""
            onFilterChange={(filters) => handleFilterChange(filters)}
          />
        </div>
        <div className="w-full p-10 col-span-3 flex">
          <Jobs
            className=""
            searchQuery={searchQuery}
            filters={activeFilters}
          />
        </div>
        <div className="w-[17rem] md:py-24 py-5">
          <HiringCTAs className="" />
        </div>
      </div>
    </div>
  );
};

export default Page;
