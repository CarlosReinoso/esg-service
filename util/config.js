require("dotenv").config();
const environment = process.env.NODE_ENV;

const config = {
  dev: {
    database: {
      usersCoupons: "dev_users_coupons",
      cronExecutionStatus: "dev_cron_execution_status",
      emailTemplates: "dev_email_templates",
      customers: "dev_customers",
      oxxoRepaymentEmailLog: "dev_oxxo_repayment_email_log"
    },
  },
  prod: {
    database: {
      usersCoupons: "users_coupons",
      cronExecutionStatus: "cron_execution_status",
      emailTemplates: "email_templates",
      customers: "customers",
      oxxoRepaymentEmailLog: "oxxo_repayment_email_log"
    },
  },
};

const ENV = environment === "dev" ? config.dev : config.prod;

const isDev = environment === "dev" ? true : false;
const isProd = environment === "prod" ? true : false;

module.exports = { ENV, isDev, isProd };
