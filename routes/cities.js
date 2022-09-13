const express = require("express");
const router = express.Router();
const permission = require("../middleware/permission");
const controllers = require("../controllers/city");
const models = require("../models");

router.get("/", controllers.index);
router.get("/:id", setCity, permission("read"), controllers.show);
router.post("/", setCity, permission("create"), controllers.create);
router.put("/:id", setCity, permission("update"), controllers.update);
router.delete("/:id", setCity, permission("delete"), controllers.delete);

async function setCity(req, res, next) {
	if (req.params.id) {
		const city = await models.City.findOne({
			where: { id: req.params.id },
		});

		if (!city) {
			res.status(404).json({ message: "City not found" });
		}

		req.item = city.dataValues;
	}

	req.endpoint = "cities";
	next();
}

module.exports = router;
