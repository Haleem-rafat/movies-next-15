import { NextRequest, NextResponse } from "next/server";
import suggestionsService from "@/app/api/service/suggestions.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
    }

    const data = await suggestionsService.getPersonDetails(id);

    return NextResponse.json(data);
  } catch (error) {
    // Log error for debugging (consider using a proper logging service in production)
    return NextResponse.json(
      { error: "Failed to fetch person details" },
      { status: 500 }
    );
  }
}
