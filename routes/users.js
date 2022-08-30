const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");

/* GET users listing. */
router.get("/", controllers.index);
router.get("/:id", controllers.show);
router.post("/", controllers.create);
router.put("/:id", controllers.update);
router.delete("/:id", controllers.delete);

module.exports = router;
