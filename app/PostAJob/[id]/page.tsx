import { notFound } from "next/navigation";
import JobPostDashboard from "../JobDashboardpage";
import { headers } from "next/headers";

interface JobDetailProps {
  id: string;
  jobPosition: string;
  description: string;
  location: string;
  salary: number;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE";
  detail?: string;
  timeOfPosting: Date;
  companyemailId: string;
  companyId: string;
  companyName?: string;
}

async function getJobById(id: string): Promise<JobDetailProps | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    console.log("API URL:", baseUrl);
    const response = await fetch(`${baseUrl}/api/Dashboardjob/${id}`, {
      method: "GET",
      headers: headers(),
      cache: "no-store",
    });
    if (response.status === 404) {
      return null; // Job not found
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const job = await response.json();
    console.log(job, "this is JOB");

    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error; // Re-throw to handle in the component
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobById(params.id);
  console.log(job);

  if (!job) {
    notFound();
  }

  return <JobPostDashboard jobDetail={job} />;
}
