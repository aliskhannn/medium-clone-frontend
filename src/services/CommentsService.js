import axios from '../http/index';

export default class CommentsService {
	static getCommentsOnPost(postId) {
		return axios.get(`/posts/${postId}/comments`);
	}
	static async createComment(postId, comment) {
		return axios.post(`/posts/${postId}/comments`, comment);
	}

	static async removeComment(postId, commentId) {
		return await axios.delete(`/posts/${postId}/comments/${commentId}`);
	}

	static async updateComment(postId, commentId, comment) {
		return await axios.patch(`/posts/${postId}/comments/${commentId}`, comment);
	}

	static async likeComment(postId, commentId) {
		return await axios.patch(`/posts/${postId}/comments/${commentId}/like`);
	}
}