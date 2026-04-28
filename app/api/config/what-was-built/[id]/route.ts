import { NextResponse } from "next/server";
import { CONFIG_AUTH_HEADER, isValidConfigCode } from "@/lib/config-auth";
import { COMMUNITIES } from "@/lib/config";
import {
  deleteWhatWasBuiltProject,
  updateWhatWasBuiltProject,
  type PublicSubmitPayload,
} from "@/lib/what-was-built-data";

function isAuthorized(request: Request): boolean {
  return isValidConfigCode(request.headers.get(CONFIG_AUTH_HEADER));
}

function parseProjectId(rawId: string): number | null {
  const id = parseInt(rawId, 10);
  if (isNaN(id) || id <= 0) {
    return null;
  }
  return id;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseProjectId(rawId);

  if (!id) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | Partial<PublicSubmitPayload & { likes: unknown }>
    | null;

  const name = body?.name?.trim();
  const community = body?.community?.trim();
  const description = body?.description?.trim();
  const techTags = Array.isArray(body?.techTags) ? body.techTags : null;
  const tags = Array.isArray(body?.tags) ? body.tags : null;
  const demoHref = body?.demoHref?.trim() ?? "#";
  const likesRaw = body?.likes;
  const likes =
    typeof likesRaw === "number"
      ? likesRaw
      : typeof likesRaw === "string"
        ? Number.parseInt(likesRaw, 10)
        : NaN;

  if (!name || !community || !description || !techTags || !tags || Number.isNaN(likes)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (!COMMUNITIES.includes(community as never)) {
    return NextResponse.json({ error: "A valid community is required." }, { status: 400 });
  }

  if (name.length > 120 || description.length > 500 || community.length > 80) {
    return NextResponse.json({ error: "One or more fields exceed the maximum length." }, { status: 400 });
  }

  if (!Number.isInteger(likes) || likes < 0 || likes > 1_000_000) {
    return NextResponse.json({ error: "Likes must be a valid non-negative number." }, { status: 400 });
  }

  try {
    const updated = await updateWhatWasBuiltProject(id, {
      name,
      community: community as PublicSubmitPayload["community"],
      description,
      techTags,
      tags,
      demoHref,
      likes,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Could not update project." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseProjectId(rawId);

  if (!id) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  try {
    await deleteWhatWasBuiltProject(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete project." }, { status: 500 });
  }
}
