import { useDispatch, useSelector } from "react-redux";
import { selectUserData, selectIsAuth, updateProfile, getProfile } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Avatar, ConfigProvider, Tabs, Upload } from "antd";
import { CameraIcon, UserIcon } from "@heroicons/react/24/outline";
import Loader from "../components/UI/loader/Loader";
import { API_URL } from "../http";
import useUploadAvatar, { beforeUpload } from "../hooks/useUploadAvatart";
import { RootContext } from "./Root";

const Profile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const status = useSelector((state) => state.auth.status);
  const data = useSelector(selectUserData);

  const [saveButtonIsVisible, setSaveButtonIsVisible] = useState(false);

  const { loading, onFileUpload } = useUploadAvatar(setSaveButtonIsVisible);
  const { userData, setUserData } = useContext(RootContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getProfile())
        .then((res) => {
          setUserData({
            id: res.payload.user.id,
            username: res.payload.user.username,
            fullName: res.payload.user.fullName,
            email: res.payload.user.email,
            bio: res.payload.user.bio,
            avatarUrl: res.payload.user.avatarUrl,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSave = () => {
    dispatch(updateProfile(userData));
    setSaveButtonIsVisible(false);
  };

  const handleCancel = () => {
    setUserData({
      ...userData,
      ...data?.user,
    });
    setSaveButtonIsVisible(false);
  };

  const uploadButton = (
    <button
      className='flex items-center justify-center border-none bg-none h-16 w-16'
      type='button'
    >
      {loading ? <Loader type='mini' /> : <CameraIcon className='h-5 w-5' />}
    </button>
  );

  if (!localStorage.getItem("token") && !isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className='h-full w-3/4 mx-auto'>
      <div className='h-full flex items-center justify-center'>
        {status === "loading" ? (
          <Loader />
        ) : (
          <div className='flex gap-28 h-full w-full'>
            <div className='grow pt-16'>
              <h1 className='mb-14 text-4xl font-bold'>{userData.fullName}</h1>
              <ConfigProvider
                theme={{
                  components: {
                    Tabs: {
                      inkBarColor: "rgb(79 70 229)",
                      itemColor: "rgb(79 70 229)",
                      itemSelectedColor: "rgb(79 70 229)",
                      itemHoverColor: "rgb(99 102 241)",
                    },
                  },
                }}
              >
                <Tabs
                  defaultActiveKey='1'
                  items={[
                    {
                      key: "1",
                      label: "Home",
                      children: (
                        <div className='flex mt-6 h-36'>
                          <div className='flex flex-col gap-4 grow bg-gray-100 rounded-l py-5 px-10'>
                            <div className='flex gap-2'>
                              <Avatar
                                src={data?.user?.avatarUrl}
                                size={28}
                                icon={<UserIcon className='h-3 w-3' />}
                                className='flex items-center justify-center shrink-0'
                              />
                              <span className='font-medium'>{userData.fullName}</span>
                            </div>
                            <div>
                              <span className='text-xl font-bold'>Reading list</span>
                            </div>
                            <div>
                              <span>No stories</span>
                            </div>
                          </div>
                          <div className='w-1/3 bg-gray-500 rounded-r'></div>
                        </div>
                      ),
                    },
                    {
                      key: "2",
                      label: "About",
                      children:
                        userData.bio !== "" ? (
                          <div className='flex justify-between'>
                            <p>{userData.bio}</p>
                            <button className='flex items-center self-center justify-center gap-1 h-10 w-28 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm ease-in duration-100'>
                              Edit
                            </button>
                          </div>
                        ) : (
                          <div className='flex flex-col items-center justify-center w-full h-72 bg-gray-100 mt-6'>
                            <span className='text-lg font-semibold mb-5'>
                              Tell the world about yourself
                            </span>
                            <p className='w-3/4 text-center mb-5'>
                              This is the place to tell your story – share your background, work
                              journey, achievements, hobbies, dreams, and more. Spice it up by
                              tossing in some pictures and using bold text to add a personal touch
                              to your bio. Let your personality shine through in this space!
                            </p>
                            <button className='flex items-center justify-center gap-1 h-10 w-28 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm ease-in duration-100'>
                              Get started
                            </button>
                          </div>
                        ),
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
            <div className='w-1/3 shrink-0 border-r-bg-gray-800 border-l-2 pt-16 pl-10 h-full'>
              <div className='flex items-center gap-6'>
                {userData.avatarUrl ? (
                  <Avatar
                    src={userData.avatarUrl}
                    size={64}
                    icon={<UserIcon className='h-8 w-8' />}
                    className='flex items-center justify-center shrink-0 ring-1 ring-gray-200'
                  />
                ) : (
                  <Upload
                    name='avatar'
                    listType='picture-circle'
                    className={`avatar-uploader ${
                      loading ? "pointer-events-none cursor-default" : ""
                    }`}
                    showUploadList={false}
                    action={`${API_URL}/profile`}
                    method='POST'
                    beforeUpload={beforeUpload}
                    onChange={onFileUpload}
                  >
                    {uploadButton}
                  </Upload>
                )}
                {saveButtonIsVisible ? (
                  <div className='flex gap-4'>
                    <button onClick={handleSave} className='text-green-700 font-semibold'>
                      Save
                    </button>
                    <button onClick={handleCancel} className='text-red-700 font-semibold'>
                      Cancel
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className='my-3'>
                <span className='font-medium text-lg'>{userData.fullName}</span>
              </div>
              <p className='mb-5'>{userData.bio}</p>
              <Link
                to={"/profile/settings"}
                className='text-indigo-600 hover:text-indigo-500 ease-in duration-100'
              >
                <span>Edit profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
