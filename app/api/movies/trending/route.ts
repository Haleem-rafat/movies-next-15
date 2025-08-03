import { NextRequest, NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const mediaType =
      (searchParams.get("mediaType") as "all" | "movie" | "tv" | "person") ||
      "all";
    const timeWindow =
      (searchParams.get("timeWindow") as "day" | "week") || "week";
    const page = parseInt(searchParams.get("page") || "1");

    const data = await suggestionsService.getTrending({
      mediaType,
      timeWindow,
      page,
    });

    // Apply limit if specified
    if (limit && data.results) {
      data.results = data.results.slice(0, parseInt(limit));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Trending movies API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}
