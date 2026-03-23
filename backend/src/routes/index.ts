import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import workSpaceRoutes from "../modules/workspace/workspace.routes"
import boardRoutes from "../modules/board/board.routes"

const router = Router();

router.use("/auth", authRoutes);


router.use("/workspace", workSpaceRoutes);


router.use("/:workSpaceId/boards", boardRoutes);

export default router;
