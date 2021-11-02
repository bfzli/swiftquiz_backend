const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const {
  createQuestion,
  fetchQuestion,
} = require("../controllers/questionAuth");

router.get("/", userAuth, async (req, res) => {
  await fetchQuestion(req.body, res);
});

router.post("/add-question", userAuth, async (req, res) => {
  await createQuestion(req.body, res);
});

module.exports = router;
