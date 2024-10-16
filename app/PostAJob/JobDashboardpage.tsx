"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarIcon,
  MapPinIcon,
  BuildingIcon,
  MailIcon,
  DollarSignIcon,
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

interface JobPostDashboardProps {
  jobDetail: JobDetailProps;
}

export default function JobPostDashboard({ jobDetail }: JobPostDashboardProps) {
  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <BuildingIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {jobDetail.companyName || "Company Name Not Available"}
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

          <div>
            <h3 className="text-lg font-semibold mb-2">Company Information</h3>
            <div className="flex items-center">
              <MailIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">{jobDetail.companyId}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-500">
              Job ID: {jobDetail.id}
            </span>
            <span className="text-sm text-gray-500">
              Company ID: {jobDetail.companyId}
            </span>
          </div>

          {/* <div className="flex justify-between items-center pt-4">
            <Button onClick={onApply} className="w-full mr-2">
              Apply Now
            </Button>
            <Button onClick={onSave} variant="outline" className="w-full ml-2">
              Save Job
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
