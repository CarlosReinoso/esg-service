require("dotenv").config();
const environment = process.env.NODE_ENV;

const config = {
  dev: {
    database: {
      usersCoupons: "dev_users_coupons",
    },
  },
  prod: {
    database: {
      usersCoupons: "users_coupons",
    },
  },
};

const currentConfig = environment === "dev" ? config.dev : config.prod;

module.exports = currentConfig;
