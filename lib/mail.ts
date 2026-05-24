import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Resend configuration
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_123");

// Google SMTP configuration using nodemailer
const createGoogleTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD, // Use app-specific password for Google accounts with 2FA
    },
  });
};

// Email provider type
type EmailProvider = 'resend' | 'google';

// Function to get the current email provider from environment
const getEmailProvider = (): EmailProvider => {
  const provider = process.env.EMAIL_PROVIDER || 'resend';
  return provider as EmailProvider;
};

const htmlContent = (magicLink: string) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>Your Voting Magic Link</h2>
    <p>Click the link below to authenticate and cast your vote for the People's Choice Award.</p>
    <p>This link is valid for 5 minutes and can only be used once to submit a vote.</p>
    <a href="${magicLink}" style="display: inline-block; padding: 12px 24px; background-color: #1e1e1e; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
      Click here to Vote
    </a>
    <p style="margin-top: 30px; font-size: 12px; color: #666;">If you didn't request this link, you can safely ignore this email.</p>
  </div>
`;

// Send email via Resend
async function sendViaResend(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const magicLink = `${baseUrl}/peoples-choice?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: 'Build With AI OAU <awards@bwaioau.site>',
      to: [email],
      subject: 'Your Magic Link to Vote! - Build With AI OAU',
      html: htmlContent(magicLink),
    });
    return { success: true, data };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error };
  }
}

// Send email via Google SMTP + Nodemailer
async function sendViaGoogle(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const magicLink = `${baseUrl}/peoples-choice?token=${token}`;

  if (!process.env.GOOGLE_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
    const error = new Error('Google SMTP credentials not configured. Set GOOGLE_EMAIL and GOOGLE_APP_PASSWORD environment variables.');
    console.error("Google SMTP Configuration Error:", error);
    return { success: false, error };
  }

  try {
    const transporter = createGoogleTransporter();

    const mailOptions = {
      from: `Build With AI OAU <${process.env.GOOGLE_EMAIL}>`,
      to: email,
      subject: 'Your Magic Link to Vote! - Build With AI OAU',
      html: htmlContent(magicLink),
    };

    const data = await transporter.sendMail(mailOptions);
    return { success: true, data };
  } catch (error) {
    console.error("Google SMTP Email Error:", error);
    return { success: false, error };
  }
}

// Main function to send magic link email
export async function sendMagicLink(email: string, token: string) {
  const provider = getEmailProvider();

  if (provider === 'google') {
    return sendViaGoogle(email, token);
  }

  // Default to Resend
  return sendViaResend(email, token);
}
