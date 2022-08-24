const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		const userId = decoded.userId;

		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID is not valid";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: "Please login to access this route",
		});
	}
};
