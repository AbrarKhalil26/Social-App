import axios from "axios";
import { Card, Label, Textarea } from "flowbite-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppButton from "../shared/AppButton";

export default function CreatePost() {
  const fileInputRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm( {mode: "onChange"});
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      reset();
      toast.success("Post created Successfully", {
        theme: "dark",
        autoClose: 2000,
      });
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: (err) => {
      toast.error(err.response.data.error, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });

  async function addPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current?.files[0]);
    }
    return await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }
  
  return (
    <Card className=" ">
      <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
        <div className="mb-2 block">
          <Label htmlFor="comment" className="text-xl">
            Create Post
          </Label>
        </div>
        <div className="flex gap-4 items-center">
          <Textarea
            id="comment"
            placeholder="Leave a comment..."
            rows={4}
            {...register("body", { required: true })}
          />
          <input
            {...register("image")}
            type="file"
            ref={fileInputRef}
            className="hidden"
          />
          <AiOutlineCloudUpload
            onClick={() => fileInputRef.current.click()}
            className="text-3xl cursor-pointer"
          />
        </div>
        <AppButton
          isLoading={isPending}
          disabled={!isValid || isPending}
          type="submit"
        >
          Create Post
        </AppButton>
      </form>
    </Card>
  );
}
