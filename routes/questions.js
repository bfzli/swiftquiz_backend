const router = require("express").Router();
const Question = require("../models/Question");
const { userAuth } = require("../utils/Auth");

const prefix = "/:quizId/questions";

router.get(`${prefix}/`, userAuth, async (req, res) => {
  const questions = await Question.find({
    where: { quiz_id: req.params.quizId },
  });
  res.send(questions);
});

router.post(`${prefix}/`, userAuth, async (req, res) => {
  try {
    const question = await Question.create({
      quiz_id: req.quiz._id,
      question: req.body.question,
      answer: req.body.answer,
    });
    res.send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
