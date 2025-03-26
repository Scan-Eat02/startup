const env = process.env.NODE_ENV || "env";

const backendConfig = require(`./${env === "dev" ? "backend-config" : "prod-backend-config"}`);

const config = {
  ...backendConfig,
};

module.exports = config;
