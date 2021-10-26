const express = require("express");
const router = express.Router();

const CategoryModel = require("../models/Category");

const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

router.get("/", userAuth, async (req, res) => {
  const categories = await Category.findAll();
  res.send(categories);
});

router.get("/create-category", userAuth, async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body.name);
    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
