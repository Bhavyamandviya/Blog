const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = model("User", UserSchema);
