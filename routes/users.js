const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
  getAllUsers,
  getAllAdmins,
} = require("../utils/Auth");
const User = require("../models/User")

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
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

//Admin login route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//SuperAdmin login route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

//Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

//User protected route
router.get(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("dummy");
  }
);

//Admin protected route
router.get(
  "/all-users",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await getAllUsers(req.body,res)
  }
);
router.get(
  "/all-admins",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await getAllAdmins(req.body,res)
  }
);

router.delete("/:userId",userAuth, checkRole(["admin"]), async (req, res) => {
 try {
    await User.findByIdAndDelete(req.params.userId)
     return res.status(201).json({
      message: "Successfully deleted user !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "This user is not allowed to be deleted!",
      success: false,
    });
  }
})


//SuperAdmin protected route

router.get(
  "/super-admin-protected",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("dummy");
  }
);

router.get(
  "/super-admin-and-admin-protected",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("dummy");
  }
);

module.exports = router;
