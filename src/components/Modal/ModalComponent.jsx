import { useContext } from "react";
import Form from "../UI/form/Form";
import { SettingsContext } from "../../routes/Settings";
import { Modal } from "antd";
import useUploadAvatar, { beforeUpload } from "../../hooks/useUploadAvatart";
import { UserIcon } from "@heroicons/react/24/outline";
import { Avatar, Upload } from "antd";
import { RootContext } from "../../routes/Root";

const ModalComponent = () => {
  const { modalTitle, isModalOpen, handleCancel, handleRemove } =
    useContext(SettingsContext);
  const { userData } = useContext(RootContext);

  const { onFileUpload } = useUploadAvatar();

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      title={modalTitle}
      open={isModalOpen}
      onCancel={handleCancel}
      closeAfterTransition
      footer={[]}
      classNames={{
        header: "modal-header",
        body: "modal-body",
      }}
    >
      {modalTitle === "Profile information" && (
        <div>
          <span>Photo</span>
          <div className='flex gap-6 mt-2'>
            <Avatar
              src={userData.avatarUrl}
              size={81}
              icon={<UserIcon className='h-3 w-3' />}
              className='flex items-center justify-center ring-1 ring-gray-200 shrink-0'
            />
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <Upload
                  name='avatar'
                  listType='text'
                  className='avatar-uploader_text'
                  showUploadList={false}
                  action={`${import.meta.env.VITE_API_URL}/profile`}
                  method='POST'
                  beforeUpload={beforeUpload}
                  onChange={onFileUpload}
                >
                  <button className='text-green-700 font-semibold'>
                    Update
                  </button>
                </Upload>

                <button
                  onClick={handleRemove}
                  className={`text-red-700 font-semibold ${
                    userData.avatarUrl === "" ? "hidden" : ""
                  }`}
                >
                  Remove
                </button>
              </div>
              <span>
                Recommended: Square JPG/PNG, at least 1,000 pixels per side.
              </span>
            </div>
          </div>
        </div>
      )}
      <Form />
    </Modal>
  );
};
export default ModalComponent;
