import { AppDataSource } from "../../config/data-source";
import { List } from "./list.entity";

const listRepo = AppDataSource.getRepository(List);

type createListProps = {
  title: string;
  order: number;
  board: { id: string };
};

export const createList = async (data: createListProps) => {
  return await listRepo.save(data);
};

export const findListsByBoard = async (boardId: string) => {
  return await listRepo.find({
    where: { board: { id: boardId } },
    order: { order: "ASC" },
  });
};

export const getLastListOrder = async (boardId: string) => {
  const last = await listRepo.findOne({
    where: { board: { id: boardId } },
    order: { order: "DESC" },
  });

  return last?.order ?? 0;
};

export const getNeighboursOfList = async ({
  prevId,
  nextId,
}: {
  prevId: string | null;
  nextId: string | null;
}) => {
  const prev = prevId ? await listRepo.findOneBy({ id: prevId }) : null;
  const next = nextId ? await listRepo.findOneBy({ id: nextId }) : null;

  return { prev, next };
};

export const updateListOrder = async ({
  id,
  newOrder,
}: {
  id: string;
  newOrder: number;
}) => {
  return await listRepo.update(id, { order: newOrder });
};

type updates = {
  id: string;
  order: number;
};
export const updateListOrderBulk = async (updates: updates[]) => {
  await Promise.all(
    updates.map((item) =>listRepo.update(item.id, { order: item.order })),
  );
};
