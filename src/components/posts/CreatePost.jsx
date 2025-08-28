import axios from "axios";
import { Button, Card, Label, Textarea } from "flowbite-react";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { token } = useContext(AuthContext);
  const fileInputRef = useRef();
  const { register, handleSubmit, reset } = useForm();

  async function addPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current?.files[0])
      formData.append("image", fileInputRef.current?.files[0]);
    try {
      const { data: message } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers: { token },
        }
      );
      if (message.message === "success") {
        reset();
        toast.success("Post created Successfully", {
          theme: "dark",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.response.data.error, {
        theme: "dark",
        autoClose: 2000,
      });
    }
  }
  return (
    <Card className=" ">
      <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-4">
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
            {...register("body")}
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
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}
