import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_123");

export async function sendMagicLink(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    
  const magicLink = `${baseUrl}/peoples-choice?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: 'Build With AI OAU <awards@bwaioau.site>',
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
