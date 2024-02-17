const createTransport = require("../lib/nodemailer");
const { EMAIL } = require("../constants/email");
const createConnection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");

const oxxoCompletedWelcomeEmail = async (to, fullName) => {
  const transport = await createTransport();

  const connection = createConnection();
  const sql = `
  SELECT * from ${ENV.database.emailTemplates} 
  WHERE template_name = 'oxxoComplete'
  `;
  const [row] = await connection.query(sql);

  const emailBody = row[0].body;
  const emailSubject = row[0].subject;

  const bodyToSend = emailBody.replace(/\*name\*/g, fullName);

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
module.exports = oxxoCompletedWelcomeEmail;
