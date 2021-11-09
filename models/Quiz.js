const { Schema, model } = require("mongoose");
const shortId = require("shortid");
const Category = require("./Category");

const QuizSchema = new Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },


    redeem_code: {
      type: String,
      unique: true,
      default: shortId.generate,
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

