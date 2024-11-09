const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = mongoose.connect(process.env.DB_URL).then((val, err) => {
  if (err) throw err;
  console.log("Connected to db");
});

module.exports = {
  dbConnect,
};
