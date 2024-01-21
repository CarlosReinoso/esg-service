const createTransport = require("../lib/nodemailer");
const { EMAIL } = require("../constants/email");
const createConnection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");

const subject = "Tu beca de la ESG está próxima a vencer";
const html = `
      <p>Estimado(a) ??:</p>
      <p>Los 6 meses de vigencia de tu Beca en la Enseñanza Saint Germain están próximos a vencer. Si deseas continuar con este beneficio, favor de contactar al WhatsApp de Soporte de la ESG (+52 1 55 6471 9461).</p>
      <p>Si no recibimos tu solicitud de renovación, el sistema realizará el cargo automático de la aportación completa ($1,250.00).</p>
      <p>¡Bendiciones Siempre!</p>
      `;

const subscriptionWillExpireEmail = async (to, fullName) => {
  const transport = await createTransport();

  const connection = createConnection();
  const sql = `
  SELECT * from ${ENV.database.emailTemplates} 
  WHERE template_id = 1
  `;
  const [row] = await connection.query(sql);

  const emailBody = row[0].body;
  const emailSubject = row[0].subject;

  const bodyToSend = emailBody.replace(/\*name\*/g, fullName);

  transport.sendMail({ EMAIL, subject: emailSubject, to, html: bodyToSend }, (err, _) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", to);
    }
  });
};
module.exports = { subscriptionWillExpireEmail, subject, html };
