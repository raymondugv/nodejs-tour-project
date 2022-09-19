const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const verifyRoles = require("../middleware/permission");

router.get("/", controller.index);
router.get("/:id", verifyRoles, controller.show);
router.post("/", verifyRoles, controller.create);
router.put("/:id", verifyRoles, controller.update);
router.delete("/:id", verifyRoles, controller.delete);
router.post("/:id/active", verifyRoles, controller.active);

module.exports = router;
