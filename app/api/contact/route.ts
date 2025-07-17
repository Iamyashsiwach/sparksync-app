import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Hostinger SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com', // Hostinger SMTP server
  port: Number(process.env.SMTP_PORT) || 465, // Default to 465 for SSL
  secure: true, // Use SSL
  auth: {
    user: process.env.SMTP_USER || 'yash.siwach@sparksync.in', // Company email
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
});

// Verify SMTP connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

export async function POST(request: Request) {
  console.log("API route hit");
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: `"sparksync Contact Form" <${process.env.SMTP_USER || 'info@sparksync.in'}>`,
      to: 'rohit@sparksync.in', // Send to Rohit
      cc: email, // CC to the sender
      replyTo: email, // Set reply-to as the sender's email
      subject: `Message from ${email}: ${subject}`,
      html: `
        <h2>Message from ${email}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
} 