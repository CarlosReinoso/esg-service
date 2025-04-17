const express = require("express");
const supabase = require("../../lib/supabase");
const router = express.Router();

router.get("/", async (req, res) => {
  const { error } = await supabase
    .from("supabase_alive")
    .insert([{ created_at: new Date().toISOString().split("T")[0] }]);

  if (error) {
    console.error("Error logging keep-alive action:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to log keep-alive." });
  }

  console.log("Successfully logged keep-alive action.");
  return res.status(200).json({ success: true, message: "Keep-alive logged." });
});

module.exports = router;
