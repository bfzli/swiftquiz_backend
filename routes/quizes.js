const router = require("express").Router();
const Quiz = require("../models/Quiz");
const { userAuth } = require("../utils/Auth");

const { Mongoose } = require("mongoose");

router.get("/", userAuth, async (req, res) => {
  const quizzes = await Quiz.find({})
    .populate("user")
    .exec((err, user) => {
      if (err)
        res.status(400).json({
          message: "Cannot fetch quizes right now !",
          success: false,
        });
    });
  res.send(quizzes);
});

router.post("/create-quiz", userAuth, async (req, res) => {
  try {
    const quiz = await Quiz.create({
      _id: new Mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
    });
    res.send(quiz);
  } catch (error) {
    res.status(400).json({
      message: "Cannot create rn !",
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
