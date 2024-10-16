import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db"; // Import your Prisma client
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  try {
    const job = await db.jobDetail.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Check if the user is authorized to delete this job
    // if (session.user.email !== job.companyemailId) {
    //   return NextResponse.json(
    //     { message: "Not authorized to delete this job" },
    //     { status: 403 }
    //   );
    // }

    // Proceed to delete the job
    await db.jobDetail.delete({
      where: {
        id: jobId,
      },
    });

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      {
        message: "Failed to delete job",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }
    const user = await db.user.findUnique({
      where: { username: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = await req.json();
    const { name, phoneNumber, resumeLink, coverLetter } = data;

    if (!name || !resumeLink || !coverLetter || !phoneNumber) {
      return NextResponse.json(
        { message: "All Fields Required" },
        { status: 400 }
      );
    }
    // const profile = await db.profile.findUnique({
    //   where: { id: user.id },
    //   include: {
    //     JobApplications: true,
    //   },
    // });

    const jobapplication = await db.jobApplication.create({
      data: {
        Profile: { connect: { id: user.id } },
        name,
        phoneNumber,
        resumeLink,
        coverLetter,
      },
    });

    return NextResponse.json(
      {
        message: "Job Posted Succesfully",
        jobapplication: jobapplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/profileApi:", error);
    return NextResponse.json(
      {
        message: "Failed to update profile",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
