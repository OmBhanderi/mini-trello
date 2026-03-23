import { AppDataSource } from "../../config/data-source";
import { Board } from "./board.entity";

const boardRepo = AppDataSource.getRepository(Board);
type createBoardProps = {
  title: string;
  description: string | undefined;
  workSpaceId: string;
};

export const createBoard = (data: createBoardProps) => {
  return boardRepo.save({
    title: data.title,
    description: data.description,
    workspace: { id: data.workSpaceId },
  });
};

export const findBoardsByWorkspace = (workSpaceId: string) => {
  return boardRepo.find({
    where: {
      workspace: { id: workSpaceId },
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
    order: {
      createdAt: "ASC",
    },
  });
};

// export const getLastBoardOrder = async (workspaceId: string) => {
//   const lastBoard = await boardRepo.findOne({
//     where: { workspace: { id: workspaceId } },
//     order: { createdAt: "ASC",},
//   });

//   return lastBoard?.order ?? 0;
// };
