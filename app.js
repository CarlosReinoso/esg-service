require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mainRoutes = require("./routes");
const publicRoutes = require("./routes/public/index");
const apiKeyMiddleware = require("./middleware/apiKey");
const apiLimiter = require("./middleware/rateLimit");
const bodyParser = require("body-parser");

// app.use("/stripe/oxxo-webhook", express.raw({ type: "application/json" }));

// app.use(
//   express.json({
//     verify: function (req, res, buf, encoding) {
//       if (req.originalUrl.startsWith("/stripe/oxxo-webhook")) {
//         req.rawBody = buf;
//       }
//     },
//   })
// );

app.use((req, res, next) => {
  if (req.originalUrl === "/stripe/oxxo-webhook") {
    console.log("🚀 ~ app.use ~ req.originalUrl:", req.originalUrl)
    next();
  } else {
    express.json()(req, res, next);
  }
});

// app.use(bodyParser.json());

app.use("/", publicRoutes);

app.use(apiKeyMiddleware, apiLimiter);

app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
