"use client";
import { DollarSign, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Job } from "../PostAJob/postpage";
import { toast } from "sonner";
import "./JobStyle.css";
import { DialogDemo } from "./ApplyDialog";

type EmploymentType = "Fulltime" | "InternShip" | "ContractBasis";

interface JobDetailProps {
  id: string;
  jobPosition: string;
  description: string;
  location: string;
  salary: number;
  employmentType: EmploymentType;
  detail: string;
  timeOfPosting: Date;
  companyemailId: string;

  onApply: () => void;
  onSave: () => void;
}

export default function Jobdetailcomp({
  description,
  location,
  salary,
  employmentType,
  detail,
  onApply,
  onSave,
  jobPosition,
}: JobDetailProps) {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        console.log(response, "this is JobDetail response");

        if (!response.ok) {
          toast.error("not found");
          throw new Error("Failed to fetch job");
        }
        const data = await response.json();
        console.log("this is JobDetail job data", data);

        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    }

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="md:text-4xl text-xl font-semibold">
            {jobPosition}
          </span>
        </div>
        <Button onClick={onApply}>Apply Now</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="text-gray-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="text-gray-400" />
          <span>${salary.toLocaleString()} / year</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="text-gray-400" />
          <span>{employmentType}</span>
        </div>
        {/* <div className="flex items-center space-x-2">
          <CalendarDays className="text-gray-400" />
          <span>Posted {timeOfPosting.toLocaleDateString()}</span>
        </div> */}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Details</h2>
        <div
          className="job-detail"
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" onClick={onSave} className="w-full sm:w-auto">
          Save Job
        </Button>
        <DialogDemo id={id} />
      </div>
    </div>
  );
}
