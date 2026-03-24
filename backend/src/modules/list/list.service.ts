import { createListResponseDto, getListsByBoardResponseDto } from "./list.dto";
import {
  createList,
  findListsByBoard,
  getLastListOrder,
  getNeighboursOfList,
  updateListOrder,
  updateListOrderBulk,
} from "./list.model";
import { createListDto, updateListOrderDto } from "./list.validation";

// item.service.ts

type createListServiceProps = createListDto & { boardId: string };
export const createListService = async ({
  boardId,
  title,
}: createListServiceProps): Promise<createListResponseDto> => {
  const lastListOrder = await getLastListOrder(boardId);

  const newOrder = lastListOrder + 1000;

  const result = await createList({
    title,
    order: newOrder,
    board: { id: boardId },
  });
  const finalResult = {
    title: result.title,
    id: result.id,
    order: result.order,
  };

  return {
    success: true,
    message: "List Created Successfully",
    data: finalResult,
  };
};

export const getListsByBoardService = async (
  boardId: string,
): Promise<getListsByBoardResponseDto> => {
  const result = await findListsByBoard(boardId);

  const finalResult = result.map((item) => {
    return { id: item.id, order: item.order, title: item.title };
  });

  return {
    success: true,
    message: "List fetched Successfully",
    data: finalResult,
  };
};

type updateListOrderServiceProps = updateListOrderDto & { boardId: string };

export const updateListOrderService = async ({
  id,
  prevId,
  nextId,
  boardId,
}: updateListOrderServiceProps) => {
  const { prev, next } = await getNeighboursOfList({ prevId, nextId });

  let newOrder: number;

  if (!prev && next) {
    newOrder = next.order - 1000;
  } else if (prev && !next) {
    newOrder = prev.order + 1000;
  } else if (prev && next) {
    // gap check
    if (next.order - prev.order < 1) {
      await renormalizeOrders(boardId);
      const { prev: refreshedPrev, next: refreshedNext } =
        await getNeighboursOfList({ prevId, nextId });

      newOrder = (refreshedPrev!.order + refreshedNext!.order) / 2;
    } else {
      newOrder = (prev.order + next.order) / 2;
    }
  } else {
    newOrder = 1000;
  }

  await updateListOrder({ id, newOrder });
  const result = { id, order: newOrder };

  return {
    success: true,
    message: "List order changed Successfully",
    data: result,
  };
};

const renormalizeOrders = async (boardId: string) => {
  const lists = await findListsByBoard(boardId);

  const updates = lists?.map((item, index) => ({
    id: item.id,
    order: (index + 1) * 1000,
  }));

  await updateListOrderBulk(updates);
};
