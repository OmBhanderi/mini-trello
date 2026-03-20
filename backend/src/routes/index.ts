import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import workSpaceRoutes from "../modules/workspace/workspace.routes"

const router = Router();

router.use("/auth", authRoutes);


router.use("/workspace", workSpaceRoutes);

export default router;
