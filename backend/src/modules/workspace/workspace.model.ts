import { AppDataSource } from "../../config/data-source";
import { Workspace } from "./workspace.entity";

const workspaceRepo = AppDataSource.getRepository(Workspace);
type CreateWorkspaceProps = {
  name: string;
  ownerId: string;
};

export const createWorkspace = (data: CreateWorkspaceProps) => {
  return workspaceRepo.save({
    name: data.name,
    owner: { id: data.ownerId },
  });
};

export const findWorkspacesByUser = (userId: string) => {
  return workspaceRepo.find({
    where: {
      owner: { id: userId },
    },
    select: {
      name: true,
    },
    order: {
      createdAt: "DESC",
    },
  });
};
