const router = require("express").Router();
const passport = require("passport");

router.get("/social-login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success !",
      user: req.user,
    });
  }
});

router.get("/social-login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed !",
  });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("https://swiftquiz.vercel.app");
});
//Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/social-login/failed",
  }),
  function (req, res) {
    res.redirect("https://swiftquiz.vercel.app/dashboard/welcome");
  }
);
//GitHub Auth
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/social-login/failed",
  }),
  function (req, res) {
    res.redirect("https://swiftquiz.vercel.app/dashboard/welcome");
  }
);
//LinkedIn Auth
router.get(
  "/linkedin",
  passport.authenticate("linkedin", { state: ["profile"] })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "/social-login/failed",
  }),
  function (req, res) {
    res.redirect("https://swiftquiz.vercel.app/dashboard/welcome");
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/social-login/failed",
  }),
  function (req, res) {
    res.redirect("https://swiftquiz.vercel.app/dashboard/welcome");
  }
);

module.exports = router;
