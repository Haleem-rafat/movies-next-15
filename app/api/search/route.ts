import { NextRequest, NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = searchParams.get("limit");

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    const data = await suggestionsService.searchMulti({
      query: query.trim(),
      page,
      include_adult: false,
    });

    // Apply limit if specified
    if (limit && data.results) {
      data.results = data.results.slice(0, parseInt(limit));
    }

    return NextResponse.json(data);
  } catch (error) {
    // Log error for debugging (consider using a proper logging service in production)
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
