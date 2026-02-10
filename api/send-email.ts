import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const data = await resend.emails.send({
      from: "Vedseem Contact Form <onboarding@resend.dev>", // Update this if user has a custom domain
      to: ["vedseem.contact@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Message from Vedseem Website</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return response.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return response.status(500).json({ error: "Failed to send email" });
  }
}
