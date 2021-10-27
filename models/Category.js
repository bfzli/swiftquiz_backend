const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: String,
});

module.exports = model("category", CategorySchema);
