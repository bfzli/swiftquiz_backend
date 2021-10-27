const Category = require("../models/Category");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const UserQuiz = require("../models/User_Quiz");

async function findCategory(req, res, next) {
  const category = await Category.findById(req.body.category_id);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }
  req.category = category;
  next();
}
