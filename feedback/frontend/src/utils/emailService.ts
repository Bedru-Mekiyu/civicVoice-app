// Email service for sending OTP and other notifications
// This is a placeholder for actual email integration

export interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    // In production, this would integrate with an email service like SendGrid, AWS SES, etc.
    // For now, we'll just log it
    console.log('📧 Email would be sent:', options)

    // You can implement actual email sending here using:
    // - SendGrid API
    // - AWS SES
    // - Nodemailer
    // - Any other email service

    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
  // In development, show OTP in console for easy testing
  console.log('📧 OTP Email Details:', {
    to: email,
    code: otp,
    expiresIn: '10 minutes'
  })

  // Show OTP in toast notification during development
  if (typeof window !== 'undefined') {
    // Dynamic import to avoid build issues
    import('@/hooks/use-toast').then(({ toast }) => {
      toast({
        title: '✉️ Verification Code Sent',
        description: `Your OTP: ${otp} (Check console for details)`,
        duration: 10000,
      })
    }).catch(() => {
      // Fallback if toast import fails
      console.log('💡 Your verification code:', otp)
    })
  }

  return sendEmail({
    to: email,
    subject: 'Your CivicVoice Et Verification Code',
    text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">CivicVoice Et - Email Verification</h2>
        <p>Your verification code is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e40af;">
          ${otp}
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
          This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
        </p>
      </div>
    `
  })
}

export interface SMSOptions {
  to: string
  text: string
}

export const sendSMS = async (options: SMSOptions): Promise<boolean> => {
  try {
    console.log('📱 SMS would be sent:', options)
    return true
  } catch (error) {
    console.error('Failed to send SMS:', error)
    return false
  }
}

export const sendOTPSMS = async (phone: string, otp: string): Promise<boolean> => {
  return sendSMS({
    to: phone,
    text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`
  })
}

export type OTPChannel = 'email' | 'sms' | 'both'

export interface SendOTPParams {
  email?: string
  phone?: string
  otp: string
  channel: OTPChannel
}

export const sendOTP = async ({ email, phone, otp, channel }: SendOTPParams): Promise<boolean> => {
  const tasks: Promise<boolean>[] = []

  if ((channel === 'email' || channel === 'both') && email) {
    tasks.push(sendOTPEmail(email, otp))
  }

  if ((channel === 'sms' || channel === 'both') && phone) {
    tasks.push(sendOTPSMS(phone, otp))
  }

  if (tasks.length === 0) {
    return false
  }

  const results = await Promise.allSettled(tasks)
  return results.some((result) => result.status === 'fulfilled' && result.value)
}
