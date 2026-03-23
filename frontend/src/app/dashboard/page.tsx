"use client";
import UserLayout from "@/src/components/layout/userLayout";

const DashboardPage = () => {
  return (
    <UserLayout>
      {/* <WelcomeState
        user={user}
        hasWorkspaces={hasWorkspaces}
        onCreateWorkspace={handleCreateWorkspace}
      /> */}
      <div
        className="
      flex justify-center items-center h-screen bg-gray-300"
      >
        <div>Choose Any WorkSpace Or create a new one</div>
      </div>
    </UserLayout>
  );
};

export default DashboardPage;
