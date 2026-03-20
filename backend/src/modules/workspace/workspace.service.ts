import {
  createWorkspacesResponseDto,
  getWorkspacesResponseDto,
} from "./workspace.dto";
import { createWorkspace, findWorkspacesByUser } from "./workspace.model";
import { CreateWorkspaceDto } from "./workspace.validation";

type finalCreateWorkSpaceDto = CreateWorkspaceDto & { userId: string };

export const createWorkspaceService = async (
  data: finalCreateWorkSpaceDto,
): Promise<createWorkspacesResponseDto> => {
  const { name, userId } = data;
  if (!name) throw new Error("Workspace name required");

  const result = await createWorkspace({
    name,
    ownerId: userId,
  });

  return {
    success: true,
    message: "Workspace created successfully",
    data: {name : result.name,id: result.id},
  };
};

export const getUserWorkspacesService = async (
  userId: string,
): Promise<getWorkspacesResponseDto> => {
  const result = await findWorkspacesByUser(userId);
  const resultArr = result.map((w) => ({ name: w.name, id: w.id }));
  return {
    success: true,
    message: "Workspace fetch successfully",
    data: resultArr,
  };
};
