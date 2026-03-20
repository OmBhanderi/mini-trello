import { Response } from "express";
import {
  createWorkspaceService,
  getUserWorkspacesService,
} from "./workspace.service";
import { AuthRequest } from "../../common/middleware/auth.middelware";

export const createWorkspaceController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { name } = req.body;

    const userId = req.user!.id;

    const workspace = await createWorkspaceService({ userId, name });

    res.json(workspace);
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: {} });
  }
};

export const getWorkspacesController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const workspaces = await getUserWorkspacesService(userId);

    res.json(workspaces);
  } catch (err: any) {
    res.status(400).json({ sucess: false, message: err.message, data: {} });
  }
};
