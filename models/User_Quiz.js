const { Schema, model } = require("mongoose");

const UserQuizSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("user_quiz", UserQuizSchema);
