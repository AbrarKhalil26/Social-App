import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../shared/Loader";

export default function PostsList({ isProfile = true }) {
  const { token, userData } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  async function getPosts() {
    return await axios.get(
      `${import.meta.env.VITE_BASE_URL}${
        isProfile ? `/users/${userData?._id}`:``
      }/posts?limit=50${isProfile ? `` : `&sort=-createdAt`}`,
      { headers: { token } }
    );
  }

  return (
    <div className="py-12">
      <div className="flex flex-col gap-4">
        {isError && <p>Error: {error.message}</p>}
        {isLoading && <Loader />}
        {data &&
          data.data.posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
}
