import { NextResponse } from "next/server";
import { CONFIG_AUTH_HEADER, isValidConfigCode } from "@/lib/config-auth";
import { deletePeoplesChoiceVote } from "@/lib/peoples-choice-data";

function isAuthorized(request: Request): boolean {
  return isValidConfigCode(request.headers.get(CONFIG_AUTH_HEADER));
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ voteId: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { voteId } = await params;
  const id = parseInt(voteId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid vote ID." }, { status: 400 });
  }

  try {
    await deletePeoplesChoiceVote(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
