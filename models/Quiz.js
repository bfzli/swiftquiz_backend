const { Schema, model } = require("mongoose");

const Category = require("./Category");

const QuizSchema = new Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },

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

    questions: [
      {
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
    ],
  },
  { timestamps: true }
);

module.exports = model("quiz", QuizSchema);
