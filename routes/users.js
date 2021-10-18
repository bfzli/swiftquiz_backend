const router = require("express").Router();

//User reg route
router.post("/register-user", async (req, res) => {});

//Admin reg route
router.post("/register-admin", async (req, res) => {});

//SuperAdmin reg route
router.post("/register-super-admin", async (req, res) => {});

//User login route
router.post("/login-user", async (req, res) => {});

//Admin login route
router.post("/login-admin", async (req, res) => {});

//SuperAdmin login route
router.post("/login-super-admin", async (req, res) => {});

//User protected route
router.post("/user-profile", async (req, res) => {});

//Admin protected route
router.post("/admin-profile", async (req, res) => {});

//SuperAdmin protected route
router.post("/super-admin-profile", async (req, res) => {});

module.exports = router;
