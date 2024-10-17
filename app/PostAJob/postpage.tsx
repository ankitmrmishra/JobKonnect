"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "./MenuBar";
import { Button } from "@/components/ui/button";

import { EmploymentType } from "@prisma/client";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DashboardIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export interface JobData {
  jobPosition: string;
  description: string;
  location: string;
  country: string;
  salary: number;
  employmentType: EmploymentType | "";
  detail: string;
  companyName: string;
  id: string;
}
export interface Job extends JobData {
  companyId: string;
  timeOfPosting: string | number | Date;

  companyemailId: string;
}
const Postpage = ({ companyName }: { companyName: string }) => {
  const [jobData, setJobData] = useState<JobData>({
    jobPosition: "",
    description: "",
    location: "",
    country: "",
    salary: 0,
    employmentType: "",
    detail: "",
    companyName: companyName,
    id: "",
  });
  const [editorKey, setEditorKey] = useState(0);
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const { data: session } = useSession() as { data: CustomSession | null };

  useEffect(() => {
    fetchJobs();
  }, [session]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      console.log(response, "this is response on 13:10");

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log(data.jobs, "this is company email id");

      const filteredJobs = data.jobs.filter(
        (job: Job) => job.companyemailId === session?.user?.uid
      );

      // Set the posted jobs to the filtered list
      setPostedJobs(filteredJobs);

      console.log(
        data.jobs,
        "this is data jobs and this is me testing the jobs"
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: EmploymentType) => {
    setJobData((prev) => ({ ...prev, employmentType: value }));
  };

  const handleEditorChange = (content: string) => {
    setJobData((prev) => ({ ...prev, detail: content }));
  };
  const resetEditor = () => {
    setEditorKey((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !jobData.jobPosition ||
      !jobData.description ||
      !jobData.location ||
      !jobData.employmentType ||
      jobData.salary <= 0 ||
      !jobData.companyName
    ) {
      toast.error("Please fill in all required fields", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Wohoo!! Job Created Successfully", {
          style: {
            background: "green",
            color: "white",
          },
        });
        setJobData({
          jobPosition: "",
          description: "",
          location: "",
          country: "",
          salary: 0,
          employmentType: "",
          detail: "",
          companyName: companyName,
          id: "",
        });

        // Reseting the RichTextEditor
        resetEditor();
      }
      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const result = await response.json();
      console.log("Job created:", result);
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create job",
        {
          style: {
            background: "red",
            color: "white",
          },
        }
      );
    }
  };

  const deletehandle = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      toast.success("Job deleted successfully", {
        style: {
          background: "green",
          color: "white",
        },
      });

      // Optionally, refresh the list of posted jobs
      fetchJobs();
    } catch (error) {
      console.error("Error DELETING this job:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete this job",
        {
          style: {
            background: "red",
            color: "white",
          },
        }
      );
    }
  };

  return (
    <div className="w-full md:grid grid-cols-7 h-[100vh] md:p-5 ">
      <div className="postpage_dashboard col-span-2 rounded-s-md p-3 bg-gray-100 flex flex-col gap-3 ">
        <span className="main_text font-semibold">Your Job Posts</span>
        <div className="drafts_and_posted w-full">
          <Tabs defaultValue="Posted" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black text-white  ">
              <TabsTrigger value="Posted">Posted</TabsTrigger>
              <TabsTrigger value="Drafts">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="Posted">
              {postedJobs.map((job) => (
                <div
                  key={job.id}
                  className="mb-4 p-4 border rounded bg-white text-black"
                >
                  <div className=" flex justify-between items-center align-middle">
                    <h3 className="font-bold">{job.jobPosition}</h3>
                    <div className="">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"link"}>
                            <DotsVerticalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => deletehandle(job.id)}
                            className="text-red-500 hover:bg-red-200 hover:cursor-pointer hover:text-red-700"
                          >
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="">
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="bg-blue-100 flex">
                            <Link
                              className="flex gap-2"
                              href={`/PostAJob/${job.id}`}
                            >
                              Dashboard <DashboardIcon className="size-4" />
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <p className="text-sm text-black/65">{job.description}</p>
                    <p className="">
                      <span className="font-bold">Location:</span>{" "}
                      {job.location}, {job.country}
                    </p>
                    <p>
                      <span className="font-bold">Salary:</span> ${job.salary}{" "}
                      p.a.
                    </p>
                    <p>
                      <span className="font-bold">Type:</span>{" "}
                      {job.employmentType}
                    </p>
                    <p>
                      <span className="font-bold">Posted:</span>{" "}
                      {new Date(job.timeOfPosting).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="Drafts">
              This is the section where you will see all your drafts of the job
              that you have not posted yet.
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="postpage_editor_area col-span-4 rounded-r-md p-5 flex flex-col justify-start align-middle items-start gap-5"
      >
        <div className="md:w-[40rem] w-full">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Company Name
          </Label>
          <Input
            name="companyName"
            value={companyName}
            onChange={handleInputChange}
            disabled={true}
            className="text-black"
          />
        </div>
        <div className="md:w-[40rem] w-full">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Job Position
          </Label>
          <Input
            name="jobPosition"
            value={jobData.jobPosition}
            onChange={handleInputChange}
            placeholder="eg: Software Developer"
            className="text-black"
          />
        </div>
        <div className="md:w-[40rem] w-full">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Description
          </Label>
          <Input
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
            placeholder="Describe the job role in brief"
            className="text-black"
          />
        </div>
        <div className="location">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Location
          </Label>
          <div className="flex gap-2">
            <Input
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              placeholder="City"
              className="text-black"
            />
            <Input
              name="country"
              value={jobData.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="text-black"
            />
          </div>
        </div>
        <div className="sal_emplytype flex gap-3">
          <div className="salary">
            <Label className="text-black font-semibold text-lg -tracking-tight">
              Salary
            </Label>
            <Input
              name="salary"
              value={jobData.salary}
              onChange={handleInputChange}
              placeholder="Salary in $"
              className="text-black"
            />
          </div>
          <div className="employment_type">
            <Label className="text-black font-semibold text-lg -tracking-tight">
              Employment Type
            </Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select the Employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employment Type</SelectLabel>
                  <SelectItem value="Fulltime">Full-Time</SelectItem>
                  <SelectItem value="InternShip">Internship</SelectItem>
                  <SelectItem value="ContractBasis">Contract Basis</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Write In Detail About the Job
          </Label>
          <RichTextEditor key={editorKey} onChange={handleEditorChange} />
        </div>
        <Button type="submit" className="mt-4">
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default Postpage;
