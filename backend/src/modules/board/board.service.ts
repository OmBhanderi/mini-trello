import {
  createBoardResponseDto,
  getBoardsByWorkSpaceResponseDto,
} from "./board.dto";
import { createBoard, findBoardsByWorkspace } from "./board.model";
import { createBoardDto } from "./board.validation";

type finalCreateBoardDto = createBoardDto & { workSpaceId: string };
export const createBoardService = async (
  data: finalCreateBoardDto,
): Promise<createBoardResponseDto> => {
  const { title, description, workSpaceId } = data;
  if (!title) throw new Error("Board title required");
  const result = await createBoard({
    title,
    workSpaceId: workSpaceId,
    description,
  });
  const finalResult = {
    title: result.title,
    description: result.description,
  };

  return {
    success: true,
    message: "Board created successfully",
    data: finalResult,
  };
};

export const getBoardsByWorkspaceService = async (
  workSpaceId: string,
): Promise<getBoardsByWorkSpaceResponseDto> => {
  const result = await findBoardsByWorkspace(workSpaceId);
  return {
    success: true,
    message: "Boards fetched successfully",
    data: result,
  };
};
