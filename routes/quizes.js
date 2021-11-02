const router = require("express").Router();
const { userAuth, checkRole } = require("../utils/Auth");
const { createQuiz, fetchQuizes } = require("../controllers/quizAuth");

router.get("/", userAuth, checkRole(["user"]), async (req, res) => {
  await fetchQuizes(req.body, res);
});

router.post("/create-quiz", userAuth, async (req, res) => {
  await createQuiz(req.body, res);
});

router.get("/:id", userAuth, async (req, res) => {});

module.exports = router;
