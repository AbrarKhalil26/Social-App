import { Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import CreateComment from "./CreateComment";

export default function PostItem({
  post,
  setEditPost,
  showAllComments = false,
}) {
  const { _id, image, comments } = post;

  return (
    <Card>
      <PostHeader post={post} setEditPost={setEditPost} />
      {image && (
        <img src={image} alt="post img" className="h-96 object-contain" />
      )}

      <footer className="flex justify-evenly text-2xl mt-2">
        <AiFillLike />

        <Link
          className="flex gap-3 items-center cursor-pointer"
          to={`/posts/details/${_id}`}
        >
          <FaComment />
          <span className="text-xl">{comments.length}</span>
        </Link>
      </footer>

      {comments && comments.length > 0 && showAllComments
        ? comments.map((comment) => (
            <PostHeader key={comment._id} comment={comment} isComment />
          ))
        : comments[0]?.commentCreator && (
            <PostHeader comment={comments[comments.length-1]} isComment />
          )}
      <CreateComment post={_id} />
    </Card>
  );
}
