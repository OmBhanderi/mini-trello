"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LogoutConfirmModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 🔥 refresh workspace list
      queryClient.invalidateQueries({ queryKey: ["logout"] });
      onClose();
    },
  });

  const onConfirm = () => {
    mutation.mutate();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-3">Confirm Logout</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={mutation.isPending}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={mutation.isPending}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
