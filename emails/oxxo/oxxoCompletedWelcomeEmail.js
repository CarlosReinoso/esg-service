require("dotenv").config();
const { EMAIL, TEST_EMAIL } = require("../../constants/email");
const supabase = require("../../lib/supabase");
const { ENV, isProd } = require("../../util/config");
const createTransport = require("../../lib/nodemailer");

const oxxoCompletedWelcomeEmail = async (to, fullName) => {
  try {
    const transport = await createTransport();

    const { data, error } = await supabase
      .from(ENV.database.emailTemplates)
      .select("*")
      .eq("template_name", "oxxoComplete")
      .single(); // Ensures that only one record is returned

    const emailBody = data.body;
    const emailSubject = data.subject;

    const bodyToSend = emailBody.replace(/\*name\*/g, fullName);

    transport.sendMail(
      {
        EMAIL,
        subject: emailSubject,
        to,
        html: bodyToSend,
        bcc: isProd ? "admin@esgweb.org" : TEST_EMAIL,
      },
      (err, _) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent:", to);
        }
      }
    );

    if (error) {
      throw error;
    }

    console.log("Retrieved row:", data);
    return data;
  } catch (error) {
    console.error("Error fetching email template:", error);
    return null;
  }
};

// oxxoCompletedWelcomeEmail("carlosrwebs@gmail.com", "carlos");
module.exports = oxxoCompletedWelcomeEmail;
