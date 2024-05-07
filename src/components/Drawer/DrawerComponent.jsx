import { Avatar, Button, Drawer } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { createComment, selectAllCommentsOnPost } from "../../store/slices/commentsSlice";
import { useParams } from "react-router-dom";
import CommentsList from "../CommentsList";
import { selectUserData } from "../../store/slices/authSlice";
import useEditor from "../../hooks/useEditor";
import { PostContext } from "../../routes/SinglePostPage";
import CommentSkeleton from "./../UI/skeleton/CommentSkeleton";

const DrawerComponent = ({ title, open, onClose, commentId = null, repliesCount = 0 }) => {
  const params = useParams();

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const status = useSelector((state) => state.comments.status);

  const { respondsCount, setRespondsCount } = useContext(PostContext);

  const [contentIsNotEmpty, setContentIsNotEmpty] = useState(false);
  const [isCommentWindowExpanded, setIsCommentWindowExpanded] = useState(true);
  const ejInstance = useRef();

  const { initEditorJS } = useEditor(
    "commentEditorjs",
    ejInstance,
    "comment",
    setContentIsNotEmpty
  );

  const initEditor = async () => {
    initEditorJS();
  };

  useEffect(() => {
    if (open && title === "Responses" && !ejInstance.current) {
      initEditor();
    }
  }, [open]);

  const canRespond = Boolean(contentIsNotEmpty);

  const handleRespond = () => {
    if (canRespond) {
      try {
        ejInstance.current
          .save()
          .then((outputData) => {
            dispatch(
              createComment({
                postId: params.id,
                comment: {
                  content: outputData,
                },
              })
            );
            setRespondsCount(respondsCount + 1);
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
    setIsCommentWindowExpanded(false);
  };

  return (
    <Drawer
      title={`${title} (${title === "Responses" ? respondsCount : repliesCount})`}
      onClose={() => {
        onClose();
        if (title === "Responses") {
          setTimeout(() => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
          }, 500);
        }
      }}
      open={open}
    >
      {title === "Replies" ? (
        <div>
          <CommentsList commentId={commentId} />
        </div>
      ) : (
        <div>
          <div
            className={`w-full shadow-lg shadow-black-500 rounded p-4 mb-10 ease-in duration-200 ${
              isCommentWindowExpanded ? "min-h-40" : "min-h-16"
            }`}
          >
            <div
              key={userData?.user.id}
              className={`flex items-center gap-2 ease-in duration-200 ${
                !isCommentWindowExpanded ? "opacity-0 h-0" : ""
              }`}
            >
              <Avatar
                src={userData?.user.avatarUrl}
                size={24}
                icon={<UserIcon className='h-3 w-3' />}
                className='flex items-center justify-center shrink-0'
              />
              <span className='text-gray-950'>{userData?.user.fullName}</span>
            </div>
            <div
              id='commentEditorjs'
              className={`ease-in duration-200 ${isCommentWindowExpanded ? "mt-4 mb-6" : ""}`}
              onFocus={() => {
                setIsCommentWindowExpanded(true);
              }}
            ></div>
            <div
              className={`flex justify-end gap-4 ease-in duration-200 ${
                !isCommentWindowExpanded ? "opacity-0 h-0" : ""
              }`}
            >
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

          <div>
            {status === "loading" ? (
              <div className='flex items-center flex-col gap-12 w-full'>
                {[...Array(1, 2, 3)].map((n) => (
                  <CommentSkeleton key={n} />
                ))}
              </div>
            ) : (
              <CommentsList />
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
};
export default DrawerComponent;
