import { ApiResponse } from "../../types";

interface getWorkspacesResponse {
  name: string;
  id : string
}
export type getWorkspacesResponseDto = ApiResponse<getWorkspacesResponse[]>;

interface createWorkspaceResponse {
  name: string;
  id : string
}

export type createWorkspacesResponseDto = ApiResponse<
  createWorkspaceResponse
>;
