import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoardApi } from "@/src/services/board";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
};

const createBoardModalShcema = z.object({
  title: z.string().min(2),

  description: z
    .string()
    .min(5, "Description too short")
    .max(500, "Description too long")
    .optional(),
});

export type createBoardModalInputT = z.infer<typeof createBoardModalShcema>;
const CreateBoardModal = ({ isOpen, onClose, workspaceId }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createBoardModalInputT>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver : zodResolver(createBoardModalShcema)
  });

  const mutation = useMutation({
    mutationFn: createBoardApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards", workspaceId],
      });

      reset();
      onClose();
    },
  });

  const onSubmit = (data: createBoardModalInputT) => {
    mutation.mutate({
      workspaceId,
      data,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Input
              placeholder="Board title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Textarea
              placeholder="Description (optional)"
              {...register("description")}
            />
          </div>

          {/* Error */}
          {mutation.isError && (
            <p className="text-red-500 text-sm">
              {(mutation.error as Error).message}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardModal;
