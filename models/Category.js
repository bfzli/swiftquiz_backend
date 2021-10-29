const { Schema, model } = require("mongoose");
const User = require("./User");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

module.exports = model("category", CategorySchema);
