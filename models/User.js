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
    coins:
      {
      type:Number,
      default : 100,
      },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "quiz",
      },
    ],
    profile: [
      {
        type: Schema.Types.String,
        ref: "profile",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);
