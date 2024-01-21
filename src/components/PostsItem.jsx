import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useGetReadingTime } from "../hooks/useGetReadingTime";
import { useGetFormattedDate } from "../hooks/useGetPostCreatedDate";

const PostsItem = ({ post }) => {
  const readingTime = useGetReadingTime(post?.body);
  const postCreatedDate = useGetFormattedDate(post?.created_date);

  return (
    <div className="posts-item flex flex-col w-full">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src={post?.user?.profile_image?.thumbnail}
            alt=""
          />
          <span className="text-gray-950">{post?.user?.name}</span>
        </div>
        <span className="text-gray-500">&#183;</span>
        <Link to={`posts/${post.id}`}>
          <span className="text-gray-500">{postCreatedDate}</span>
        </Link>
      </div>

      <Link to={`posts/${post.id}`} className="mt-3">
        <div className="flex flex-col gap-2 cursor-pointer">
          <span className="text-xl font-bold">{post.title}</span>
          <div>
            <p className="h-full max-h-24 text-ellipsis overflow-y-hidden text-base">
              {post.body.substr(0, 250)}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-6">
        <span className="text-neutral-500">{readingTime} min read</span>
        <BookmarkIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" />
        {/* <BookmarkSlashIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default PostsItem;
