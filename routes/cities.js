const express = require("express");
const router = express.Router();
const verifyRoles = require("../middleware/permission");
const controllers = require("../controllers/city");

router.get("/", controllers.index);
router.get("/:id", verifyRoles("read"), controllers.show);
router.post("/", verifyRoles("create"), controllers.create);
router.put("/:id", verifyRoles("update"), controllers.update);
router.delete("/:id", verifyRoles("delete"), controllers.delete);

module.exports = router;
