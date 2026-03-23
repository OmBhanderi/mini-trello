import { CreateWorkspaceModalFormData } from "../components/workspace/createWorkSpaceModel";
import { API } from "../services/index";

export async function getWorkSpaceApi() {
  const res = await API.get("/workspace/");
  return res.data;
}

export async function createWorkspaceApi(data: CreateWorkspaceModalFormData) {
  const res = await API.post("/workspace/", data);
  return res.data
}
