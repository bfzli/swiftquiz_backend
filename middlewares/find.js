const Category = require("../models/Category");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const UserQuiz = require("../models/User_Quiz");

async function findCategory(req, res, next) {
  const category = await Category.findById(req.body._id);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }
  req.category = category;
  next();
}

async function findQuiz(req, res, next) {
  const quiz_id = req.params.quizId ? req.params.quizId : req.body._id;
  const quiz = await Quiz.findById(quiz_id, {
    include: {
      model: Question,

      required: false,
    },
  });
  if (!quiz) {
    return res.status(400).send("Invalid Quiz");
  }
  req.quiz = quiz;
  next();
}

module.exports = {
  findCategory,
  findQuiz,
};
