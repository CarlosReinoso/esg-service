require("dotenv").config();
const { EMAIL, TEST_EMAIL } = require("../../constants/email");
const supabase = require("../../lib/supabase");
const { ENV, isProd } = require("../../util/config");
const createTransport = require("../../lib/nodemailer");

const oxxoSuccesfulCheckoutEmail = async (
  email,
  name,
  amount,
  expires_after,
  hosted_voucher_url,
  number
) => {
  try {
    const transport = await createTransport();

    const { data, error } = await supabase
      .from(ENV.database.emailTemplates)
      .select("*")
      .eq("template_name", "oxxoSuccesfulCheckoutEmail")
      .single(); // Ensures that only one record is returned

    let emailBody = data.body;
    const emailSubject = data.subject;

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(amount / 100); // Assuming amount is in cents

    const replacements = {
      "\\*name\\*": name,
      "\\*number\\*": number,
      "\\*amount\\*": formattedAmount,
      "\\*hosted_voucher_url\\*": hosted_voucher_url,
      "\\*expires_after\\*": new Date(
        expires_after * 1000
      ).toLocaleDateString(), // Assuming expires_after is in seconds
    };

    // Replace placeholders in email body
    for (const [placeholder, value] of Object.entries(replacements)) {
      emailBody = emailBody.replace(new RegExp(placeholder, "g"), value);
    }

    transport.sendMail(
      {
        EMAIL,
        subject: emailSubject,
        to: email,
        html: emailBody,
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

// oxxoSuccesfulCheckoutEmail("carlosrwebs@gmail.com", "carlos");
module.exports = oxxoSuccesfulCheckoutEmail;
