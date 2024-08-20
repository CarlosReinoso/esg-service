const cron = require("node-cron");
const supabase = require("../lib/supabase");

async function keepSupabaseAlive() {
  cron.schedule("0 0 9 * * *", async () => {
    console.log("🚀 ~ keepSupabaseAlive daily cron, running...");

    const { error } = await supabase
      .from("supabase_alive")
      .insert([{ created_at: new Date().toISOString().split("T")[0] }]);

    if (error) {
      console.error("Error logging keep-alive action:", error);
    } else {
      console.log("Successfully logged keep-alive action.");
    }
  });
}

module.exports = keepSupabaseAlive;
