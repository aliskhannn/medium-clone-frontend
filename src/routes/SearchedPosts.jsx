import { useEffect } from "react";
import PostsList from "../components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsByQuery,
  selectAllSearchedPosts,
} from "../store/slices/posts/postsSlice";
import { useSearchParams } from "react-router-dom";

const SearchedPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");

  const dispatch = useDispatch();
  const searchedPosts = useSelector(selectAllSearchedPosts);
  const searchedPostsStatus = useSelector(
    (state) => state.posts.searchedPosts.status
  );
  const searchedPostsError = useSelector(
    (state) => state.posts.searchedPosts.error
  );

  useEffect(() => {
    dispatch(getPostsByQuery(query));
  }, [query]);

  return (
    <div className="container">
      <div className="pt-16 pb-16">
        <h1 className="text-gray-500 text-5xl font-semibold mb-16">
          Results for <span className="text-gray-950">{query}</span>
        </h1>
        <PostsList
          posts={searchedPosts}
          status={searchedPostsStatus}
          error={searchedPostsError}
        />
      </div>
    </div>
  );
};

export default SearchedPosts;
