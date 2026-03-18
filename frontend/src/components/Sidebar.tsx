"use client";

import { User, Workspace } from "@/src/types";

type Props = {
  user: User;
  yourWorkspaces: Workspace[];
  joinedWorkspaces: Workspace[];
  onSelectWorkspace: (id: string) => void;
  onCreateWorkspace: () => void;
  onLogout: () => void;
};

const Sidebar = ({
  yourWorkspaces,
  joinedWorkspaces,
  onSelectWorkspace,
  onCreateWorkspace,
  onLogout,
}: Props) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div className="p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">📁 Workspaces</h2>

        {/* Your Workspaces */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">Your Workspaces</p>
          {yourWorkspaces.map((ws) => (
            <div
              key={ws.id}
              onClick={() => onSelectWorkspace(ws.id)}
              className="p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              {ws.name}
            </div>
          ))}
        </div>

        {/* Joined Workspaces */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">Joined Workspaces</p>
          {joinedWorkspaces.map((ws) => (
            <div
              key={ws.id}
              onClick={() => onSelectWorkspace(ws.id)}
              className="p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              {ws.name}
            </div>
          ))}
        </div>

        {/* Create Workspace */}
        <button
          onClick={onCreateWorkspace}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          + Create Workspace
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
