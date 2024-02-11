import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAllPosts } from "../store/slices/posts/postsSlice";
import PostsList from "../components/PostsList";

const DefaultPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.posts.status);
  const postsError = useSelector((state) => state.posts.posts.error);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(getPosts());
    }
  }, []);

  return (
    <div className="container">
      <div className="pt-16 pb-16">
        <PostsList posts={posts} status={postsStatus} error={postsError} />
      </div>
    </div>
  );
};

export default DefaultPosts;
