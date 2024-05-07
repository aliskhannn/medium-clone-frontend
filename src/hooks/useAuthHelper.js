import { useState } from "react";
import axios from '../http/index';

const useAuthHelper = () => {
	const [passwordInputType, setPasswordInputType] = useState("password");

	const togglePasswordVisibility = () => {
		if (passwordInputType === "password") {
			setPasswordInputType("text");
		} else {
			setPasswordInputType("password");
		}
	};

	const checkUsername = async (username) => {
		const response = await axios.post('/check-username', username).catch(e => {
			if (e.response.status === 500) {
				throw new Error(e.response.data.message);
			} else {
				throw e;
			}
		});
		return response.data;
	}

	return {
		passwordInputType,
		togglePasswordVisibility,
		checkUsername
	};
}

export default useAuthHelper;