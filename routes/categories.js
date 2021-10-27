const router = require("express").Router();
const Category = require('../models/Category');
const {userID} = require('../models/User');
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");
//User reg route

router.post("/add-cat",userAuth,userID, async (req, res) => {
  await Category(req.body, "category", res);
});

module.exports = router;