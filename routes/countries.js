const express = require("express");
const router = express.Router();
const controller = require("../controllers/country");
const permission = require("../middleware/permission");
const models = require("../models");

router.get("/", controller.index);
router.get("/:id", setCountry, permission, controller.show);
router.post("/", setCountry, permission, controller.create);
router.put("/:id", setCountry, permission, controller.update);
router.delete("/:id", setCountry, permission, controller.delete);

async function setCountry(req, res, next) {
	if (req.params.id) {
		const country = await models.Country.findOne({
			where: { id: req.params.id },
		});

		if (!country) {
			res.status(404).json({ message: "Country not found" });
		}

		req.item = country.dataValues;
	}

	req.endpoint = "countries";
	next();
}

module.exports = router;
