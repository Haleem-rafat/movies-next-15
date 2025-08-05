import { NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET() {
  try {
    const data = await suggestionsService.getUpcomingMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Failed to fetch upcoming movies", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming movies" },
      { status: 500 }
    );
  }
}
