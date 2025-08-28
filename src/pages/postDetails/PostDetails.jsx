import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PostItem from "../../components/posts/PostItem";


export default function PostDetails() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: getPostDetails,
  });
  const {post } = data?.data || {};
  

  async function getPostDetails() {
    return await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
      headers: { token },
    });
  }
  return (
    <div className="max-w-3xl mx-auto my-6">
      {data?.data?.post && (
         <PostItem post={post} key={post.id} showAllComments={true}/>
      )}
    </div>
  );
}
