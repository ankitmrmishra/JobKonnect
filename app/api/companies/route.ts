import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
export async function GET() {
  try {
    const companies = await db.company.findMany({});
    return NextResponse.json({ companies }, { status: 200 });
  } catch (error) {
    console.error("Error Fetching jobs:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch jobs",
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

    const company = await db.company.findUnique({
      where: {
        id: session?.user.uid,
      },
    });

    if (company) {
      return NextResponse.json(
        { message: "Company already created " },
        { status: 404 }
      );
    }

    const Companydata = await req.json();

    const { companyName, companyImage, companyDetail } = Companydata;

    if (!companyName || !companyImage || !companyDetail) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newCompany = await db.company.create({
      data: {
        companyName: companyName as string,
        companyImage: companyImage as string,
        companyDetail: companyDetail as string,
        id: session.user.uid,
      },
    });
    return NextResponse.json(
      { message: "Job posted successfully", job: newCompany },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      {
        message: "Failed to dend companies ",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
