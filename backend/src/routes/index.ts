import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import workSpaceRoutes from "../modules/workspace/workspace.routes"
import boardRoutes from "../modules/board/board.routes"
import listRoutes from "../modules/list/list.routes"

const router = Router();

router.use("/auth", authRoutes);


router.use("/workspace", workSpaceRoutes);


router.use("/:workSpaceId/boards", boardRoutes);


router.use("/:boardId/lists", listRoutes);

export default router;
