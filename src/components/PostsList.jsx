import PostsItem from "./PostsItem";
import "react-loading-skeleton/dist/skeleton.css";
import PostSkeleton from "./UI/skeleton/PostSkeleton";

const PostsList = ({ posts, status, error }) => {
  // <div className="loader w-14 p-2 rounded-full bg-indigo-600"></div>

  return (
    <div className="flex justify-center">
      {status === "loading" ? (
        <div className="flex items-center flex-col gap-12 w-full">
          {[...Array(1, 2, 3)].map((n) => (
            <PostSkeleton key={n} />
          ))}
        </div>
      ) : status === "succeeded" ? (
        <ul className="posts-list flex items-center flex-col gap-12 w-full">
          {posts.map((post) => (
            <PostsItem key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default PostsList;
