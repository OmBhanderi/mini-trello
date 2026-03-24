import { Router } from "express";
import {
  createListController,
  getListsController,
  updateListOrderController,
} from "./list.controller";
import { authMiddleware } from "../../common/middleware/auth.middelware";
import { validate } from "../../common/middleware/validate.middleware";
import { createListSchema, updateListOrderSchema } from "./list.validation";

const router = Router({ mergeParams: true });

// /boards/:boardId/lists
router.post("/", authMiddleware,validate(createListSchema), createListController);


router.get("/", authMiddleware, getListsController);


router.patch("/",validate(updateListOrderSchema),updateListOrderController)


export default router;