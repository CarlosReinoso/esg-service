const { subject, html } = require("../emails/subscriptionWillExpireEmail");
const { emailTemplate } = require("../lib/queries/insert");
const { emailTemplatesTableQuery } = require("../lib/queries/queries");
const createConnection = require("../scripts/connectToDatabase");

async function createEmailTemplatesTable() {
  const connection = createConnection();
  try {
    await connection.query(emailTemplatesTableQuery);

    await connection.query(emailTemplate, [
      "subscriptionEnding",
      subject,
      html,
    ]);
    return;
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createEmailTemplatesTable();

module.exports = createEmailTemplatesTable;
