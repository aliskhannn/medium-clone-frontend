import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	posts: {
		items: [],
		status: 'idle',
		error: null
	},
	post: {
		item: {},
		status: 'idle',
		error: null
	}
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
	const response = await axios.get('https://841be80de5fa8609.mokky.dev/posts')
	return response.data
})

export const getPostById = createAsyncThunk('posts/getPostById', async (id) => {
	const response = await axios.get(`https://841be80de5fa8609.mokky.dev/posts/${id}`)
	return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
	const response = await axios.post('https://841be80de5fa8609.mokky.dev/posts', newPost)
	console.log(newPost)
	return response.data
})

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, (state) => {
				state.posts.status = 'loading'
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.posts.status = 'succeeded'
				state.posts.items = action.payload
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.posts.status = 'failed'
				state.posts.error = action.error.message
			})
			.addCase(getPostById.pending, (state) => {
				state.post.status = 'loading'
			})
			.addCase(getPostById.fulfilled, (state, action) => {
				state.post.status = 'succeeded'
				state.post.item = action.payload
			})
			.addCase(getPostById.rejected, (state, action) => {
				state.post.status = 'failed'
				state.post.error = action.error.message
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.posts.items.push(action.payload)
			})
	}
})

export const selectAllPosts = (state) => state.posts.posts.items
export const selectSinglePost = (state) => state.posts.post.item

export default postsSlice.reducer