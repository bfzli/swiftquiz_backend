const router = require("express").Router();
const Quiz = require("../models/Quiz");
const { userAuth } = require("../utils/Auth");
const { findCategory } = require("../middlewares/find");

router.get("/", userAuth, async (req, res) => {
  const quizzes = await Quiz.find();
  res.send(quizzes);
});

router.post("/create-quiz", [userAuth, findCategory], async (req, res) => {
  try {
    const quiz = await Quiz.create({
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      _id: req.category._id,
    });
    res.send(quiz);
  } catch (error) {
    res.status(400).json({
      message: "Something wrong with category id!",
      success: false,
    });
  }
});

router.delete("/:id", userAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne(req.body._id);

    await quiz.destroy();
    res.status(200).json({
      message: "Quiz deleted",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "Quiz not found!",
      success: false,
    });
  }
});

module.exports = router;
