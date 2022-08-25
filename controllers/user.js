const models = require("../models");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			email: joi.string().email().required(),
			password: joi.string().required(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		const { email, password } = data;

		if (!email || !password) {
			return res.json({ message: "Please provide email and password" });
		}

		const userExist = await models.User.findOne({ email: email });

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
			message: "Login successfully",
			user: userExist,
			token,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
