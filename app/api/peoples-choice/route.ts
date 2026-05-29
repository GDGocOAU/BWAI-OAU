import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { isVotingClosed } from "@/lib/config";

export async function POST(request: Request) {
  try {
    if (isVotingClosed()) {
      return NextResponse.json({ error: "Voting has closed. Thank you for your participation!" }, { status: 403 });
    }

    const { projectId, token, linkedinBase64, twitterBase64, atfBase64 } = await request.json();

    if (!projectId || !token) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!linkedinBase64 || !twitterBase64) {
      return NextResponse.json({ error: "LinkedIn and Twitter screenshots are required." }, { status: 400 });
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

    let linkedinUrl = null;
    let twitterUrl = null;
    let atfUrl = null;

    try {
      const uploadPromises = [];
      
      const uploadImage = async (base64Str: string) => {
        if (!base64Str.startsWith("data:image/")) {
          throw new Error("Invalid file type. Only images are allowed.");
        }
        const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        return uploadToCloudinary(buffer, "image/jpeg", "peoples-choice-proofs");
      };

      if (linkedinBase64) {
        uploadPromises.push(uploadImage(linkedinBase64).then(url => { linkedinUrl = url; }));
      }
      if (twitterBase64) {
        uploadPromises.push(uploadImage(twitterBase64).then(url => { twitterUrl = url; }));
      }
      if (atfBase64) {
        uploadPromises.push(uploadImage(atfBase64).then(url => { atfUrl = url; }));
      }

      await Promise.all(uploadPromises);
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload screenshots. Please try again." }, { status: 500 });
    }

    // Save vote to DB using a transaction to ensure token is consumed
    await prisma.$transaction([
      prisma.peoplesChoiceVote.create({
        data: {
          projectId: parsedProjectId,
          email: magicLink.email,
          linkedinScreenshot: linkedinUrl,
          twitterScreenshot: twitterUrl,
          atfScreenshot: atfUrl,
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
