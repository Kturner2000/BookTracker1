const express = require("express");
const {
    signup,
    login,
    logout,
    checkAuth,
} = require("../controllers/auth.controller");
const protectRoute = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

//check whether to take to login or profile page
router.get("/check", protectRoute, checkAuth);

module.exports = router;
