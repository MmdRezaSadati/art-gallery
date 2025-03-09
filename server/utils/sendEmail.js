// This module sends emails using Nodemailer with Ethereal Email for testing purposes.
// Ethereal is a free SMTP service for testing and does not require phone number registration.

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // Create a test SMTP account using Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter object using the test SMTP account
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"Art Waves" <${testAccount.user}>`, // sender address
      to: options.email, // receiver's email
      subject: options.subject || "Test Email", // subject line
      text: options.text || "This is a test email.", // plain text body
      html: options.html || "<p>This is a test email.</p>", // HTML body
    };

    // Send the email using the transporter
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
