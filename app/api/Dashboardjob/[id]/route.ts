import { NextResponse } from "next/server";
import prisma from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  console.log("Requested Job ID:", jobId);

  try {
    const session = await getServerSession(authConfig);
    console.log("Session:", session);

    if (!session?.user?.uid) {
      console.log("User not authenticated");
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const job = await prisma.jobDetail.findUnique({
      where: { id: jobId },
      include: { companyEmail: true }, // Include the related User data
    });
    console.log("Job:", job);

    if (!job) {
      console.log("Job not found");
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Check if the authenticated user is the one who posted the job
    if (session.user.uid !== job.companyemailId) {
      console.log("User not authorized");
      return NextResponse.json(
        { message: "Not authorized to view this job" },
        { status: 403 }
      );
    }

    // If we reach here, the user is authorized to view the job
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error in GET /api/jobs/[id]:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
