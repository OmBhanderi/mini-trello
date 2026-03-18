import { User } from "@/src/types";

type Props = {
  user: User;
  hasWorkspaces: boolean;
  onCreateWorkspace: () => void;
};

const WelcomeState = ({ user, hasWorkspaces, onCreateWorkspace }: Props) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          👋 Welcome, {user.name}
        </h1>

        {hasWorkspaces ? (
          <p className="text-gray-600 mb-6">
            Select a workspace from the sidebar or create a new one
          </p>
        ) : (
          <p className="text-gray-600 mb-6">
            You don’t have any workspaces yet. Create your first workspace to get started.
          </p>
        )}

        <button
          onClick={onCreateWorkspace}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          + Create Workspace
        </button>
      </div>
    </div>
  );
};

export default WelcomeState;