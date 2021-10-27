const router = require("express").Router();
const { userRegister } = require("../utils/Auth");
//const User = require('./models/User');

//User reg route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

//Admin reg route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

//SuperAdmin reg route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

//User login route
router.post("/login-user", async (req, res) => {});

//Admin login route
router.post("/login-admin", async (req, res) => {});

//SuperAdmin login route
router.post("/login-super-admin", async (req, res) => {});

//Profile Route
router.get("profile", async (req, res) => {});

//User protected route
router.post("/user-protected", async (req, res) => {});

//Admin protected route
router.post("/admin-protected", async (req, res) => {});

//SuperAdmin protected route
router.post("/super-admin-protected", async (req, res) => {});

module.exports = router;
