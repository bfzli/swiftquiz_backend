const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");
const Category = require("../models/Category");

router.get("/", userAuth, async (req, res) => {
  const categories = await Category.findAll();
  res.send(categories);
});

module.exports = router;
