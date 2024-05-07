import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid";
import { Avatar, Dropdown, Popover, Tooltip } from "antd";
import { removePost } from "../store/slices/postsSlice";
import useMessage from "../hooks/useMessage";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isAuthor } from "../utils/postItemHelpers";
import { PostContext } from "../routes/SinglePostPage";
import { selectUserData } from "../store/slices/authSlice";

const PostActionBar = ({ post, likesCount, likedByUser, handleLike, showDrawer }) => {
  const { respondsCount } = useContext(PostContext);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const navigate = useNavigate();

  const { success, error } = useMessage();
  const userIsAuthor = isAuthor(post?.author?._id, userData?.user?.id);

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this post?")) {
      dispatch(removePost(post._id))
        .then(() => {
          navigate("/");
          success("Post was successfully removed");
        })
        .catch((err) => {
          console.log(err);
          error("Failed to remove post");
        });
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={`/${post._id}/edit`}>
          <button>Edit post</button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={handleRemove} className='text-red-500'>
          Delete
        </button>
      ),
    },
  ];

  const likesList = (
    <div className='flex flex-col gap-3 max-h-64 overflow-auto likes-list py-4 px-4'>
      {post.likes.map((like) => (
        <div key={like.user._id} className='flex items-center gap-2'>
          <Avatar
            src={like.user.avatarUrl}
            size={24}
            icon={<UserIcon className='h-3 w-3' />}
            className='flex items-center justify-center shrink-0'
          />
          <span className='text-gray-950'>{like.user.fullName}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className='flex justify-between my-8 border-t-2 border-b-2 border-gray-100 py-4'>
      <div className='flex gap-4'>
        <div className='flex items-center gap-1'>
          <Tooltip placement='top' title='Like' mouseEnterDelay={0.4}>
            {likedByUser ? (
              <HandThumbUpSolidIcon
                onClick={() => handleLike(post._id)}
                className='h-5 w-5 text-neutral-900 ease-in duration-100 cursor-pointer'
              />
            ) : (
              <HandThumbUpIcon
                onClick={() => handleLike(post._id)}
                className='h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer'
              />
            )}
          </Tooltip>
          <Popover content={likesList} placement='bottom' trigger={["click"]} arrow={false}>
            <Tooltip placement='top' title='View likes' mouseEnterDelay={0.4}>
              <span className='text-xs font-semibold text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer'>
                {likesCount}
              </span>
            </Tooltip>
          </Popover>
        </div>
        <Tooltip placement='top' title='Respond' mouseEnterDelay={0.4}>
          <button
            onClick={showDrawer}
            className='flex items-center gap-1 text-neutral-500 hover:text-neutral-900 cursor-pointer'
          >
            <ChatBubbleOvalLeftIcon className='h-5 w-5 ease-in duration-100' />
            <span className='text-xs font-semibold'>{respondsCount}</span>
          </button>
        </Tooltip>
      </div>
      <div className='flex gap-4'>
        <Tooltip placement='top' title='Save' mouseEnterDelay={0.4}>
          <BookmarkIcon className='h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer' />
        </Tooltip>
        {userIsAuthor ? (
          <Dropdown
            menu={{
              items,
            }}
            placement='bottomRight'
            trigger={["click"]}
          >
            <Tooltip placement='top' title='More' mouseEnterDelay={0.4}>
              <EllipsisHorizontalIcon className='h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer' />
            </Tooltip>
          </Dropdown>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default PostActionBar;
