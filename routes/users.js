const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const verifyRoles = require("../middleware/permission");

/* GET users listing. */
router.get("/", controllers.index);
router.get("/:id", verifyRoles(), controllers.show);
router.post("/", verifyRoles(), controllers.create);
router.put("/:id", verifyRoles(), controllers.update);
router.delete("/:id", verifyRoles(), controllers.delete);

module.exports = router;
