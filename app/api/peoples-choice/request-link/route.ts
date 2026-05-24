import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMagicLink } from "@/lib/mail";
import { getCanonicalEmail } from "@/lib/email-utils";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // Convert to canonical form to prevent variations like john+1@gmail.com, j.o.h.n@gmail.com, etc.
    const canonicalEmail = getCanonicalEmail(email);

    if (!canonicalEmail) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const normalizedEmail = canonicalEmail;

    // Check if the email has already voted
    const existingVote = await prisma.peoplesChoiceVote.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingVote) {
      return NextResponse.json({ error: "This email has already been used to cast a vote." }, { status: 403 });
    }

    // Generate a secure random token
    const token = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // Set expiration to 5 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Upsert token in the DB so they only have 1 active token at a time
    await prisma.magicLinkToken.upsert({
      where: { email: normalizedEmail },
      update: { token, expiresAt },
      create: { email: normalizedEmail, token, expiresAt },
    });

    // Send the email
    const emailResult = await sendMagicLink(normalizedEmail, token);

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send magic link email. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Magic link sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Magic Link Request Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
