const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  // phoneno: {
  //   type: String,
  //   minlength: [10, "Enter a valid Phone Number"],
  //   maxlength: [10, "Enter a valid Phone Number"],

  //   unique: [true, "Phone Number already registered please Login "],
  // },
  username: {
    type: String,
    unique: true,
  },
  // email: {
  //   type: String,
  //   unique: [true, "Email already registered please Login "],
  //   required: true,
  // },
  password: {
    type: String,
  },

  //   age: {
  //     type: Number,
  //     required: true,
  //   },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
