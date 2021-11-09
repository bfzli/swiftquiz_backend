const { Schema, model } = require("mongoose");
const User = require("./User");
const Category = require("./Category");
const shortId = require("shortid");

const QuizSchema = new Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = model("quiz", QuizSchema);
