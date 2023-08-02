require('dotenv').config();

module.exports = {
  url: `mongodb://${process.env.DB_USE_USR_PASS==='1' ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`: ``}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
};