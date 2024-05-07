import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAllPosts } from "../store/slices/postsSlice";
import PostsList from "../components/PostsList";
import PostSkeleton from "../components/UI/skeleton/PostSkeleton";

const DefaultPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className='container'>
      <div className='pt-16 pb-16'>
        {status === "loading" ? (
          <div className='flex items-center flex-col gap-12 w-full'>
            {[...Array(1, 2, 3)].map((n) => (
              <PostSkeleton key={n} />
            ))}
          </div>
        ) : (
          <PostsList posts={posts} error={error} />
        )}
      </div>
    </div>
  );
};

export default DefaultPosts;
