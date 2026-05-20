import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { hasDeviceVoted, submitPeoplesChoiceVote } from "@/lib/peoples-choice-data";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const projectIdStr = formData.get("projectId")?.toString();
    const projectId = parseInt(projectIdStr || "", 10);
    const clientDeviceId = formData.get("deviceId")?.toString()?.trim();
    
    if (isNaN(projectId) || !clientDeviceId) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Enhance device tracking by checking HTTP-only cookie as well
    const cookieStore = await cookies();
    const cookieDeviceId = cookieStore.get("bwai_peoples_choice_device_id")?.value;
    
    // Use cookie device ID if it exists, otherwise use client provided one
    const effectiveDeviceId = cookieDeviceId || clientDeviceId;

    // The database is our source of truth
    const alreadyVoted = await hasDeviceVoted(effectiveDeviceId);
    if (alreadyVoted) {
      return NextResponse.json({ error: "This device has already voted." }, { status: 403 });
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

    // Save vote to DB
    await submitPeoplesChoiceVote({
      projectId,
      deviceId: effectiveDeviceId,
      linkedInProof: linkedInUrl,
      twitterProof: twitterUrl,
      atfProof: atfUrl,
    });

    const response = NextResponse.json({ success: true }, { status: 201 });
    
    // Set an HttpOnly cookie to enforce single voting even if local storage is cleared
    response.cookies.set({
      name: 'bwai_peoples_choice_device_id',
      value: effectiveDeviceId,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  } catch (error) {
    console.error("People's Choice Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
