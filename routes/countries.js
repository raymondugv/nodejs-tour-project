const express = require("express");
const router = express.Router();
const controller = require("../controllers/country");
const auth = require("../middleware/auth");

router.get("/", auth, controller.index);
router.get("/:id", auth, controller.show);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
