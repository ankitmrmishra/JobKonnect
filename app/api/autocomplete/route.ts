import { NextRequest, NextResponse } from "next/server";
import AutoComplete from "@/lib/google";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const predictions = await AutoComplete(input);
    console.log("Predictions from Google API:", predictions);
    return NextResponse.json(predictions);
  } catch (error) {
    console.error("Error in autocomplete API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
