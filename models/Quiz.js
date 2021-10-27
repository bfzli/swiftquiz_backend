const { Schema, model } = require("mongoose");

const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("quiz", QuizSchema);
