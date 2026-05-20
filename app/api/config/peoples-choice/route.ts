import { NextResponse } from "next/server";
import { CONFIG_AUTH_HEADER, isValidConfigCode } from "@/lib/config-auth";
import { getVotingResultsAdmin } from "@/lib/peoples-choice-data";

function isAuthorized(request: Request): boolean {
  return isValidConfigCode(request.headers.get(CONFIG_AUTH_HEADER));
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const data = await getVotingResultsAdmin();
    return NextResponse.json(data, {
      headers: {
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching admin voting results:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
