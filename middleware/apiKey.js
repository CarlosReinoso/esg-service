require("dotenv").config();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header("X-API-Key");

  if (!apiKey || apiKey !== process.env.SERVER_API_KEY) {
    return res.status(401).json({ message: "Invalid API Key" });
  }

  next();
};

module.exports = apiKeyMiddleware;
