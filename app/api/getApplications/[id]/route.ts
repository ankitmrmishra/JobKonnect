import db from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  try {
    const JobApplications = await db.jobApplication.findMany({
      where: { JobdetailId: jobId },
    });

    if (!JobApplications) {
      return NextResponse.json({
        message: "No Applications for this JOb",
        status: 404,
      });
    }
    return NextResponse.json(JobApplications);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
