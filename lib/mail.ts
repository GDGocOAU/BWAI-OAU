import { Resend } from 'resend';

// We fallback to a mock key so the app doesn't crash if the env var is missing during local dev
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_123");

export async function sendMagicLink(email: string, token: string) {
  // Use Vercel URL or fallback to localhost port 3001 (based on your package.json dev script)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    
  const magicLink = `${baseUrl}/peoples-choice?token=${token}`;

  // If there's no real Resend API Key configured yet, just log the magic link to the console.
  if (!process.env.RESEND_API_KEY) {
    console.log("==================================================");
    console.log(`[MOCK EMAIL] To: ${email}`);
    console.log(`[MOCK EMAIL] Subject: Your Magic Link to Vote!`);
    console.log(`[MOCK EMAIL] Magic Link: ${magicLink}`);
    console.log("==================================================");
    return { success: true, id: "mock_id" };
  }

  try {
    const data = await resend.emails.send({
      from: 'Build With AI OAU <hello@resend.dev>', // You should change this to your verified domain once added to Resend
      to: [email],
      subject: 'Your Magic Link to Vote! - Build With AI OAU',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Your Voting Magic Link</h2>
          <p>Click the link below to authenticate and cast your vote for the People's Choice Award.</p>
          <p>This link is valid for 1 hour and can only be used once to submit a vote.</p>
          <a href="${magicLink}" style="display: inline-block; padding: 12px 24px; background-color: #1e1e1e; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
            Click here to Vote
          </a>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">If you didn't request this link, you can safely ignore this email.</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error };
  }
}
