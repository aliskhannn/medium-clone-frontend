import axios from '../http/index';

export default class PostsService {
	static async getPosts(query) {
		return await axios.get(`/posts?sortBy=-created_at&title=${query}`);
	}

	static async getPost(id) {
		return await axios.get(`/posts/${id}`);
	}

	static async createPost(post) {
		return await axios.post('/posts', post);
	}

	static async removePost(id) {
		return await axios.delete(`/posts/${id}`);
	}

	static async updatePost(id, post) {
		return await axios.patch(`/posts/${id}`, post);
	}

	static async likePost(id) {
		return await axios.patch(`/posts/${id}/like`);
	}

	// static async getPostsByQuery(query) {
	// 	return await axios.get(`/posts?sortBy=-created_date&title=${query}`);
	// }
}