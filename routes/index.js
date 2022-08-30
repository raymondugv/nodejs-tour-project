const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/login", controller.login);

// middleware protected routes
router.post("/logout", auth, controller.logout);

module.exports = router;
