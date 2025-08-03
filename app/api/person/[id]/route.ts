import { NextRequest, NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid person ID" },
        { status: 400 }
      );
    }

    const data = await suggestionsService.getPersonDetails(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Person details API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch person details" },
      { status: 500 }
    );
  }
} 