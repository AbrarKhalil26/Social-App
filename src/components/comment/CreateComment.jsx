import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton";

export default function CreateComment({ post }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      reset();
      toast.success("Comment created Successfully", {
        theme: "dark",
        autoClose: 2000,
      });
      queryClient.invalidateQueries(["details-posts", post]);
      queryClient.invalidateQueries(["user-posts", post]);
      queryClient.invalidateQueries(["all-posts", post]);
    },
    onError: (err) => {
      toast.error(err.response.data.error, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });

  async function addComment(data) {
    return await axios.post(
      `${import.meta.env.VITE_BASE_URL}/comments`,
      { ...data, post },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
        <Textarea
          {...register("content", { required: true })}
          id="comment"
          placeholder="Leave a comment..."
          rows={2}
        />
        <AppButton
          isLoading={isPending}
          disabled={!isValid || isPending}
          type="submit"
        >
          Create Comment
        </AppButton>
      </form>
    </div>
  );
}
