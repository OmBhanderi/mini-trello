"use client";
import { useRouter } from "next/navigation";
import { User, Workspace } from "@/src/types";
import Sidebar from "../Sidebar";
import CreateWorkspaceModal from "../workspace/createWorkSpaceModel";
import { useState } from "react";
import LogoutConfirmModal from "../confirmLogOutModal";
import { useQuery } from "@tanstack/react-query";
import { getWorkSpaceApi } from "@/src/services/workspace";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogOutConfirmModalOpen, setIsLogOutConfirmModalOpen] =
    useState(false);
  const { data, isLoading, isError } = useQuery({
    queryFn: getWorkSpaceApi,
    queryKey: ["workspace"],
    staleTime: Infinity,
  });
  const router = useRouter();
  const yourWorkspaces = data?.data;

  // const yourWorkspaces: Workspace[] = [
  //   { id: "1", name: "Personal", ownerId: "1" },
  // ];

  const user: User = {
    id: "1",
    name: "Om",
    email: "om@example.com",
  };

  const joinedWorkspaces: Workspace[] = [
    { id: "2", name: "Team Project", ownerId: "2" },
  ];

  // 🔹 Handlers
  const handleSelectWorkspace = (id: string) => {
    router.push(`/workspace/${id}`);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenLogOutConfirmModal = () => setIsLogOutConfirmModalOpen(true);
  const handleCloseLogOutConfirmModal = () =>
    setIsLogOutConfirmModalOpen(false);

  // if (isLoading) return <div>Loading workspaces...</div>;
  // if (error) return <div>Failed to load workspaces</div>;

  return (
    <>
      <div>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar
            user={user}
            yourWorkspaces={yourWorkspaces}
            joinedWorkspaces={joinedWorkspaces}
            onSelectWorkspace={handleSelectWorkspace}
            onCreateWorkspace={handleOpenModal}
            onLogout={handleOpenLogOutConfirmModal}
            isLoading={isLoading}
            error={isError}
          />
          <div className="flex-1 bg-gray-100 pt-10 px-15">{children}</div>

          <CreateWorkspaceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />

          <LogoutConfirmModal
            isOpen={isLogOutConfirmModalOpen}
            onClose={handleCloseLogOutConfirmModal}
          />
        </div>
      </div>
    </>
  );
}
