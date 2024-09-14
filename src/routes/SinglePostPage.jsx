import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../store/slices/postsSlice";
import SinglePostPageSkeleton from "../components/UI/skeleton/SinglePostPageSkeleton";
import Output from "editorjs-react-renderer";
import { getReadingTime } from "../utils/postItemHelpers";
import { formatDate } from "./../utils/postItemHelpers";
import PostActionBar from "../components/PostActionBar";
import axios from "../http/index";
import { selectUserData } from "../store/slices/authSlice";
import { Avatar } from "antd";
import { UserIcon } from "@heroicons/react/24/outline";
import DrawerComponent from "../components/Drawer/DrawerComponent";
import { getCommentsOnPost } from "../store/slices/commentsSlice";

const styles = {
  paragraph: {
    fontSize: "18px",
    margin: "25px 0",
  },
  list: {
    listItem: {
      fontSize: "18px",
      marginLeft: "30px",
    },
  },
};

export const PostContext = createContext();

const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [readingTime, setReadingTime] = useState(null);
  const [postCreatedDate, setPostCreatedDate] = useState(null);
  const [respondsCount, setRespondsCount] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [likedByUser, setLikedByUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if (userStatus === "succeeded") {
      dispatch(getPost(id)).then((post) => {
        setPost(post.payload);
        setReadingTime(getReadingTime(post?.payload?.content?.blocks));
        setPostCreatedDate(formatDate(post?.payload?.createdAt));
        setRespondsCount(post.payload.responds_count);
        setLikesCount(post.payload.likes_count);
        setLikedByUser(post?.payload?.likes.some((like) => like.user._id === userData?.user?.id));
        setLoading(false);
      });
    // }
  }, []);

  useEffect(() => {
    if (openDrawer) {
      dispatch(getCommentsOnPost(id));
    }
  }, [openDrawer]);

  const handleLike = async (postId) => {
    if (!likedByUser) {
      await axios
        .post(`/posts/${postId}/like`)
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
        .delete(`/posts/${postId}/like`)
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

  const showDrawer = () => {
    setOpenDrawer(true);
    navigate(`/${id}/comments`);
  };

  const onClose = () => {
    setOpenDrawer(false);
    navigate(-1);
  };

  return (
    <PostContext.Provider value={{ respondsCount, setRespondsCount }}>
      <div className='post-page'>
        <div className='container'>
          <div className='py-20'>
            <DrawerComponent title='Responses' open={openDrawer} onClose={onClose} />
            {loading ? (
              <SinglePostPageSkeleton />
            ) : (
              <div>
                <h1 className='text-4xl font-bold'>{post.title}</h1>

                <div className='flex gap-3 mt-8'>
                  <Avatar
                    src={post?.author?.avatarUrl}
                    size={48}
                    icon={<UserIcon className='h-6 w-6' />}
                    className='flex items-center justify-center shrink-0'
                  />
                  <div>
                    <span className='text-gray-950 text-base font-bold'>
                      {post?.author?.fullName}
                    </span>
                    <div className='flex gap-1 text-gray-500'>
                      <span>{readingTime} min read</span>
                      <span>&#183;</span>
                      <span>{postCreatedDate}</span>
                    </div>
                  </div>
                </div>

                <PostActionBar
                  post={post}
                  likesCount={likesCount}
                  likedByUser={likedByUser}
                  handleLike={handleLike}
                  showDrawer={showDrawer}
                />

                <div className='post-page-content'>
                  <Output data={post?.content} style={styles} />
                </div>

                <PostActionBar
                  post={post}
                  likesCount={likesCount}
                  likedByUser={likedByUser}
                  handleLike={handleLike}
                  showDrawer={showDrawer}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PostContext.Provider>
  );
};

export default SinglePostPage;
