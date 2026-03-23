import { Response } from "express";
import {
  createBoardService,
  getBoardsByWorkspaceService,
} from "./board.service";
import { createBoardSchema } from "./board.validation";
import { AuthRequest } from "../../common/middleware/auth.middelware";
import { success } from "zod";

export const createBoardController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const data = createBoardSchema.parse(req.body);
    const workSpaceId = req.params.workSpaceId as string;
    const finalData = { ...data, workSpaceId: workSpaceId };

    const board = await createBoardService(finalData);

    res.json(board);
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: {} });
  }
};

export const getBoardsController = async (req: AuthRequest, res: Response) => {
  try {
    const workSpaceId = req.params.workSpaceId as string;

    const boards = await getBoardsByWorkspaceService(workSpaceId);

    res.json(boards);
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: [] });
  }
};
