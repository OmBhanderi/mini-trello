import { API } from ".";

export async function getBoardsByWorkspaceIdApi(workspaceId : string) {
  const res = await API.get(`/${workspaceId}/boards`);
  return res.data;
}

export async function createBoardApi({workspaceId ,data}:{workspaceId :string,data :{
  title: string,
  description ?: string 
}}) {
  const res = await API.post(`/${workspaceId}/boards`,data);
  return res.data;
}