import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { EmploymentType } from "@prisma/client";

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
    const {
      jobPosition,
      description,
      location,
      salary,
      employmentType,
      detail,
      companyName,
    } = data;

    if (
      !jobPosition ||
      !description ||
      !location ||
      !salary ||
      !employmentType ||
      !companyName
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingCompany = await db.company.findUnique({
      where: { companyName: companyName },
    });

    const newJob = await db.jobDetail.create({
      data: {
        jobPosition: jobPosition as string,
        description: description as string,
        location: location as string,
        salary: parseFloat(salary),
        employmentType: employmentType as EmploymentType,
        detail: detail as string,
        companyEmail: {
          connect: { id: user.id },
        },
        companyName: {
          connect: { companyName: existingCompany?.companyName }, // Connect to an existing company using its ID
        },
      },
    });

    return NextResponse.json(
      { message: "Job posted successfully", job: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json(
      {
        message: "Failed to post job",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

import { Prisma } from "@prisma/client";

// app/api/jobs/route.ts
export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const searchQuery = searchParams.get("search");

    // Get filter parameters
    const location = searchParams.get("location");
    const salary = searchParams.get("salary");
    const datePosting = searchParams.get("date of posting");
    const employmentType = searchParams.get("type of employment");

    // Define `where` using Prisma's type
    const where: Prisma.JobDetailWhereInput = {};

    // Add search conditions
    if (searchQuery) {
      where.OR = [
        { jobPosition: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
        { location: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    // Add filter conditions
    if (location) {
      where.location = location === "Remote job" ? "Remote" : "In-Office";
    }

    if (salary) {
      const salaryMatch = salary.match(/>?\s*(\d+)k/);
      if (salaryMatch) {
        const salaryValue = parseInt(salaryMatch[1]) * 1000;
        where.salary = { gte: salaryValue };
      }
    }

    if (datePosting) {
      const now = new Date();
      switch (datePosting) {
        case "Last 24 hours":
          where.timeOfPosting = {
            gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
          };
          break;
        case "Last 3 days":
          where.timeOfPosting = {
            gte: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          };
          break;
        case "Last 7 days":
          where.timeOfPosting = {
            gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          };
          break;
      }
    }

    if (employmentType) {
      where.employmentType = employmentType.toUpperCase() as EmploymentType;
    }

    // Fetch filtered jobs
    const jobs = await db.jobDetail.findMany({
      where,
      orderBy: { timeOfPosting: "desc" },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch jobs",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
