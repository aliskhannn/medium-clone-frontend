import axios from "axios";

export const API_URL = "https://riffle-posts-backend-8z087ng4q-aliskhan228s-projects.vercel.app";

const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL
});

instance.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;

	return config;
});

export default instance;