import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.user || !session.user.uid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.uid },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const profileData = {
      id: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
      provider: user.provider,
      name: session.user.name,
      email: session.user.email,
      phoneNumber: user.profile?.phoneNumber,
      location: user.profile?.location,
      latestOrganization: user.profile?.latestOrganization,
      YearOfExperience: user.profile?.YearOfExperience,
      AboutMe: user.profile?.AboutMe,
      Skill: user.profile?.Skill,
      Education: user.profile?.Education,
      Achievements: user.profile?.Achievements,
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error in GET /api/profileApi:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch profile",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.uid) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: session.user.uid },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const profileData = await req.json();
    const {
      phoneNumber,
      location,
      latestOrganization,
      YearOfExperience,
      AboutMe,
      Skill,
      Education,
      Achievements,
    } = profileData;

    let updatedProfile;

    if (user.profile) {
      // Update existing profile
      updatedProfile = await db.profile.update({
        where: { id: user.profile.id },
        data: {
          phoneNumber: phoneNumber,
          location,
          latestOrganization,
          YearOfExperience,
          AboutMe,
          Skill,
          Education,
          Achievements,
        },
      });
    } else {
      // Create new profile
      updatedProfile = await db.profile.create({
        data: {
          user: { connect: { id: user.id } },
          phoneNumber: phoneNumber,
          location,
          latestOrganization,
          YearOfExperience,
          AboutMe,
          Skill,
          Education,
          Achievements,
        },
      });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", profile: updatedProfile },
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
