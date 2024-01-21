import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPostById,
  selectSinglePost,
} from "../store/slices/posts/postsSlice";
import { useGetReadingTime } from "../hooks/useGetReadingTime";
import { useGetFormattedDate } from "../hooks/useGetPostCreatedDate";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
// import { Tooltip } from "antd";

const SinglePostPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const post = useSelector(selectSinglePost);
  const postStatus = useSelector((state) => state.posts.post.status);

  const readingTime = useGetReadingTime(post?.body);
  const postCreatedDate = useGetFormattedDate(post?.created_date);

  useEffect(() => {
    dispatch(getPostById(id));
  }, []);

  return (
    <div className="pt-20">
      {postStatus === "loading" ? (
        <div className="loader w-14 p-2 rounded-full bg-indigo-600"></div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold">{post.title}</h1>

          <div className="flex gap-3 mt-8">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={post?.user?.profile_image?.thumbnail}
              alt=""
            />
            <div>
              <span className="text-gray-950 text-base font-bold">
                {post?.user?.name}
              </span>
              <div className="flex gap-1 text-gray-700">
                <span>{readingTime} min read</span>
                <span>&#183;</span>
                <span>{postCreatedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12 border-t-2 border-b-2 border-gray-100 py-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                {/* <Tooltip placement="top" title="Like"> */}
                <HandThumbUpIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
                {/* </Tooltip> */}
                <span className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer">
                  1.1K
                </span>
              </div>
              <div className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 cursor-pointer">
                <ChatBubbleOvalLeftIcon className="h-5 w-5 ease-in duration-100" />
                <span className="text-xs font-semibold">23</span>
              </div>
            </div>
            <BookmarkIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;
