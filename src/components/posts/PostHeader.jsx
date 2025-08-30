import { Avatar, Card, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate } from "../../lib/formateDate";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PostHeader({
  post,
  comment,
  isComment = false,
  setEditPost,
}) {
  const { userData } = useContext(AuthContext);
  const { _id: postId, body, image, user, createdAt } = post || {};
  const {
    photo,
    name,
    _id: userId,
  } = isComment ? comment?.commentCreator || {} : user || {};
  const commentId = comment?._id;
  const commentContent = comment?.content;
  const commentCreatedAt = comment?.createdAt;
  const queryClient = useQueryClient();

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success(`${isComment ? "Comment" : "Post"} deleted successfully`, {
        theme: "dark",
        autoClose: 2000,
      });

      queryClient.invalidateQueries(["details-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: (err) => {
      toast.error(`${isComment ? `You are not allowed to perform this action.` : `${err.response.data.error}`}`, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });
  // const { mutate: handleEditPost } = useMutation({
  //   mutationFn: editPost,
  //   onSuccess: () => {
  //     console.log('edit post');

  //     // setEditPost(postId);

  //   },
  //   onError: (err) => {
  //     toast.error(err.response.data.error, {
  //       theme: "dark",
  //       autoClose: 2000,
  //     });
  //   },
  // });

  // async function editPost() {
  //   return await axios.put(
  //     `${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {body, image},
  //     {
  //       headers: { token: localStorage.getItem("token") },
  //     }
  //   );
  // }

  async function deletePost() {
    const endPoint = isComment ? "comments" : "posts";
    const idToDelete = isComment ? commentId : postId;
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}/${idToDelete}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  const content = (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center">
          <picture>
            <Avatar
              img={
                !photo?.includes("undefined")
                  ? photo
                  : `${
                      import.meta.env.VITE_BASE_URL
                    }/uploads/default-profile.png`
              }
              alt="profile-person"
              className="me-4"
              rounded
            />
          </picture>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h2>
            <span>{formatDate(createdAt || commentCreatedAt)}</span>
          </div>
        </div>

        <div className="flex justify-end">
          {userData?._id === userId && (
            <Dropdown
              inline
              arrowIcon={false}
              label={
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              }
            >
              <DropdownItem
                onClick={() => setEditPost(userId)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </DropdownItem>
              <DropdownItem
                onClick={() => handleDeletePost()}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </header>
      <p
        className={`font-normal text-gray-700 dark:text-gray-200 truncate ${
          isComment ? "ps-16" : ""
        }`}
      >
        {body || commentContent}
      </p>
    </>
  );

  return isComment ? <Card>{content}</Card> : content;
}
