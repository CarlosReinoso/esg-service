const axios = require("axios");
require("dotenv").config();

const thinkificAPI = axios.create({
  baseURL: process.env.THINKIFIC_BASE_URL,
  headers: {
    "X-Auth-API-Key": process.env.THINKIFIC_API_KEY,
    "X-Auth-Subdomain": process.env.THINKIFIC_SUBDOMAIN,
    "Content-Type": "application/json",
  },
});

module.exports = { thinkificAPI };
