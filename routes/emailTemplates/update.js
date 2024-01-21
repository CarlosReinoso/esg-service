const express = require("express");
const router = express.Router();
const { ENV } = require("../../util/config");
const selectTable = require("../../database/selectTable");
const createConnection = require("../../scripts/connectToDatabase");
const { addMessage } = require("../../util/db/addMessage");

router.put("/:templateId", async (req, res) => {
  console.log("🚀 ~ router.put ~ req BODY:", req.body);
  const connection = createConnection();

  const templateId = req.params.templateId;
  console.log("🚀 ~ router.put ~ templateId:", templateId);

  const subject = req.body?.subject;
  const body = req.body?.body;
  console.log("🚀 ~ router.put ~ body:", body);
  console.log("🚀 ~ router.put ~ subject:", subject);

  // Update the table
  const sql = `UPDATE ${ENV.database.emailTemplates} SET subject = ?, body = ? WHERE template_id = ?`;
  if (!!subject && !!body) {
    try {
      await connection.query(sql, [subject, body, templateId]);
      addMessage(res, `template_id: ${templateId} updated`);
    } catch (error) {
      console.error("Error executing cron job:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    addMessage(res, `missing subject and/or body in email`);
  }
});

module.exports = router;
