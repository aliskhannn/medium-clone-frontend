import { useContext, useState } from "react";
import { message } from "antd";
import { RootContext } from "../routes/Root";

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

const useUploadAvatar = (setSaveButtonIsVisible = null) => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const { userData, setUserData } = useContext(RootContext);

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, () => {
				setLoading(false);
				setImageUrl(info.file.response.avatarUrl);
			});
		}
	};

	const onFileUpload = (info) => {
		handleChange(info);
		if (info.file.status === "done") {
			setUserData({
				...userData,
				avatarUrl: `${import.meta.env.VITE_API_URL}${info?.file?.response?.avatarUrl}`,
			});
			if (setSaveButtonIsVisible) setSaveButtonIsVisible(true);
		}
	};

	return { loading, imageUrl, onFileUpload }
}

export default useUploadAvatar;