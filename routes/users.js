const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const verifyRoles = require("../middleware/permission");

/* GET users listing. */
router.get("/", controllers.index);
router.get("/:id", verifyRoles("read"), controllers.show);
router.post("/", verifyRoles("create"), controllers.create);
router.put("/:id", verifyRoles("update"), controllers.update);
router.delete("/:id", verifyRoles("delete"), controllers.delete);

module.exports = router;
