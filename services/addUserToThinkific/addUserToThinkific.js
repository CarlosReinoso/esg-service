require("dotenv").config();
const axios = require("../../lib/axiosConfig").thinkificInstance;

async function getUser() {
  try {
    const test = await axios.post("/users", {
      first_name: "Bob",
      last_name: "Smith",
      email: "testy1@gmail.com",
      password: "password",
      País: "pais",
      company: "The user's company",
      headline: "The user's job title",
      "# Celular": "099989",
      custom_profile_fields: [
        {
          id: null,
          value: null,
          label: 'País',
          custom_profile_field_definition_id: 43500
        },
        {
          id: null,
          value: null,
          label: 'Estado o Provincia',
          custom_profile_field_definition_id: 54265
        },
        {
          id: null,
          value: null,
          label: '# Celular',
          custom_profile_field_definition_id: 39955
        },
        {
          id: null,
          value: null,
          label: '¿Cómo te enteraste de la ESG?',
          custom_profile_field_definition_id: 75291
        }
      ],    
      "skip_custom_fields_validation": false,
      send_welcome_email: true,
    });
    console.log("🚀 ~ getUser ~ test:", test);
    console.log("🚀 ~ getUser ~ test:", test.data);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error.response.data.errors);
  }
}
getUser();
