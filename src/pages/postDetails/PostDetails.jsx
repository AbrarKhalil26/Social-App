import { useParams } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import Loader from "../../components/shared/Loader";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";

export default function PostDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetch(
    ["details-post", id],
    `/posts/${id}`, {select: (data) => data.data}
  );
  
  return (
    <>
      <Helmet>
        <title>Kudo | Post: details</title>
      </Helmet>
      <div className="max-w-3xl mx-auto my-6">
        {isError && <p>Error: {error.message}</p>}
        {isLoading && <Loader />}
        {data?.post && (
          <PostItem post={data.post} key={data.post.id} showAllComments={true} />
        )}
      </div>
    </>
  );
}
