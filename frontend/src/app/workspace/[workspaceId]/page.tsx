"use client";

import { useParams, useRouter } from "next/navigation";
import BoardCard from "@/src/components/Board/Board";
import CreateBoardCard from "@/src/components/Board/CreateBoardCard";
import { Skeleton } from "@/src/components/ui/skeleton";
import UserLayout from "@/src/components/layout/userLayout";
import { useQuery } from "@tanstack/react-query";
import { getBoardsByWorkspaceIdApi } from "@/src/services/board";
import CreateBoardModal from "@/src/components/Board/CreateBoardModal";
import { useState } from "react";

const WorkspacePage = () => {
  const router = useRouter();
  const params = useParams();
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const workspaceId = params.workspaceId as string;

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["boards",workspaceId],
    queryFn: () => getBoardsByWorkspaceIdApi(workspaceId),
  });

  const handleOpenBoard = (boardId: string) => {
    router.push(`/board/${boardId}`);
  };

  const handleCreateBoard = () => setIsCreateBoardModalOpen(true);
  const handleCloaseModal = () => setIsCreateBoardModalOpen(false);

  return (
    <UserLayout>
      <h1 className="text-2xl font-semibold mb-6">Workspace Boards</h1>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && <p className="text-red-500">Failed to load boards</p>}

      {/* Boards */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-3 gap-4">
          {boards.data?.map((board: { id: string; title: string }) => (
            <BoardCard
              key={board.id}
              title={board.title}
              onClick={() => handleOpenBoard(board.id)}
            />
          ))}

          <CreateBoardCard onClick={handleCreateBoard} />
        </div>
      )}

      <CreateBoardModal
        isOpen={isCreateBoardModalOpen}
        onClose={handleCloaseModal}
        workspaceId={workspaceId}
      />
    </UserLayout>
  );
};

export default WorkspacePage;
