import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserData } from "../store/slices/authSlice";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
  BookmarkSquareIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { createPost, updatePost } from "../store/slices/postsSlice";
import { RootContext } from "../routes/Root";
import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "antd";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserPanel = () => {
  const { ejInstance, title, contentIsNotEmpty } = useContext(RootContext);
  const params = useParams();
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const status = useSelector((state) => state.auth.status);

  const isEditing = Boolean(params.id);

  const canPublish = isEditing
    ? [title, contentIsNotEmpty].some(Boolean) && requestStatus === "idle"
    : [title, contentIsNotEmpty].every(Boolean) && requestStatus === "idle";

  const handlePublish = () => {
    if (canPublish) {
      try {
        setRequestStatus("pending");
        ejInstance.current
          .save()
          .then((outputData) => {
            (isEditing
              ? dispatch(
                  updatePost({
                    id: params?.id,
                    post: {
                      title,
                      content: outputData,
                    },
                  })
                )
              : dispatch(
                  createPost({
                    likes: 0,
                    liked_by_user: false,
                    title,
                    content: outputData,
                  })
                )
            ).then((data) => {
              const _id = isEditing ? params.id : data.payload._id;
              navigate(`/${_id}`);
            });
            ejInstance.current.clear();
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onClickLogut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      navigate("/");
      window.localStorage.removeItem("token");
    }
  };

  if (status === "loading") {
    return (
      <div className='flex items-center gap-5 ml-auto'>
        <Skeleton variant='circular' borderRadius={"50%"} width={32} height={32} />
      </div>
    );
  }

  return (
    <div className='ml-auto flex items-center gap-5'>
      <Link to={"/edit"}>
        <button
          className={`flex items-center justify-center gap-1 h-10 w-28 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm ease-in duration-100 ${
            location.pathname === `/edit` || location.pathname === `/${params.id}/edit`
              ? "hidden"
              : ""
          }`}
        >
          <PencilSquareIcon className='h-4 w-4' />
          New Post
        </button>
      </Link>
      <button
        className={`flex items-center justify-center text-white px-3 rounded-2xl transition-all ${
          canPublish ? "bg-green-600" : "bg-green-700"
        } ${
          location.pathname === `/edit` || location.pathname === `/${params.id}/edit`
            ? "block"
            : "hidden"
        }`}
        onClick={handlePublish}
        disabled={!canPublish}
      >
        Publish
      </button>
      <BellIcon className='h-6 w-6 text-slate-400 hover:text-white ease-in duration-100 cursor-pointer' />
      <Menu as='div' className='relative'>
        <div>
          <Menu.Button className='relative flex rounded-full bg-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
            <span className='absolute -inset-1.5' />
            <span className='sr-only'>Open user menu</span>
            <Avatar
              src={userData?.user?.avatarUrl}
              size={32}
              icon={<UserIcon className='h-4 w-4' />}
              className='flex items-center justify-center border-none'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/profile'
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  <UserCircleIcon className='h-5 w-5' />
                  Your Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='/library'
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  <BookmarkSquareIcon className='h-5 w-5' />
                  Library
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/profile/settings"}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  <Cog8ToothIcon className='h-5 w-5' />
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full"
                  )}
                  onClick={onClickLogut}
                >
                  <ArrowLeftStartOnRectangleIcon className='h-5 w-5' />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default UserPanel;
