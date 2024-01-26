import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAllPosts } from "../store/slices/posts/postsSlice";
import PostsItem from "./PostsItem";
import "react-loading-skeleton/dist/skeleton.css";
import PostSkeleton from "./UI/skeleton/PostSkeleton";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.posts.status);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(getPosts());
    }
  }, []);

  // <div className="loader w-14 p-2 rounded-full bg-indigo-600"></div>

  return (
    <div className="container">
      <div className="flex justify-center">
        {postsStatus === "loading" ? (
          <div className="flex items-center flex-col gap-12 w-full">
            {[...Array(1, 2, 3)].map((n) => (
              <PostSkeleton key={n} />
            ))}
          </div>
        ) : (
          <ul className="posts-list flex items-center flex-col gap-12">
            {posts.map((post) => (
              <PostsItem key={post.id} post={post} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostsList;
