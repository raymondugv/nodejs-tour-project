import { verify } from "jsonwebtoken";

export default (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const decoded = verify(token, process.env.JWT_SECRET);

		req.user = decoded;

		return next();
	} catch (err) {
		return res.status(403).json({
			error: "Please login.",
		});
	}
};
