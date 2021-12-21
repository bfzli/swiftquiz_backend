const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const psp = require("passport");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("./jwtToken");
const sendMail = require("./sendMail");
const ErrorHander = require("./errorhander");

const {SECRET} = require("../config");

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
   let {username, password} = userCreds;
   //First check the username
   const user = await User.findOne({username});
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
         {expiresIn: "2 days"}
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
   let user = await User.findOne({username});
   return user ? false : true;
};

const validateEmail = async (email) => {
   let user = await User.findOne({email});
   return user ? false : true;
};

/*
  PASSPORT Middleware
*/
const userAuth = psp.authenticate("jwt", {session: false});

const serializeUser = (user) => {
   return {
      username: user.username,
      email: user.email,
      _id: user._id,
      name: user.name,
      //  profile: user.profile,
      quizzes: user.quizzes,
      coins: user.coins,
      score: user.score,
      avatar: user.avatar,
      bio: user.bio,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
   };
};
const serializeUserWithPassword = (user) => {
   return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      token: user.token,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
   };
};

const userData = async (req, res) => {
   try {
      const users = await User.find({role: "user"});
      res.send(users);
   } catch (error) {
      return res.status(404).json({
         message: "Sorry can't get users right now !",
         success: false,
      });
   }
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

const getAllUsers = async (req, res) => {
   try {
      const users = await User.find({role: "user"});
      res.send(users);
   } catch (error) {
      return res.status(404).json({
         message: "Sorry can't get users right now !",
         success: false,
      });
   }
};

const getAllAdmins = async (req, res) => {
   try {
      const users = await User.find({role: "admin"});
      res.send(users);
   } catch (error) {
      return res.status(404).json({
         message: "Sorry can't get users right now !",
         success: false,
      });
   }
};

const getSingleUser = async (req, res) => {
   try {
      const user = await User.find({username: req});

      if (user === [] || user === null || user === "")
         res.status(404).json({
            message: "User wasn't found",
            success: false,
         });
      else res.send(user);
   } catch (error) {
      return res.status(500).json({
         message: "Something wrong happened.",
         success: false,
      });
   }
};

const deleteUsers = async (req, res) => {
   try {
      await User.findByIdAndDelete({_id: req.params.userId});
      return res.status(201).json({
         message: "Successfully deleted user !",
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         message: "This user is not allowed to be deleted!",
         success: false,
      });
   }
};

// Update Profil
// Updating password
// Update avatar => https://cloudinary.com/documentation/node_integration
const updatePassword = async (req, res) => {
   const {oldPassword, password} = req.body;
   try {
      // get user
      const user = await User.findById(req.user._id);
      if (!user) {
         return res.status(400).send("User not found");
      }
      // validate old password
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
         return res.status(400).send("Please enter correct old password");
      }
      // hash new password
      const hashedPassword = await bcrypt.hash(password, 12);
      // update user's password
      user.password = hashedPassword;
      const updateUser = await user.save();

      return res.json({user: updateUser});
   } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong. Try again");
   }
};

// Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
   const user = await User.findOne({email: req.body.email});

   if (!user) {
      return next(new ErrorHander("User not found", 404));
   }

   // Get ResetPassword Token
   const resetToken = user.getResetPasswordToken();
   await user.save({validateBeforeSave: false});

   const resetPasswordUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;

   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

   try {
      await sendMail({
         email: user.email,
         subject: `Password Recovery`,
         message,
      });

      res.status(200).json({
         success: true,
         message: `Email sent to ${user.email} successfully`,
      });
   } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({validateBeforeSave: false});

      return next(new ErrorHander(error.message, 500));
   }
});

// Reset Password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
   // creating token hash
   const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

   const user = await User.findOne({
      resetPasswordToken,
      // resetPasswordExpire: {$gt: Date.now()},
   });

   if (!user) {
      return next(
         new ErrorHander(
            "Reset Password Token is invalid or has been expired",
            400
         )
      );
   }

   if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Password does not password", 400));
   }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   await user.save();

   sendToken(user, 200, res);
});

// New Idea for update profile(detail infroamtion and password)
// update User password
const updatesPassword = catchAsyncErrors(async (req, res, next) => {
   const user = await User.findById(req.user._id).select("+password");

   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
   if (!isPasswordMatched) {
      return next(new ErrorHander("Old password is incorrect", 400));
   }
   if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHander("password does not match", 400));
   }
   user.password = req.body.newPassword;
   await user.save();

   sendToken(user, 200, res);
});

// update User Profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
   const newUserData = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      about: req.body.about,
   };
   // const user = await User.findById(req.user.id);

   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

   res.status(200).json({
      success: true,
   });
});
module.exports = {
   checkRole,
   userRegister,
   userLogin,
   userAuth,
   serializeUser,
   serializeUserWithPassword,
   getAllUsers,
   getAllAdmins,
   deleteUsers,
   getSingleUser,
   userData,
   forgotPassword,
   resetPassword,
   updatesPassword,
   updateProfile,
};
