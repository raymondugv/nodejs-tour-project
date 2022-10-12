import { Router } from "express";
const router = Router();
import { login, logout } from "@controllers/user";
import auth from "@middlewares/auth";

router.post("/login", login);

// middleware protected routes
router.post("/logout", auth, logout);

export default router;
