const express = require("express");
const router = express.Router();
const controller = require("../controllers/country");
const verifyRoles = require("../middleware/permission");

router.get("/", controller.index);
router.get("/:id", verifyRoles(), controller.show);
router.post("/", verifyRoles(), controller.create);
router.put("/:id", verifyRoles(), controller.update);
router.delete("/:id", verifyRoles(), controller.delete);

module.exports = router;
