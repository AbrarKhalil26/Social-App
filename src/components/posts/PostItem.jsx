import { Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardHeader from "./CardHeader";
import CreateComment from "../comment/CreateComment";
import CommentItem from "../comment/CommentItem";
import { useState } from "react";
import Model from "../shared/Model"
import EditPost from "./EditPost";

export default function PostItem({ post, showAllComments = false }) {
  const { _id, body, image, comments } = post;
  const [editPost, setEditPost] = useState(false);
  return (
    <>
      <Card>
        <CardHeader post={post} setEditPost={setEditPost} />
        <p className={`font-normal text-gray-700 dark:text-gray-200 truncate `}>
          {body}
        </p>
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
              <CommentItem key={comment._id} comment={comment} />
            ))
          : comments[0]?.commentCreator && (
              <CommentItem comment={comments[comments.length - 1]} isComment />
            )}
        <CreateComment post={_id} />
      </Card>
      {editPost && (
        <Model openModal={editPost} setOpenModal={setEditPost}>
          <EditPost postId={_id} body={body} image={image} setEditPost={setEditPost}/>
        </Model>
      )}
    </>
  );
}
