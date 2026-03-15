const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send welcome email with referral code
 * @param {string} email - Recipient email
 * @param {string} fullName - User's full name
 * @param {string} referralCode - User's unique referral code
 * @returns {Promise<Object>} Email send result
 */
const sendWelcomeEmail = async (email, fullName, referralCode) => {
  try {
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Kushina'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Kushina! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Kushina</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to Kushina!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px;">Hello ${fullName},</p>
            
            <p style="font-size: 16px;">We're thrilled to have you join the Kushina community! 🎊</p>
            
            <p style="font-size: 16px;">Your account has been successfully created. You can now start exploring all the amazing features we have to offer.</p>
            
            <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Your Unique Referral Code & ID:</p>
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${referralCode}</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This code serves as your unique identifier</p>
            </div>
            
            <p style="font-size: 16px;">Share your referral code with friends and family to earn rewards! Every time someone signs up using your code, you both benefit.</p>
            
            <p style="font-size: 14px; color: #666;"><strong>Note:</strong> Your referral code (${referralCode}) also serves as your unique ID in our system. Keep it safe!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="font-size: 14px; color: #666; margin: 0;">If you have any questions, feel free to reach out to our support team.</p>
              <p style="font-size: 14px; color: #666; margin: 10px 0 0 0;">Best regards,<br><strong>The Kushina Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Kushina!
        
        Hello ${fullName},
        
        We're thrilled to have you join the Kushina community!
        
        Your account has been successfully created. You can now start exploring all the amazing features we have to offer.
        
        Your Unique Referral Code & ID: ${referralCode}
        (This code serves as your unique identifier)
        
        Share your referral code with friends and family to earn rewards! Every time someone signs up using your code, you both benefit.
        
        Note: Your referral code (${referralCode}) also serves as your unique ID in our system. Keep it safe!
        
        If you have any questions, feel free to reach out to our support team.
        
        Best regards,
        The Kushina Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};

/**
 * Send a generic email
 * @param {Object} options - Email options (to, subject, html, text)
 * @returns {Promise<Object>} Email send result
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Kushina'}" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendEmail,
  transporter,
};
