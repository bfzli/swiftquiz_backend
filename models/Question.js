const { Schema, model } = require("mongoose");
const Quiz = require("./Quiz");
const QuestionSchema = new Schema(
  {
    quiz_id: {
      type: Schema.Types.ObjectId,
      ref: Quiz,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answers: [
      {
        answer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("question", QuestionSchema);
