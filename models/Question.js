const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    question: [
      {
        type: String,
        required: true,
      },
    ],
    answer: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("question", QuestionSchema);
