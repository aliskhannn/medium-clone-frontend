import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAllPosts } from "../store/slices/PostsSlice";
import PostsItem from "./PostsItem";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(getPosts());
    }
    console.log(posts);
  }, [posts, postsStatus, dispatch]);

  return (
    <div className="flex items-center">
      <ul className="flex items-center flex-col gap-12">
        {posts.map((post) => (
          <PostsItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
