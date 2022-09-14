const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const verifyRoles = require("../middleware/permission");

router.get("/", controller.index);
router.get("/:id", verifyRoles("read"), controller.show);
router.post("/", verifyRoles("create"), controller.create);
router.put("/:id", verifyRoles("update"), controller.update);
router.delete("/:id", verifyRoles("delete"), controller.delete);
router.post("/:id/active", verifyRoles("active"), controller.active);

module.exports = router;
