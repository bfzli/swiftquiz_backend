const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    coins: {
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
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);
