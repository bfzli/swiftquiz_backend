const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const {
  createQuestion,
  fetchQuestions,
} = require("../controllers/questionAuth");

router.get("/questions", userAuth, async (req, res) => {
  await fetchQuestions(req.body, res);
});

router.post("/add-question", userAuth, async (req, res) => {
  await createQuestion(req.body, res);
});

module.exports = router;
