import { Router } from "express";
const router = Router();
import { index, show, create, update, destroy } from "@controllers/user";
import verifyRoles from "@middlewares/permission";

/* GET users listing. */
router.get("/", index);
router.get("/:id", verifyRoles, show);
router.post("/", verifyRoles, create);
router.put("/:id", verifyRoles, update);
router.delete("/:id", verifyRoles, destroy);

export default router;
