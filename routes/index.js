const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../models");

/* GET home page. */
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: "Please provide email and password" });
		}

		const userExist = await models.User.findOne({ email: req.body.email });

		if (!userExist) {
			return res.json({ message: "User not found" });
		}

		const isPasswordMatch = await bcrypt.compare(
			password,
			userExist.password
		);

		if (!isPasswordMatch) {
			return res.json({ message: "Password is incorrect" });
		}

		const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res.json({
			message: "Login successful",
			token,
		});
	} catch (error) {
		return res.json({ message: error.message });
	}
});

module.exports = router;
