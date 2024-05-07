import { Empty } from "antd";
import { useState } from "react";
import Comment from "./Comment";
import { selectAllCommentsOnPost } from "../store/slices/commentsSlice";
import { useSelector } from "react-redux";

const CommentsList = ({ commentId = null }) => {
  const comments = useSelector(selectAllCommentsOnPost);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [deepNestedComments, setDeepNestedComments] = useState([]);

  const addDeepNestedComment = (comment) => {
    if (!deepNestedComments.some((com) => com._id === comment._id)) {
      setDeepNestedComments((prevComments) => [...prevComments, comment]);
    }
  };

  return (
    <div className='flex justify-center'>
      {comments.length ? (
        <ul className='posts-list flex items-center flex-col gap-6 w-full'>
          {(commentId
            ? comments.filter((comment) => comment._id === commentId)
            : comments.filter((comment) => comment.parent == null)
          ).map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              deepNestedComments={deepNestedComments}
              isActive={comment._id === activeCommentId}
              activeCommentId={activeCommentId}
              setActiveCommentId={setActiveCommentId}
              addDeepNestedComment={addDeepNestedComment}
            />
          ))}
        </ul>
      ) : (
        <div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};
export default CommentsList;
