const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controllers = require("../controllers/city");

router.get("/", auth, controllers.index);
router.get("/:id", auth, controllers.show);
router.post("/", auth, controllers.create);
router.put("/:id", auth, controllers.update);
router.delete("/:id", auth, controllers.delete);

module.exports = router;
