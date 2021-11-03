const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const { createQuiz, fetchQuizes } = require("../controllers/quizAuth");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

router.get("/", userAuth, async (req, res) => {
  await fetchQuizes(req.body, res);
});

router.post("/:id/create-quiz", userAuth, async (req, res) => {
  await createQuiz(req.body, res);
});

router.get("/:id", userAuth, async (req, res) => {
  try {
    const quizById = await Quiz.findById(req.params.id).populate({
      path: "created_by",
      path: "category",
      select: "name",
      select: "name",
    });
    res.send(quizById);
  } catch (error) {
    return res.status(500).json({
      message: "Can't fetch the quiz !",
      success: false,
    });
  }
});

module.exports = router;
