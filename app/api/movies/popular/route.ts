import { NextRequest, NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = searchParams.get("limit");

    const data = await suggestionsService.getPopularMovies(page);

    // Apply limit if specified
    if (limit && data.results) {
      data.results = data.results.slice(0, parseInt(limit));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Popular movies API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
} 