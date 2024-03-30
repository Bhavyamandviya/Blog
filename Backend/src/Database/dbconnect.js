const mongoose = require("mongoose");

require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected successfully"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
