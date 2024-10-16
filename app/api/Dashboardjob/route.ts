import db from "@/app/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const jobs = await db.jobDetail.findMany({
      orderBy: {
        timeOfPosting: "desc",
      },
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
