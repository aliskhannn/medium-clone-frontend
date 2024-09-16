import axios from "axios";

export async function loader() {
	if (localStorage.getItem("token")) {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
			withCredentials: true,
		});
		localStorage.setItem("token", response.data.accessToken);
		return { userData: response.data.user };
	}
}