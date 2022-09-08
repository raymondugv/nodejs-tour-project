const express = require("express");
const router = express.Router();
const permission = require("../middleware/permission");
const controllers = require("../controllers/city");
const models = require("../models");

router.get("/", controllers.index);
router.get("/:id", setCity, permission, controllers.show);
router.post("/", controllers.create);
router.put("/:id", setCity, permission, controllers.update);
router.delete("/:id", setCity, permission, controllers.delete);

async function setCity(req, res, next) {
	const city = await models.City.findOne({ where: { id: req.params.id } });
	if (!city) {
		res.status(404).json({ message: "City not found" });
	}

	req.item = city.dataValues;
	next();
}

module.exports = router;
