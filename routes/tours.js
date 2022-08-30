const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/tour");

router.get("/", auth, controller.index);
router.get("/:id", auth, controller.show);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
