const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // first_name last_name profile_pic ( can be 1 only )

  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profile_pic: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;