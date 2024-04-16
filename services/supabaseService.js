// services/supabaseService.js

const supabase = require("../lib/supabase");

async function fetchData(tableName) {
  const { data, error } = await supabase.from(tableName).select("*");
  console.log("🚀 ~ fetchData ~ data:", data)

  if (error) {
    console.error("Error:", error);
    return null;
  }

  return data;
}

fetchData("test");
fetchData("dev_email_templates");

module.exports = {
  fetchData,
};
