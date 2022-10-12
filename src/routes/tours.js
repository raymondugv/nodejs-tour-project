import { Router } from "express";
const router = Router();
import {
	index,
	show,
	create,
	update,
	destroy,
	active,
} from "@controllers/tour";
import verifyRoles from "@middlewares/permission";
import multer from "multer";
import storage from "@config/uploadConfig";

router.get("/", index);
router.get("/:id", verifyRoles, show);
router.post(
	"/",
	verifyRoles,
	multer({ storage: storage }).single("image"),
	create
);
router.put(
	"/:id",
	verifyRoles,
	multer({ storage: storage }).single("image"),
	update
);
router.delete("/:id", verifyRoles, destroy);
router.post("/:id/active", verifyRoles, active);

export default router;
