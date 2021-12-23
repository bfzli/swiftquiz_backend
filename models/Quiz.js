const { Schema, model } = require("mongoose");
const shortId = require("shortid");
const Category = require("./Category");

const QuizSchema = new Schema(
  {
    thumbnail: {
      type: String,
      default: "7b3377eb378e9dfb56799cf7f92fe383.png",
      required: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    privacy: {
      type: String,
    },
    redeem_code: {
      type: String,
      unique: true,
      default: shortId.generate,
    },
    purchaseCoins: {
      type: Number,
      required: false,
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
        answer1: {
          type: String,
          required: true,
        },
        answer2: {
          type: String,
          required: true,
        },
        answer3: {
          type: String,
          required: true,
        },
        answer4: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("quiz", QuizSchema);
