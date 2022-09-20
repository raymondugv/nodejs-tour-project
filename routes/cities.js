const express = require("express");
const router = express.Router();
const verifyRoles = require("../middleware/permission");
const controllers = require("../controllers/city");

router.get("/", controllers.index);
router.get("/:id", verifyRoles, controllers.show);
router.post("/", verifyRoles, controllers.create);
router.put("/:id", verifyRoles, controllers.update);
router.delete("/:id", verifyRoles, controllers.delete);

module.exports = router;
