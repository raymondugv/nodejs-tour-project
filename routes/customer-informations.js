const express = require("express");
const router = express.Router();
const verifyRoles = require("@middlewares/permission");
const controllers = require("@controllers/customer-information");
const multer = require("multer");
const storage = require("@config/uploadConfig");

router.get("/", controllers.index);
router.get("/:id", verifyRoles, controllers.show);
router.post(
	"/",
	verifyRoles,
	multer({ storage: storage }).single("avatar"),
	controllers.create
);
router.put(
	"/:id",
	verifyRoles,
	multer({ storage: storage }).single("avatar"),
	controllers.update
);
router.delete("/:id", verifyRoles, controllers.delete);

module.exports = router;
