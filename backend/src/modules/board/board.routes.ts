import { Router } from "express";
import {
  createBoardController,
  getBoardsController,
} from "./board.controller";
import { authMiddleware } from "../../common/middleware/auth.middelware";
import { validate } from "../../common/middleware/validate.middleware";
import { createBoardSchema } from "./board.validation";

const router = Router({ mergeParams: true });

// /workspace/:workSpaceId/boards
router.post("/", authMiddleware,validate(createBoardSchema), createBoardController);
router.get("/", authMiddleware, getBoardsController);

export default router;