import PostItem from "./PostItem";
import "react-loading-skeleton/dist/skeleton.css";
import { Empty } from "antd";

const PostsList = ({ posts }) => {

  return (
    <div className='flex justify-center'>
      {posts.length ? (
        <ul className='posts-list flex items-center flex-col gap-12 w-full'>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
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

export default PostsList;
