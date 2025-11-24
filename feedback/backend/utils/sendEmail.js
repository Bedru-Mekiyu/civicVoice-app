// backend/utils/sendEmail.js - FIXED & PRODUCTION READY
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async ({ to, subject, text, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'CivicVoice <no-reply@civicvoice.et>',
      to,
      subject,
      text: text || '',
      html: html || `<p>${text}</p>`,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error('Failed to send email');
    }

    console.log('OTP Email sent successfully to:', to, 'ID:', data?.id);
    return data;
  } catch (err) {
    console.error('Email sending failed:', err.message);
    throw new Error('Email service unavailable');
  }
};