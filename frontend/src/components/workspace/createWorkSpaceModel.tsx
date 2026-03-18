"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspaceApi } from "@/src/services/workspace";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const schema = z.object({
  name: z.string().min(2, "Minimum 2 characters"),
});
export type CreateWorkspaceModalFormData = z.infer<typeof schema>;

const CreateWorkspaceModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkspaceModalFormData>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createWorkspaceApi,
    onSuccess: () => {
      // 🔥 refresh workspace list
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      reset();
      onClose();
    },
  });

  const onSubmit = (data: CreateWorkspaceModalFormData) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create Workspace</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Workspace Name</label>
            <input
              autoFocus
              {...register("name", {
                required: "Workspace name is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
              })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workspace name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
