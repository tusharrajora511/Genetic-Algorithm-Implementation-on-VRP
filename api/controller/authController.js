const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    });
    // Removing the password from the output
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async function (req, res, next) {
  try {
    // Accessing email and password field.
    const email = req.body.email;
    const password = req.body.password;

    // 1)check if email and passsword exist.
    if (!email || !password) {
      throw "Please enter the email and password correctly.";
    }
    // 2) Check if the user exist and the password is correct.
    // Here we are also selecting the password field as previously we have removed that field.
    const user = await User.findOne({ email: email }).select("+password");
    // For verifying the current paswword with the password stored in the database, we need to againg encrypt the current entered password and then compare it with the password stored in the database. WE do this as we can't decrypt the encrypted password.
    // For this we have used instance method, that we have defined in userModel.
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw "Incorrect email or password";
    }
    // 3)If everything is ok, send the token.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // Sending token to the browser in the for of the cookie.
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
exports.logOut = function (req, res, next) {
  // Creating a fake token
  const token = "loggedout";
  // Sending this fake token to the browser in the form of the token
  res.cookie("jwt", token, {
    // Expiring it in 5 seconds
    expires: new Date(Date.now() + 10 * 1000),
    secure: true,
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
