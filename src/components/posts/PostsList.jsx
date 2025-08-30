import PostItem from "./PostItem";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../shared/Loader";
import useFetch from "../../hooks/useFetch";

export default function PostsList({ setEditPost, isProfile = true }) {
  const { userData } = useContext(AuthContext);
  const queryKey = isProfile ? ["all-posts"] : ["user-posts"];
  const endPoint = `${
    isProfile ? `/users/${userData?._id}` : ``
  }/posts?limit=50${isProfile ? `` : `&sort=-createdAt`}`;
  const { data, isLoading, isError, error } = useFetch(queryKey, endPoint, {
    enabled: !!userData,
  });

  return (
    <div className="py-12">
      <div className="flex flex-col gap-4">
        {isError && <p>Error: {error.message}</p>}
        {isLoading && <Loader />}
        {data &&
          data.posts.map((post) => <PostItem key={post.id} post={post} setEditPost={setEditPost}/>)}
      </div>
    </div>
  );
}
