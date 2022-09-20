const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const verifyRoles = require("../middleware/permission");
const multer = require("multer");

router.get("/", controller.index);
router.get("/:id", verifyRoles, controller.show);
router.post(
	"/",
	verifyRoles,
	multer({ dest: "public/images/" }).single("image"),
	controller.create
);
router.put(
	"/:id",
	verifyRoles,
	multer({ dest: "public/images/" }).single("image"),
	controller.update
);
router.delete("/:id", verifyRoles, controller.delete);
router.post("/:id/active", verifyRoles, controller.active);

module.exports = router;
