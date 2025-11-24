// backend/utils/sendEmail.js ← FINAL WORKING VERSION
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async ({ to, subject, text, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'CivicVoice <onboarding@resend.dev>',  // ← THIS IS VERIFIED BY RESEND
      to,
      subject,
      text: text || '',
      html: html || `<p>${text}</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    console.log('OTP sent successfully →', data.id);
    return data;
  } catch (err) {
    console.error('Email failed:', err);
    throw err;
  }
};