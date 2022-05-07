const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //   type: {
  //     type: String,
  //     required: true,
  //   },

  phoneno: {
    type: String,
    minlength: [10, "Enter a valid Phone Number"],
    maxlength: [10, "Enter a valid Phone Number"],
    required: true,
    unique: [true, "Phone Number already registered please Login "],
  },
  //   name: {
  //     type: String,

  //     required: true,
  //   },
  //   email: {
  //     type: String,
  //     unique: [true, "Email already registered please Login "],
  //     required: true,
  //   },

  //   age: {
  //     type: Number,
  //     required: true,
  //   },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
