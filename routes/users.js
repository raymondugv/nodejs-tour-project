const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const permission = require("../middleware/permission");

/* GET users listing. */
router.get("/", controllers.index);
router.get("/:id", setUser, permission, controllers.show);
router.post("/", controllers.create);
router.put("/:id", setUser, permission, controllers.update);
router.delete("/:id", setUser, permission, controllers.delete);

async function setUser(req, res, next) {
  const user = await models.User.findOne({where : {id : req.params.id}});
  if (!user) {
    res.status(404).json({message : "User not found"});
  }

  req.item = user.dataValues;
  next();
}

module.exports = router;
