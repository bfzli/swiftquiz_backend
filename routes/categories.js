const router = require("express").Router();
const { categoryCreate, userAuth } = require("../utils/Auth");

router.post("/create-category", userAuth, async (req, res) => {
  await categoryCreate(req.body.name, res);
});

module.exports = router;
