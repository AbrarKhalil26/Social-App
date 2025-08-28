import CreatePost from "../../components/posts/CreatePost";
import PostsList from "../../components/posts/PostsList";

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto my-6">
      <CreatePost />
      <PostsList />
    </div>
  );
}
