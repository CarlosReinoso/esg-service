const createTransport = require("../lib/nodemailer");
const { EMAIL } = require("../constants/email");
const { ENV } = require("../util/config");
const createConnection = require("../scripts/connectToDatabase");

const oxxoCompletedWelcomeEmail = async (to, fullName) => {
  const transport = await createTransport();

  const connection = createConnection();
  const sql = `
  SELECT * from ${ENV.database.emailTemplates} 
  WHERE template_name = 'oxxoComplete'
  `;
  const [row] = await connection.query(sql);
  console.log("🚀 ~ oxxoCompletedWelcomeEmail ~ row:", row);

  const emailBody = row[0].body;
  const emailSubject = row[0].subject;

  const bodyToSend = emailBody.replace(/\*name\*/g, fullName);

  const mailOptions = {
    from: '"Sender Name" <your-email@yourprovider.com>', // Sender address
    to: "recipient1@example.com, recipient2@example.com", // Primary recipients
    bcc: "bcc-recipient1@example.com, bcc-recipient2@example.com", // BCC recipients
    subject: "Nodemailer BCC Test", // Subject line
    text: "This is a test email sent with BCC using Nodemailer.", // Plain text body
    html: "<b>This is a test email sent with BCC using Nodemailer.</b>", // HTML body
  };

  transport.sendMail(
    { EMAIL, subject: emailSubject, to, html: bodyToSend },
    (err, _) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", to);
      }
    }
  );
};

// oxxoCompletedWelcomeEmail("carlosrwebs@gmail.com", "carlos");
module.exports = oxxoCompletedWelcomeEmail;
