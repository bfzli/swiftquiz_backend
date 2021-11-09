const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const psp = require("passport");

const { SECRET } = require("../config");

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

/*
    Login user function (quizer, superadmin, admin)
*/

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  //First check the username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found",
      success: false,
    });
  }
  //Check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please login from the right portal",
      success: false,
    });
  }
  //If user is valid, check password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    //Signin the token
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: "2 days" }
    );

    let result = {
      name: user.name,
      user_id: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
      token: token,
      expiresIn: 48,
    };
    return res.status(200).json({
      ...result,
      message: "Yes, you are logged in",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
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

/*
  PASSPORT Middleware
*/
const userAuth = psp.authenticate("jwt", { session: false });

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    name: user.name,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

/**
 *  Check role middleware
 *
 *
 */

const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};

module.exports = {
  checkRole,
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
};
