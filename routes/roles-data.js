const express = require("express");
const router = express.Router();
const { ROLE, PERMISSION, PERMISSION_ROLE } = require("../data");
const {
	canViewItem,
	canDeleteItem,
	canEditItem,
} = require("../permissions/general");

router.get("/", (req, res, next) => {
	return res.json({ ROLE, PERMISSION, PERMISSION_ROLE });
});

router.get("/browse", (req, res, next) => {
	return res.json(PERMISSION_ROLE.BROWSE.includes(1));
});

router.get("/test", (req, res, next) => {
	const condition =
		canViewItem(req.user, 5) ||
		canEditItem(req.user, req.item) ||
		canDeleteItem(req.user, req.item);

	if (!condition) {
		return res.status(403).json({
			error: "You do not have permission to perform this action.",
		});
	}

	return res.json({ condition });
});

module.exports = router;
