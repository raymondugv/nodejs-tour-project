const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;

		if (req.body.userId && req.body.userId !== userId) {
			res.status(403).json({ message: "User ID is not valid" });
			return;
		}

		next();
	} catch {
		res.status(403).json({
			error: "Please login to access this route",
		});
	}
};
