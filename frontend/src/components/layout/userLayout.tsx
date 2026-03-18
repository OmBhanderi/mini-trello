"use client";

import { User, Workspace } from "@/src/types";
import Sidebar from "../Sidebar";
import CreateWorkspaceModal from "../workspace/createWorkSpaceModel";
import { useState } from "react";
import LogoutConfirmModal from "../confirmLogOutModal";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogOutConfirmModalOpen,setIsLogOutConfirmModalOpen] =useState(false);

  const user: User = {
    id: "1",
    name: "Om",
    email: "om@example.com",
  };

  const yourWorkspaces: Workspace[] = [
    { id: "1", name: "Personal", ownerId: "1" },
  ];

  const joinedWorkspaces: Workspace[] = [
    { id: "2", name: "Team Project", ownerId: "2" },
  ];

  // 🔹 Handlers
  const handleSelectWorkspace = (id: string) => {
    console.log("Navigate to workspace:", id);
    // router.push(`/workspace/${id}`);
  };


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenLogOutConfirmModal = () => setIsLogOutConfirmModalOpen(true);
  const handleCloseLogOutConfirmModal = () => setIsLogOutConfirmModalOpen(false);

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
          />
          <div className="flex-1 bg-gray-100">{children}</div>

          <CreateWorkspaceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />

          <LogoutConfirmModal isOpen={isLogOutConfirmModalOpen} onClose={handleCloseLogOutConfirmModal}/>
        </div>
      </div>
    </>
  );
}
