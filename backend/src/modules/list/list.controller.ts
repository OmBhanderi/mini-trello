import { Response } from "express";
import {
  createListService,
  getListsByBoardService,
  updateListOrderService,
} from "./list.service";

import { AuthRequest } from "../../common/middleware/auth.middelware";

export const createListController = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const boardId = req.params.boardId as string;

    const list = await createListService({ ...data, boardId });

    res.json(list);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getListsController = async (req: AuthRequest, res: Response) => {
  try {
    const boardId = req.params.boardId as string;

    const lists = await getListsByBoardService(boardId);

    res.json(lists);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateListOrderController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const data = req.body;
    const boardId = req.params.boardId as string;

    const lists = await updateListOrderService({ ...data, boardId });

    res.json(lists);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
