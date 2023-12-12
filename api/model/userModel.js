const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please mention your name."],
  },
  email: {
    type: String,
    required: [true, "Please mention your email-id."],
    // We want all the email-ids to be unique
    unique: true,
    // It will convert the email address to lowercase if in case someone has enetered capital letters.
    lowercase: true,
    // Validating the email id. We will be using validator package present in node for this.
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please mention your desired password."],
    minLength: 8,
    // We don't want to display this field if the client accesses all user data.
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please re-enter your typed password."],
    // validating password and passwordConfirm, it checks whether the two fields are same or not.
    validate: {
      // This only works with create and save methods in mongoose.
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
