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
