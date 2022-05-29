const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneno: {
    type: String,
    minlength: [10, "Enter a valid Phone Number"],
    maxlength: [10, "Enter a valid Phone Number"],
    required: true,
    unique: [true, "Phone Number already registered please Login "],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    // unique: [true, "Email already registered please Login "],
  },

  dob: {
    type: Date,
  },
  subscriptionType: {
    type: String,

    required: true,
    default: "free",
  },
  multilogin: {
    type: Array,
    required: true,
    maxlength: 3,
  },
});

userSchema.set("timestamps", true);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
