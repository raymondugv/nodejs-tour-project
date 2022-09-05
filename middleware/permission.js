const {
	canViewItem,
	canDeleteItem,
	canEditItem,
} = require("../permissions/general");

module.exports = (req, res, next) => {
	try {
		if (!canViewItem(req.user, req.item)) {
			return res
				.status(403)
				.json({ message: "You're not allowed to see this item" });
		}

		if (!canEditItem(req.user, req.item)) {
			return res
				.status(403)
				.json({ message: "You're not allowed to edit this item" });
		}

		if (!canDeleteItem(req.user, req.item)) {
			return res
				.status(401)
				.json({ message: "You're not allowed to delete this item" });
		}

		next();
	} catch (err) {
		return res.status(403).json({
			error: "You don't have permission to access this resource." + err,
		});
	}
};
