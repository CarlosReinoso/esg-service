const { subject, html } = require("../emails/subscriptionWillExpireEmail");
const { emailTemplate } = require("../lib/queries/insert");
const { emailTemplatesTableQuery } = require("../lib/queries/queries");
const createConnection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");
const selectTable = require("./selectTable");

async function createEmailTemplatesTable() {
  const connection = createConnection();
  try {
    await connection.query(emailTemplatesTableQuery);

    await connection.query(emailTemplate, [
      "subscriptionEnding",
      subject,
      html,
    ]);

    await selectTable(ENV.database.emailTemplates)
    return;
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createEmailTemplatesTable();

module.exports = createEmailTemplatesTable;
