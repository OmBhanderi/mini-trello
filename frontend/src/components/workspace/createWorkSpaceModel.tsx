"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspaceApi } from "@/src/services/workspace";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog,DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      reset();
      onClose();
    },
  });

  const onSubmit = (data: CreateWorkspaceModalFormData) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Workspace Name</Label>
            <Input
              autoFocus
              placeholder="Enter workspace name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>)
};

export default CreateWorkspaceModal;
