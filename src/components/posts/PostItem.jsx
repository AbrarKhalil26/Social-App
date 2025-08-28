import { Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
// import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";

export default function PostItem({ post, showAllComments = false }) {
  const { _id, body, image, user, createdAt, comments } = post;

  return (
    <Card>
      <PostHeader user={{ ...user, createdAt, body }} />

      {image && <img src={image} alt="post img" className="h-96 object-contain" />}

      <footer className="flex justify-evenly text-2xl mt-2">
        <AiFillLike />

        <Link className="flex gap-3 items-center cursor-pointer" to={`/posts/details/${_id}`}>
          <FaComment />
          <span className="text-xl">{comments.length}</span>
        </Link>
      </footer>

      {comments && comments.length > 0 && showAllComments
        ? comments.map((comment) => (
            <PostHeader
              key={comment._id}
              user={{
                ...comment.commentCreator,
                createdAt: comment.createdAt,
                body: comment.content,
              }}
              isComment
            />
          ))
        : comments[0]?.commentCreator && (
            <PostHeader
              user={{
                ...comments[0].commentCreator,
                createdAt: comments[0].createdAt,
                body: comments[0].content,
              }}
              isComment
            />
          )}
      {comments && comments.length > 0 && (
        <Link
          to={`/posts/details/${_id}`}
          className="text-sm text-green-400 ms-auto me-4"
        >
          View All Comments
        </Link>
      )}
    </Card>
  );
}
