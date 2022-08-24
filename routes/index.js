const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

/* GET home page. */
router.get("/", auth, function (req, res, next) {
	res.json({ message: "this is message" });
});

module.exports = router;
