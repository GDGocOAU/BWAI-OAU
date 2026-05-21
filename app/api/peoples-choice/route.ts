import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const projectIdStr = formData.get("projectId")?.toString();
    const projectId = parseInt(projectIdStr || "", 10);
    const token = formData.get("token")?.toString()?.trim();
    
    if (isNaN(projectId) || !token) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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
      // If they voted, still delete the token so it can't be reused
      await prisma.magicLinkToken.delete({ where: { token } });
      return NextResponse.json({ error: "This account has already cast a vote." }, { status: 403 });
    }

    const linkedInFile = formData.get("linkedInProof") as File | null;
    const twitterFile = formData.get("twitterProof") as File | null;
    const atfFile = formData.get("atfProof") as File | null;

    if (!linkedInFile || !twitterFile || !atfFile) {
      return NextResponse.json({ error: "All proof images must be uploaded." }, { status: 400 });
    }

    // Check file type: must be image
    if (!linkedInFile.type.startsWith("image/") || !twitterFile.type.startsWith("image/") || !atfFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    }

    // Check size limit: 2MB = 2 * 1024 * 1024 bytes
    const MAX_SIZE = 2 * 1024 * 1024;
    if (linkedInFile.size > MAX_SIZE || twitterFile.size > MAX_SIZE || atfFile.size > MAX_SIZE) {
      return NextResponse.json({ error: "One or more files exceed the 2MB limit." }, { status: 400 });
    }

    // Function to convert File to Buffer
    const toBuffer = async (file: File) => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    };

    // Upload images to Cloudinary concurrently
    const [linkedInUrl, twitterUrl, atfUrl] = await Promise.all([
      uploadToCloudinary(await toBuffer(linkedInFile), linkedInFile.type),
      uploadToCloudinary(await toBuffer(twitterFile), twitterFile.type),
      uploadToCloudinary(await toBuffer(atfFile), atfFile.type),
    ]);

    // Save vote to DB using a transaction to ensure token is deleted
    await prisma.$transaction([
      prisma.peoplesChoiceVote.create({
        data: {
          projectId,
          email: magicLink.email,
          linkedInProof: linkedInUrl,
          twitterProof: twitterUrl,
          atfProof: atfUrl,
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
