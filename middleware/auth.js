const jwt = require("jsonwebtoken");

const admin_role = {
	id: 1,
	name: "Admin",
	permissions: [
		{
			path: "users",
			action: "index",
		},
	],
};

const owner_role = {
	id: 2,
	name: "Owner",
	permissions: [
		{
			path: "users",
			action: "index",
		},
	],
};

const user_role = {
	id: 3,
	name: "User",
	permissions: [],
};

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;

		if (req.body.userId && req.body.userId !== userId) {
			res.status(403).json({ message: "User ID is not valid" });
			return;
		}

		res.json(req.originalUrl);

		// switch (decoded.roleId) {
		// 	case 1:
		// 		res.json({ message: "Admin" });
		// 		break;
		// 	case 2:
		// 		res.json({ message: "Owner" });
		// 		break;
		// 	default:
		// 		res.json({ message: "User" });
		// }

		next();
	} catch (err) {
		res.status(403).json({
			error: "Please login to access this route" + err,
		});
	}
};
