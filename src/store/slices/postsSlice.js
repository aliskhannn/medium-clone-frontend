import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostsService from "../../services/PostsService";

export const getPosts = createAsyncThunk('posts/getPosts', async (query = '') => {
	const response = await PostsService.getPosts(query);
	return response.data
})

export const getPost = createAsyncThunk('posts/getPost', async (id) => {
	const response = await PostsService.getPost(id);
	return response.data
})

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
	const response = await PostsService.createPost(post);
	return response.data
})

export const removePost = createAsyncThunk('posts/removePost', async (id) => {
	await PostsService.removePost(id);
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
	await PostsService.updatePost(id, post);
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
	await PostsService.likePost(id);
});

const initialState = {
	posts: [],
	status: 'idle',
	error: null
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.posts = action.payload
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(getPost.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getPost.fulfilled, (state) => {
				state.status = 'succeeded'
			})
			.addCase(getPost.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export const selectAllPosts = (state) => state.posts.posts

export default postsSlice.reducer