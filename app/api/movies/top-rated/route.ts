import { NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET() {
  try {
    const data = await suggestionsService.getTopRatedMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to fetch top rated movies", error);
    return NextResponse.json(
      { error: "Failed to fetch top rated movies" },
      { status: 500 }
    );
  }
}
