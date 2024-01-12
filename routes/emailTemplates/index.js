const express = require("express");
const router = express.Router();
const { ENV } = require("../../util/config");
const selectTable = require("../../database/selectTable");
const createConnection = require("../../scripts/connectToDatabase");
const { resJSON } = require("../../util/db/addMessage");

router.get("/:templateId", async (req, res) => {
  const connection = createConnection();

  const templateId = req.params.templateId;
  console.log("🚀 ~ router.get ~ templateId:", templateId)

  try {
    // Fetch the template from the database
    const sql = `
    SELECT * FROM ${ENV.database.emailTemplates}
    WHERE template_id = ?
    `;
    const [row] = await connection.query(sql, [templateId]);

    const email = row[0];
    resJSON(res, { ...email });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
