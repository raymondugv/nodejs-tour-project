const express = require("express");
const router = express.Router();
const {
	ROLE,
	PERMISSION,
	PERMISSION_ROLE,
	ACTIVE_FIELD,
} = require("../config/data");

const {
	canViewItem,
	canDeleteItem,
	canEditItem,
	canActiveItem,
} = require("../permissions/general");

router.get("/", (req, res, next) => {
	return res.json({ ROLE, PERMISSION, PERMISSION_ROLE });
});

router.get("/active", setItem, (req, res, next) => {
	const condition = canActiveItem(req.user, req.body);

	return res.json(condition);
});

async function setItem(req, res, next) {
	req.item = 5;
	next();
}

module.exports = router;
