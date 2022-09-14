const express = require("express");
const router = express.Router();
const controller = require("../controllers/country");
const verifyRoles = require("../middleware/permission");

router.get("/", controller.index);
router.get("/:id", verifyRoles("read"), controller.show);
router.post("/", verifyRoles("create"), controller.create);
router.put("/:id", verifyRoles("update"), controller.update);
router.delete("/:id", verifyRoles("delete"), controller.delete);

module.exports = router;
