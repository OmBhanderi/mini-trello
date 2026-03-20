import { Router } from "express";
import {
  createWorkspaceController,
  getWorkspacesController,
} from "./workspace.controller";
import { authMiddleware } from "../../common/middleware/auth.middelware";
import { validate } from "../../common/middleware/validate.middleware";
import { createWorkspaceSchema } from "./workspace.validation";

const router = Router();

router.post("/", authMiddleware, validate(createWorkspaceSchema),createWorkspaceController);
router.get("/", authMiddleware, getWorkspacesController);

export default router;