require("dotenv").config();
const environment = process.env.NODE_ENV;

const config = {
  dev: {
    database: {
      usersCoupons: "dev_users_coupons",
      cronExecutionStatus: "cron_execution_status",
    },
  },
  prod: {
    database: {
      usersCoupons: "users_coupons",
      cronExecutionStatus: "cron_execution_status",
    },
  },
};

const currentConfig = environment === "dev" ? config.dev : config.prod;

module.exports = currentConfig;
