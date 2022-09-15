if (process.env.NODE_ENV !== "production") require("dotenv").config();
module.exports = {
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET,
};
