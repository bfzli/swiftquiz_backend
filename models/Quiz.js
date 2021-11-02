const { Schema, model } = require("mongoose");
const User = require("./User");
const Category = require("./Category");

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
