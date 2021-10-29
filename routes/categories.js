const router = require("express").Router();
const { userAuth, checkRole } = require("../utils/Auth");
const {
  categoryCreate,
  serializeCategory,
  fetchCategories,
} = require("../utils/categoriesAuth");

router.post(
  "/create-category",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await categoryCreate(req.body, "admin", res);
  }
);

router.get("/", userAuth, async (req, res) => {
  await fetchCategories(req.body, res);
});

module.exports = router;
