import { message } from "antd";

const useMessage = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const success = (content) => {
		message.success(content, 2);
		// messageApi.open({
		// 	type: "success",
		// 	content,
		// 	duration: 2,
		// });
	};
	const warning = (content) => {
		message.warning(content, 2);
		// messageApi.open({
		// 	type: 'warning',
		// 	content,
		// 	duration: 2,
		// });
	};
	const error = (content) => {
		message.error(content, 2);
		// messageApi.open({
		// 	type: 'error',
		// 	content,
		// 	duration: 2,
		// });
	};

	return { success, warning, error, contextHolder };
};

export default useMessage;