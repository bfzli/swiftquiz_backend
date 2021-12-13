const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
  getAllUsers,
  getAllAdmins,
  deleteUsers,
  getSingleUser,
  userData,
} = require("../utils/Auth");

const { upload } = require("../middlewares/uploads");
const User = require("../models/User");
const Profile = require("../models/Profile");

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

router.get("/user-collection", userAuth, async (req, res) => {
  await userData(req.body, res);
});

//Get a  user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    res.send(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//User profile creation and fetch routes

router.post(
  "/:userId/create-profile",
  userAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const profile = new Profile({
        bio: req.body.bio,
        username: req.params.userId,
        avatar: req.file.filename,
      });

      await profile.save();
      user.profile.push(profile.avatar);
      await user.save();

      return res.status(201).json({
        message: "Profile created successfully !",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Can't create your profile right now !",
        success: false,
      });
    }
  }
);

router.get("/:userId/my-profile", userAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      username: req.params.userId,
    }).populate("username", "name email username coins quizzes");
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Your profile is not available",
      });
    }
    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to get profile",
      success: false,
    });
  }
});

router.put(
  "/:userId/update-profile",
  userAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const profile = await Profile.findOneAndUpdate(
        { username: req.params.userId },
        { profile: req.body.profile },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Yayyy you just updated your profile !",
        profile,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Unable to get profile",
        success: false,
      });
    }
  }
);

//User score collection

router.put("/:userId/saving-new-score", userAuth, async (req, res) => {
  try {
    const newCoins = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $inc: { coins: req.body.coins, score: req.body.score } },
      //{ $inc: { score: req.body.score } }
    );
    return res.status(201).json({
      success: true,
      message: "New score saved successfully!",
      newCoins: newCoins,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Nope, no new score saved !",
    });
  }
});

router.put("/:userId/quiz-purchasing", userAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (user.coins >= req.body.coins) {
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $inc: { coins: -req.body.coins } }
      );
      return res.status(201).json({
        success: true,
        message: "You have successfully purchased this quiz!",
      });
    } else {
      return res.status(402).json({
        success: false,
        message: "Not enough coins to purchase this quiz!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while purchasing quiz!",
    });
  }
});

//Admin protected route
router.get("/all-users", userAuth, checkRole(["admin"]), async (req, res) => {
  await getAllUsers(req.body, res);
});

router.get("/all-admins", userAuth, checkRole(["admin"]), async (req, res) => {
  await getAllAdmins(req.body, res);
});

/*
This function will fetch the user
one specific user from mongodb
and based on that resposne on the
front end we will fetch his profile
*/

router.get("/:username", async (req, res) => {
  await getSingleUser(req.params.username, res);
});

router.delete("/admin/:userId", userAuth, checkRole(["admin"]), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
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
});

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

router.delete("/:userId", userAuth, async (req, res) => {
  try {
    const currentUser = req.params.userId;
    selectedUser = await User.findOneAndDelete({ _id: currentUser })
    if (selectedUser) return res.status(200).json({
      message: 'Your account was closed.',
      success: true
    })

    else return res.status(404).json({
      message: 'Your account was not found.',
      success: false
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong closing your account.',
      success: false
    })
  }
})

/*
This is the one route global temrinal route
that can be manipulated based on the input
*/

// router.delete(
//   "/terminal/delete/user/:userId",
//   async (req, res) => {
//     const user = req.params.userId;
//     try {
//       await User.findAndDelete({_id: user});
//       return res.status(201).json({
//         message: "Successfully deleted user !",
//         success: true,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: "This user is not allowed to be deleted!",
//         success: false,
//       });
//     }
//   }
// );
module.exports = router;
