require("dotenv").config();
const nodemailer = require("nodemailer");
const oAuth2Client = require("./oauth2");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  EMAIL,
} = require("../constants/email");

const createTransport = async () => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN.token,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
};

module.exports = createTransport;
