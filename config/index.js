require("dotenv").config();
module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET,
  DOMAIN: process.env.APP_DOMAIN,
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  FACEBOOK_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  LINKEDIN_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
  GITHUB_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET: process.env.GITHUB_CLIENT_SECRET
};
