const createTransport = require("../lib/nodemailer");
const { EMAIL } = require("../constants/email");

const subscriptionWillExpireEmail = async (name, to) => {
  const transport = await createTransport();

  const subject = "Tu beca de la ESG está próxima a vencer";
  const html = `
        <p>Estimado ${name?.trim()},</p>
        <p>Este correo es para comentarte que tu beca de la Enseñanza Saint Germain está por vencer, si dedeas continuar con este beneficio favor de contactar a soporte de la ESG por WhatsApp  para solicitar una renovación.</p>
        <p>¡Bendiciones Siempre!</p>
        <p>ESG</p>
        `;

  transport.sendMail({ EMAIL, subject, to, html }, (err, _) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", to);
    }
  });
};
module.exports = subscriptionWillExpireEmail;
