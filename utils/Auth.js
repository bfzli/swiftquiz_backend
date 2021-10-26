const User = require("../models/User");
const bcrypt = require("bcryptjs");
<<<<<<< Updated upstream
=======
const jwt = require("jsonwebtoken");
const psp = require("passport");

const { SECRET } = require("../config");

>>>>>>> Stashed changes
/*
    Register user function (quizer, superadmin, admin)
*/

const userRegister = async (userDets, role, res) => {
  try {
    //Validate the user

    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is used`,
        success: false,
      });
    }

    //Validate the email
    let emailNotUsed = await validateEmail(userDets.email);
    if (!emailNotUsed) {
      return res.status(400).json({
        message: `Email has been used before`,
        success: false,
      });
    }
    //HashPass
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "Yayy! You are successfully registered",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "I dont know man, I can't register you right now",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = {
  userRegister,
};
