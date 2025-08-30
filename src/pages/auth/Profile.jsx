import { useState } from "react";
import CreatePost from "../../components/posts/CreatePost";
import PostsList from "../../components/posts/PostsList";

export default function Profile() {
  const [editPost, setEditPost]  = useState(null);
  console.log(editPost);
  
  return (
    <div className="max-w-3xl mx-auto my-6">
      <CreatePost />
      <PostsList setEditPost={setEditPost}/>
    </div>
  );
}
