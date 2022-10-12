import { Router } from "express";
const router = Router();
import verifyRoles from "@middlewares/permission";
import {
	index,
	show,
	create,
	update,
	destroy,
} from "@controllers/customer-information";
import multer from "multer";
import storage from "@config/uploadConfig";

router.get("/", index);
router.get("/:id", verifyRoles, show);
router.post(
	"/",
	verifyRoles,
	multer({ storage: storage }).single("avatar"),
	create
);
router.put(
	"/:id",
	verifyRoles,
	multer({ storage: storage }).single("avatar"),
	update
);
router.delete("/:id", verifyRoles, destroy);

export default router;
