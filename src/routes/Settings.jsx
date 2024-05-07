import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  getProfile,
  selectUserData,
  selectIsAuth,
  updateProfile,
} from "../store/slices/authSlice";
import Loader from "../components/UI/loader/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Avatar, ConfigProvider, Tabs } from "antd";
import { UserIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import ModalComponent from "../components/Modal/ModalComponent";
import { RootContext } from "./Root";
import { AppContext } from "../App";

export const SettingsContext = createContext();

const Settings = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.auth.status);
  const isAuth = useSelector(selectIsAuth);
  const data = useSelector(selectUserData);

  const { userData, setUserData } = useContext(RootContext);
  const { success, error } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

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
          showModal("Profile information");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const showModal = (type) => {
    setModalTitle(type);
    setIsModalOpen(true);
  };

  const handleOk = (data) => {
    if (modalTitle === "Password") {
      if (data.newPassword !== data.newPasswordConfirm) {
        return;
      }
      dispatch(
        changePassword({
          userId: userData.id,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        })
      )
        .then(() => {
          success("Password changed successfully");
        })
        .catch((err) => {
          error("Failed to change password");
          console.log("err", err);
        });
    } else {
      dispatch(updateProfile({ ...userData, ...data }))
        .then((res) => {
          setUserData({
            id: res.payload.user.id,
            username: res.payload.user.username,
            fullName: res.payload.user.fullName,
            email: res.payload.user.email,
            bio: res.payload.user.bio,
            avatarUrl: res.payload.user.avatarUrl,
          });
          success("Your profile successfully updated");
        })
        .catch((err) => {
          console.log(err);
          error("Failed to update profile");
        });
    }
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setUserData({
      ...userData,
      ...data?.user,
    });
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    setUserData({
      ...userData,
      avatarUrl: "",
    });
    success("You have successfully removed your profile picture");
  };

  if (!localStorage.getItem("token") && !isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <SettingsContext.Provider
      value={{
        modalTitle,
        passwordData,
        setPasswordData,
        handleOk,
        handleCancel,
        handleRemove,
        isModalOpen,
      }}
    >
      <div className='h-full w-3/4 mx-auto'>
        <div className='h-full flex items-center justify-center'>
          {status === "loading" ? (
            <Loader />
          ) : (
            <div className='h-full w-full pt-16'>
              <h1 className='mb-14 text-4xl font-bold'>Settings</h1>
              <div className='w-1/2'>
                <ModalComponent />
                <ConfigProvider
                  theme={{
                    components: {
                      Tabs: {
                        inkBarColor: "transparent",
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
                        label: "Account",
                        children: (
                          <div className='flex flex-col gap-7 mt-6'>
                            <div>
                              <button
                                onClick={() => showModal("Email address")}
                                className='flex justify-between w-full'
                              >
                                <span>Email address</span>
                                <span>{data?.user?.email}</span>
                              </button>
                              {!data?.user?.isActivated ? (
                                <div className='mt-4'>
                                  <Alert
                                    message='Confirm your email address using the link sent to you by email'
                                    type='warning'
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div>
                              <button
                                onClick={() => showModal("Username")}
                                className='flex justify-between w-full'
                              >
                                <span>Username</span>
                                <span>@{data?.user?.username}</span>
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => showModal("Profile information")}
                                className='flex justify-between w-full'
                              >
                                <span>Profile information</span>
                                <div className='flex gap-2'>
                                  <span>{data?.user?.fullName}</span>
                                  <Avatar
                                    src={data?.user?.avatarUrl}
                                    size={28}
                                    icon={<UserIcon className='h-3 w-3' />}
                                    className='flex items-center justify-center'
                                  />
                                </div>
                              </button>
                            </div>
                          </div>
                        ),
                      },
                      {
                        key: "2",
                        label: "Security",
                        children: (
                          <div className='flex flex-col gap-7 mt-6'>
                            <div>
                              <button
                                onClick={() => showModal("Password")}
                                className='flex justify-between w-full'
                              >
                                <span>Password</span>
                                <span>******</span>
                              </button>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
          )}
        </div>
      </div>
    </SettingsContext.Provider>
  );
};
export default Settings;
