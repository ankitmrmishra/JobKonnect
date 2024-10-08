import { notFound } from "next/navigation";
import JobDetailPage from "@/app/GetHired/JobDetail";

type JobDetail = {
  id: string;
  jobPosition: string;
  description: string;
  location: string;
  salary: number;
  employmentType: "Fulltime" | "InternShip" | "ContractBasis";
  detail: string;
  timeOfPosting: Date;
  companyemailId: string;
};

async function getJobById(id: string): Promise<JobDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Change this based on your environment
    const response = await fetch(`${baseUrl}/api/jobs/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const job = await response.json();
    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);
  console.log(job);

  if (!job) {
    notFound();
  }

  return (
    <JobDetailPage
      {...job}
      onApply={async () => {
        "use server";
        console.log(`Applying for job ${job.id}`);
      }}
      onSave={async () => {
        "use server";
        console.log(`Saving job ${job.id}`);
      }}
    />
  );
}
