import CreatePost from "../../components/posts/CreatePost";
import PostsList from "../../components/posts/PostsList";
import { Helmet } from "react-helmet";

export default function Posts() {
  return (
    <>
      <Helmet>
        <title>Kudo | Post</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-5 my-6">
        <CreatePost />
        <PostsList isProfile={false} />
      </div>
    </>
  );
}
