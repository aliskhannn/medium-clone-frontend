import axios from "axios";
import { API_URL } from "../http";

export async function loader() {
	if (localStorage.getItem("token")) {
		const response = await axios.get(`${API_URL}/auth/refresh`, {
			withCredentials: true,
		});
		localStorage.setItem("token", response.data.accessToken);
		return { userData: response.data.user };
	}
}