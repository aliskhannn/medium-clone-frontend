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
import SinglePostPageSkeleton from "../components/UI/skeleton/SinglePostPageSkeleton";
import { Tooltip } from "antd";
import Output from "editorjs-react-renderer";

const styles = {
  paragraph: {
    fontSize: "18px",
    margin: "25px 0",
  },
  list: {
    listItem: {
      fontSize: "18px",
      marginLeft: "30px"
    },
  },
};

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
    <div className="post-page">
      <div className="container">
        <div className="py-20">
          {postStatus === "loading" ? (
            <SinglePostPageSkeleton />
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

              <div className="flex justify-between my-8 border-t-2 border-b-2 border-gray-100 py-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Tooltip placement="top" title="Like" mouseEnterDelay={0.5}>
                      <HandThumbUpIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="View likes"
                      mouseEnterDelay={0.5}
                    >
                      <span className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer">
                        1.1K
                      </span>
                    </Tooltip>
                  </div>
                  <Tooltip
                    placement="top"
                    title="Respond"
                    mouseEnterDelay={0.5}
                  >
                    <div className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 cursor-pointer">
                      <ChatBubbleOvalLeftIcon className="h-5 w-5 ease-in duration-100" />
                      <span className="text-xs font-semibold">23</span>
                    </div>
                  </Tooltip>
                </div>
                <Tooltip placement="top" title="Save" mouseEnterDelay={0.5}>
                  <BookmarkIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
                </Tooltip>
              </div>

              <div className="post-page-content">
                <Output data={post.body} style={styles} />
              </div>

              <div className="flex justify-between mt-8 border-t-2 border-b-2 border-gray-100 py-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Tooltip placement="top" title="Like" mouseEnterDelay={0.5}>
                      <HandThumbUpIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      title="View likes"
                      mouseEnterDelay={0.5}
                    >
                      <span className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer">
                        1.1K
                      </span>
                    </Tooltip>
                  </div>
                  <Tooltip
                    placement="top"
                    title="Respond"
                    mouseEnterDelay={0.5}
                  >
                    <div className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 cursor-pointer">
                      <ChatBubbleOvalLeftIcon className="h-5 w-5 ease-in duration-100" />
                      <span className="text-xs font-semibold">23</span>
                    </div>
                  </Tooltip>
                </div>
                <Tooltip placement="top" title="Save" mouseEnterDelay={0.5}>
                  <BookmarkIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
