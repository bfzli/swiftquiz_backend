const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const { createQuiz, fetchQuizes } = require("../controllers/quizAuth");

const prefix = "/:_id/quiz";

router.get(`${prefix}/`, userAuth, async (req, res) => {
  await fetchQuizes(req.body, res);
});

router.post(`${prefix}/create-quiz`, userAuth, async (req, res) => {
  await createQuiz(req.body, res);
});

router.get("/:id", userAuth, async (req, res) => {});

module.exports = router;
