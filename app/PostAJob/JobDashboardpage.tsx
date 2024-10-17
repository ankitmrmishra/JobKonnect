"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CalendarIcon,
  MapPinIcon,
  BuildingIcon,
  DollarSignIcon,
  UserIcon,
  PhoneIcon,
  LinkIcon,
} from "lucide-react";

type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE";

interface JobDetailProps {
  id: string;
  jobPosition: string;
  description: string;
  location: string;
  salary: number;
  employmentType: EmploymentType;
  detail?: string;
  timeOfPosting: Date;
  companyemailId: string;
  companyId: string;
  companyName?: string;
}

interface Application {
  id: string;
  name: string;
  phoneNumber: string;
  coverLetter: string;
  resumeLink: string;
  profileId: string;
  JobdetailId: string;
  status: "PENDING" | "REJECTED" | "INTERVIEW_SCHEDULED";
}

interface JobPostDashboardProps {
  jobDetail: JobDetailProps;
}

export default function JobPostDashboard({ jobDetail }: JobPostDashboardProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/jobs/${jobDetail.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      console.log(data, "kiubdfjbejhf ");

      setApplications(data.Jobapplication);
    } catch (err) {
      setError("Failed to load applications. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              {jobDetail.jobPosition}
            </CardTitle>
            <Badge variant="outline">
              {jobDetail.employmentType.replace("_", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <BuildingIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {jobDetail.companyId || "Company Name Not Available"}
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">{jobDetail.location}</span>
            </div>
            <div className="flex items-center">
              <DollarSignIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                ${jobDetail.salary.toLocaleString()} per year
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                Posted on{" "}
                {new Date(jobDetail.timeOfPosting).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-sm text-gray-600">{jobDetail.description}</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-500">
              Job ID: {jobDetail.id}
            </span>
            <span className="text-sm text-gray-500">
              Company ID: {jobDetail.companyemailId}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading applications...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-4">
              No applications received yet.
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {applications.map((application, index) => (
                <AccordionItem key={application.id} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>{application.name}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <PhoneIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm">
                          {application.phoneNumber}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">
                          Cover Letter
                        </h4>
                        <p className="text-sm text-gray-600">
                          {application.coverLetter}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <LinkIcon className="mr-2 h-4 w-4 opacity-70" />
                        <a
                          href={application.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
