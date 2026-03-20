import { logInSchema } from "../app/page";
import { signUpSchema } from "../app/signup/page";
import { API } from "../services/index";

export const signupApi = async (data: signUpSchema) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

export const loginApi = async (data: logInSchema) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};;


export const logout = async () => {
  // replace with your real API
  const res = await fetch("/api/workspaces", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to LogOut");
  }

  return res.json();
};
