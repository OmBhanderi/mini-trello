import { CreateWorkspaceModalFormData } from "../components/workspace/createWorkSpaceModel";
export const createWorkspaceApi = async (data: CreateWorkspaceModalFormData) => {
  // replace with your real API
  const res = await fetch("/api/workspaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create workspace");
  }

  return res.json();
};
