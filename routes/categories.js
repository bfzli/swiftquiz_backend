const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const {
  categoryCreate,
  serializeCategory,
  fetchCategories,
} = require("../utils/categoriesAuth");

router.post("/create-category", userAuth, async (req, res) => {
  await categoryCreate(req.body, res);
});

router.get("/", userAuth, async (req, res) => {
  await fetchCategories(req.body, res);
});

module.exports = router;
