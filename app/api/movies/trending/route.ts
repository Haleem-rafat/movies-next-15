import { NextRequest, NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    const data = await suggestionsService.getTrending();

    if (limit && data.results) {
      data.results = data.results.slice(0, parseInt(limit));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to fetch trending movies", error);
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}
