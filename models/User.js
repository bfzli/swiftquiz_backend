const {Schema, model} = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: false,
      },
      email: {
         type: String,
         required: false,
      },
      role: {
         type: String,
         default: "user",
         enum: ["user", "admin", "superadmin"],
      },
      username: {
         type: String,
         required: false,
      },
      password: {
         type: String,
         required: false,
      },
      coins: {
         type: Number,
         default: 100,
      },
      score: {
         type: Number,
         default: 100,
      },
      quizzes: [
         {
            type: Schema.Types.ObjectId,
            ref: "quiz",
         },
      ],
      // profile: [{
      //    type:Schema.Types.String,
      //    ref:'profile',
      //
      ///   }],
      bio: {
         type: String,
         required: false,
      },
      avatar: {
         type: String,
         default: "daecd7bf24999a246a2fdb44c62200c6.png",
         required: false,
      },
      resetPasswordToken: {
         type: String,
      },
      resetPasswordExpire: {
         type: Date,
      },
   },
   {timestamps: true}
);

UserSchema.methods.getJWTToken = async function () {
   return await jwt.sign({id: this._id}, SECRET, {expiresIn: "2 days"});
};
// Compare Password
UserSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString("hex");
   //hash token and set to resetPasswordToken Field
   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

   //set expire
   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
   return resetToken;
};
module.exports = model("user", UserSchema);
