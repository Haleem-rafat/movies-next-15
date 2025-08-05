import { NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET() {
  try {
    const data = await suggestionsService.getPopularMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to fetch popular movies", error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}
