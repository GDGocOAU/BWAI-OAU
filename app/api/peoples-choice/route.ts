import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { projectId, token } = await request.json();
    
    if (!projectId || !token) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const parsedProjectId = parseInt(projectId, 10);
    if (isNaN(parsedProjectId)) {
      return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
    }

    // Validate the magic link token
    const magicLink = await prisma.magicLinkToken.findUnique({
      where: { token },
    });

    if (!magicLink) {
      return NextResponse.json({ error: "Invalid or expired voting link." }, { status: 403 });
    }

    if (magicLink.expiresAt < new Date()) {
      return NextResponse.json({ error: "This voting link has expired. Please request a new one." }, { status: 403 });
    }

    // Check if email already voted just to be doubly sure
    const existingVote = await prisma.peoplesChoiceVote.findUnique({
      where: { email: magicLink.email },
    });

    if (existingVote) {
      await prisma.magicLinkToken.delete({ where: { token } });
      return NextResponse.json({ error: "This account has already cast a vote." }, { status: 403 });
    }

    // Save vote to DB using a transaction to ensure token is consumed
    await prisma.$transaction([
      prisma.peoplesChoiceVote.create({
        data: {
          projectId: parsedProjectId,
          email: magicLink.email,
        },
      }),
      prisma.magicLinkToken.delete({
        where: { token },
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("People's Choice Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
