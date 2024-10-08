import { NextResponse } from "next/server";
import prisma from "@/app/db"; // Import your Prisma client

// GET /api/jobs/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;

  try {
    const job = await prisma.jobDetail.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
