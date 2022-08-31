const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const {
	canViewUser,
	canEditUser,
	canDeleteUser,
} = require("../permissions/user");

/* GET users listing. */
router.get("/", controllers.index);
router.get("/:id", setUser, authGetUser, controllers.show);
router.post("/", controllers.create);
router.put("/:id", setUser, authEditUser, controllers.update);
router.delete("/:id", setUser, authDeleteUser, controllers.delete);

async function setUser(req, res, next) {
	const user = await models.User.findOne({ where: { id: req.params.id } });
	if (!user) {
		res.status(404).json({ message: "User not found" });
	}

	req.userInfo = user.dataValues;
	next();
}

async function authGetUser(req, res, next) {
	if (!canViewUser(req.user, req.userInfo)) {
		return res
			.status(403)
			.json({ message: "You're not allowed to see this user" });
	}

	next();
}

async function authEditUser(req, res, next) {
	if (!canEditUser(req.user, req.userInfo)) {
		return res
			.status(403)
			.json({ message: "You're not allowed to edit this user" });
	}

	next();
}

async function authDeleteUser(req, res, next) {
	if (!canDeleteUser(req.user, req.userInfo)) {
		return res
			.status(401)
			.json({ message: "You're not allowed to delete this user" });
	}

	next();
}

module.exports = router;
