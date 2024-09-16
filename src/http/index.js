import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL
});

instance.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;

	return config;
});

export default instance;