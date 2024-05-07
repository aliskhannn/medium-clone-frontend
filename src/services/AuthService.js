import axios from '../http/index';

export default class AuthService {
	static async registration(params) {
		return await axios.post("/auth/register", params).catch(e => {
			if (e.response.status === 400) {
				throw new Error(e.response.data.message);
			} else {
				throw e;
			}
		});
	}

	static async login(username, password) {
		return await axios.post("/auth/login", { username, password }).catch(e => {
			if (e.response.status === 400) {
				throw new Error(e.response.data.message);
			} else {
				throw e;
			}
		});
	}

	static async logout() {
		return await axios.post("/auth/logout");
	}

	static async getProfile() {
		return await axios.get("/profile");
	}

	static async updateProfile(params) {
		return await axios.patch(`/profile/${params.id}/update`, params);
	}

	static async changePassword(userId, oldPassword, newPassword) {
		return await axios.patch(`/profile/${userId}/change-password`, { oldPassword, newPassword });
	}
}