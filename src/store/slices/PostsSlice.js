import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	posts: [],
	status: 'idle',
	error: null
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
	const response = await axios.get('https://841be80de5fa8609.mokky.dev/posts')
	return response.data
})

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
	}
})

export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer