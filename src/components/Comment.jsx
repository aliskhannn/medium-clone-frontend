import {
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, Dropdown, Tooltip } from "antd";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDate, isAuthor } from "../utils/postItemHelpers";
import Output from "editorjs-react-renderer";
import useEditor from "../hooks/useEditor";
import {
  createComment,
  removeComment,
  selectAllCommentsOnPost,
  updateComment,
} from "../store/slices/commentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostContext } from "../routes/SinglePostPage";
import DrawerComponent from "./Drawer/DrawerComponent";
import axios from "../http/index";
import { selectUserData } from "../store/slices/authSlice";
import useMessage from "../hooks/useMessage";

const styles = {
  paragraph: {
    fontSize: "16px",
    margin: "15px 0",
  },
};

const Comment = ({
  comment,
  isActive,
  activeCommentId,
  setActiveCommentId,
  nestingLevel = 0,
  addDeepNestedComment,
}) => {
  const params = useParams();

  const { respondsCount, setRespondsCount } = useContext(PostContext);

  const commentCreatedDate = formatDate(comment?.createdAt);

  const [likesCount, setLikesCount] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [contentIsNotEmpty, setContentIsNotEmpty] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [repliesShown, setRepliesShown] = useState(false);
  const [repliesCount, setRepliesCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const comments = useSelector(selectAllCommentsOnPost);
  const userData = useSelector(selectUserData);
  const { success, error } = useMessage();
  const ejInstance = useRef();

  const userIsAuthor = isAuthor(comment?.author?._id, userData?.user?.id);

  const { initEditorJS } = useEditor(
    "commentReplyEditorjs",
    ejInstance,
    "comment-reply",
    setContentIsNotEmpty
  );

  const initEditor = useCallback(async () => {
    initEditorJS(null, false, comment?.author?.fullName);
  }, [initEditorJS, comment?.author?.fullName]);

  useEffect(() => {
    setLikesCount(comment.likes_count);
    setLikedByUser(comment.likes.some((like) => like.user === userData?.user?.id));
    setRepliesCount(comment.replies_count);
  }, []);

  useEffect(() => {
    if (isActive && !ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [activeCommentId]);

  useEffect(() => {
    if (nestingLevel >= 3) {
      addDeepNestedComment(comment);
    }
  }, [nestingLevel, comment, addDeepNestedComment]);

  const handleLike = async (postId, commentId) => {
    if (!likedByUser) {
      await axios
        .post(`/posts/${postId}/comments/${commentId}/like`)
        .then((response) => {
          if (response.status === 200) {
            setLikedByUser(true);
            setLikesCount(likesCount + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .delete(`/posts/${postId}/comments/${commentId}/like`)
        .then((response) => {
          if (response.status === 200) {
            setLikedByUser(false);
            setLikesCount(likesCount - 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReplyClick = () => {
    if (repliesCount > 0) {
      setRepliesShown(true);
    }
    setActiveCommentId(isActive ? null : comment._id);
  };

  const canRespond = Boolean(contentIsNotEmpty);

  const handleRespond = () => {
    if (canRespond) {
      try {
        ejInstance.current
          .save()
          .then((outputData) => {
            if (isEditing) {
              dispatch(
                updateComment({
                  postId: params.id,
                  commentId: comment._id,
                  comment: {
                    content: outputData,
                  },
                })
              );
            } else {
              dispatch(
                createComment({
                  postId: params.id,
                  comment: {
                    parentId: comment._id,
                    content: outputData,
                  },
                })
              );
              setRepliesShown(true);
              setRespondsCount(respondsCount + 1);
              setRepliesCount(repliesCount + 1);
            }
            setActiveCommentId(null);
            setIsEditing(false);
            ejInstance.current.clear();
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    ejInstance.current.clear();
    setActiveCommentId(null);
    setIsEditing(false);
  };

  const commentReplies = comments.filter((com) =>
    comment.replies.some((reply) => reply._id === com._id)
  );

  if (nestingLevel >= 3) {
    return null;
  }

  const showDrawer = () => {
    setOpenDrawer(true);
    setActiveCommentId(null);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const toggleReplies = () => {
    if (repliesCount === 0) {
      return;
    }
    setRepliesShown(!repliesShown);
    setActiveCommentId(null);
  };

  const handleEdit = () => {
    if (ejInstance.current) {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    }
    setIsEditing(true);
    initEditorJS(comment, true);
  };

  const handleDelete = () => {
    dispatch(removeComment({ postId: params.id, commentId: comment._id }))
      .then(() => {
        success("Comment was successfully removed");
        setRespondsCount(respondsCount - 1);
        setRepliesCount(repliesCount - 1);
      })
      .catch((err) => {
        console.log(err);
        error("Failed to remove comment");
      });
  };

  const onClick = ({ key }) => {
    if (key == 1) {
      handleEdit();
    } else if (key == 2) {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        handleDelete();
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <span>Edit comment</span>,
    },
    {
      key: "2",
      label: <span className='text-red-500'>Delete</span>,
    },
  ];

  if (isEditing) {
    return (
      <div className={`w-full shadow-lg shadow-black-500 rounded p-4 ease-in duration-200`}>
        <div id='commentReplyEditorjs' className='mb-6'></div>
        <div className={`flex justify-end gap-4`}>
          <Button onClick={handleCancel} variant='outlined'>
            Cancel
          </Button>
          <Button
            variant='contained'
            type='primary'
            htmlType='submit'
            onClick={handleRespond}
            // loading={isSubmitting}
            disabled={!canRespond}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='posts-item flex flex-col w-full'>
      <DrawerComponent
        title='Replies'
        open={openDrawer}
        onClose={onClose}
        commentId={comment?._id}
        repliesCount={repliesCount}
      />
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Avatar
            src={comment?.author?.avatarUrl}
            size={32}
            icon={<UserIcon className='h-3 w-3' />}
            className='flex items-center justify-center shrink-0'
          />
          <div className='flex flex-col'>
            <span className='text-gray-950'>{comment?.author?.fullName}</span>
            <span className='text-gray-500'>{commentCreatedDate}</span>
          </div>
        </div>
        {userIsAuthor && (
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            placement='bottomRight'
            trigger={["click"]}
          >
            <Tooltip placement='top' title='More' mouseEnterDelay={0.4}>
              <EllipsisHorizontalIcon className='h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer' />
            </Tooltip>
          </Dropdown>
        )}
      </div>

      <div className='break-words'>
        <Output data={comment?.content} style={styles} />
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <div className='flex items-center'>
          <div className='flex items-center gap-1'>
            {likedByUser ? (
              <HandThumbUpSolidIcon
                onClick={() => handleLike(params.id, comment._id)}
                className='h-5 w-5 text-neutral-900 ease-in duration-100 cursor-pointer'
              />
            ) : (
              <HandThumbUpIcon
                onClick={() => handleLike(params.id, comment._id)}
                className='h-5 w-5 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer'
              />
            )}
            <span className='text-xs font-semibold text-neutral-500'>{likesCount}</span>
          </div>
        </div>
        {nestingLevel >= 2 && repliesCount > 0 ? (
          <button
            onClick={showDrawer}
            className='flex items-center gap-1 text-green-600 hover:text-green-700 ease-in duration-100 cursor-pointer'
          >
            <ChatBubbleLeftRightIcon className='h-5 w-5' />
            Show more replies
          </button>
        ) : (
          <div className='w-full flex justify-between'>
            <button
              onClick={toggleReplies}
              className='flex items-center gap-1 text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer'
            >
              <ChatBubbleOvalLeftIcon className='h-5 w-5' />
              {!repliesShown
                ? `${repliesCount} ${repliesCount === 1 ? "Reply" : "Replies"}`
                : "Hide replies"}
            </button>
            <button
              onClick={nestingLevel < 2 ? handleReplyClick : showDrawer}
              className='text-xs font-semibold ml-auto text-neutral-500 hover:text-neutral-900 ease-in duration-100 cursor-pointer'
            >
              Reply
            </button>
          </div>
        )}
      </div>

      <div className='border-l-2 border-l-bg-gray-800 pl-6 ml-3 mt-5'>
        {isActive && (
          <div className={`w-full shadow-lg shadow-black-500 rounded p-4 ease-in duration-200`}>
            <div id='commentReplyEditorjs' className='mb-6'></div>
            <div className={`flex justify-end gap-4`}>
              <Button onClick={handleCancel} variant='outlined'>
                Cancel
              </Button>
              <Button
                variant='contained'
                type='primary'
                htmlType='submit'
                onClick={handleRespond}
                // loading={isSubmitting}
                disabled={!canRespond}
              >
                Respond
              </Button>
            </div>
          </div>
        )}

        {repliesShown && nestingLevel < 2 && commentReplies.length > 0 && (
          <div className='flex flex-col gap-6 mt-6'>
            {commentReplies.map((com) => (
              <div key={com._id}>
                <Comment
                  comment={com}
                  isActive={com._id === activeCommentId}
                  activeCommentId={activeCommentId}
                  setActiveCommentId={setActiveCommentId}
                  nestingLevel={nestingLevel + 1}
                  addDeepNestedComment={addDeepNestedComment}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment;
