const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const permission = require("../middleware/permission");
const models = require("../models");

/* GET users listing. */
router.get("/", controllers.index);
router.get("/:id", setUser, permission("read"), controllers.show);
router.post("/", setUser, permission("create"), controllers.create);
router.put("/:id", setUser, permission("update"), controllers.update);
router.delete("/:id", setUser, permission("delete"), controllers.delete);

async function setUser(req, res, next) {
	if (req.params.id) {
		const user = await models.User.findOne({
			where: { id: req.params.id },
		});

		if (!user) {
			res.status(404).json({ message: "User not found" });
		}

		req.item = user.dataValues;
	}

	req.endpoint = "users";
	next();
}

module.exports = router;
