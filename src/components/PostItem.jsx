import { BookmarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Avatar, Tooltip } from "antd";
import {
  createPreview,
  formatDate,
  getReadingTime,
  stripHtml,
} from "../utils/postItemHelpers";

const PostItem = ({ post }) => {
  const readingTime = getReadingTime(post?.content?.blocks);
  const postCreatedDate = formatDate(post?.createdAt);
  const preview = createPreview(post?.content.blocks, 300);
  const previewContent = stripHtml(preview);

  return (
    <div className='posts-item flex flex-col w-full'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <Avatar
            src={post?.author?.avatarUrl}
            size={24}
            icon={<UserIcon className='h-3 w-3' />}
            className='flex items-center justify-center shrink-0'
          />
          <span className='text-gray-950'>{post?.author?.fullName}</span>
        </div>
        <span className='text-gray-500'>&#183;</span>
        <Link to={`/${post._id}`}>
          <span className='text-gray-500'>{postCreatedDate}</span>
        </Link>
      </div>

      <Link to={`/${post._id}`} className='mt-3'>
        <div className='flex flex-col gap-2 cursor-pointer'>
          <span className='text-xl font-bold'>{post.title}</span>
          <p className='post-content h-full max-h-24 overflow-hidden text-base'>
            {previewContent}
          </p>
        </div>
      </Link>

      <div className='flex items-center justify-between mt-6'>
        <span className='text-neutral-500'>{readingTime} min read</span>
        <Tooltip placement='top' title='Save' mouseEnterDelay={0.5}>
          <BookmarkIcon className='h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer' />
          {/* <BookmarkSlashIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer" /> */}
        </Tooltip>
      </div>
    </div>
  );
};

export default PostItem;
