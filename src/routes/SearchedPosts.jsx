import { useEffect } from "react";
import PostsList from "../components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAllPosts } from "../store/slices/postsSlice";
import { useSearchParams } from "react-router-dom";

const SearchedPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.status);
  const postsError = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(getPosts(query));
  }, [query]);

  return (
    <div className='container'>
      <div className='pt-16 pb-16'>
        <h1 className='text-gray-500 text-5xl font-semibold mb-16'>
          Results for <span className='text-gray-950'>{query}</span>
        </h1>
        {posts.length !== 0 ? (
          <PostsList posts={posts} status={postsStatus} error={postsError} />
        ) : (
          <div className='flex flex-col text-gray-950 text-base'>
            <span>Make sure all words are spelled correctly.</span>
            <span>Try different keywords.</span>
            <span>Try more general keywords.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchedPosts;
