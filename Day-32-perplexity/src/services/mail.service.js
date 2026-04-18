import nodemailer from "nodemailer";

const clientSecret =
  process.env.GOOGLE_SECRET || process.env.GOOGLE_SECRET_ID;

const mailConfigPresent =
  process.env.GOOGLE_USER &&
  process.env.GOOGLE_CLIENT_ID &&
  clientSecret &&
  process.env.GOOGLE_REFRESH_TOKEN;

const transporter = mailConfigPresent
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
      // socketTimeout: 30000,
      // connectionTimeout: 30000,
    })
  : null;

if (transporter) {
  transporter
    .verify()
    .then(() => {
      console.log("✅ Email transporter is ready to send emails");
    })
    .catch((err) => {
      console.error(
        "❌ Email transporter verification failed:",
        err.message
      );
      console.error(
        "Fix: Ensure your Google OAuth2 credentials are correct. Check:"
      );
      console.error("1. GOOGLE_USER (email address)");
      console.error("2. GOOGLE_CLIENT_ID");
      console.error("3. GOOGLE_SECRET");
      console.error("4. GOOGLE_REFRESH_TOKEN (must not be expired)");
      console.error(
        "Generate new refresh token: https://myaccount.google.com/permissions"
      );
    });
} else {
  console.warn(
    "⚠️ Email transporter is disabled: missing Google mail environment variables."
  );
}

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    throw new Error("Email service is not configured correctly.");
  }

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    text,
    html,
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully", details.response);
  return details;
};
