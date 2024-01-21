import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	users: {
		items: [],
		status: 'idle',
		error: null
	},
	user: {
		item: [],
		status: 'idle',
		error: null
	}
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
	const response = await axios.get('https://841be80de5fa8609.mokky.dev/users');
	return response.data
})

export const getUserById = createAsyncThunk('users/getUserById', async (userId) => {
	const response = await axios.get(`https://841be80de5fa8609.mokky.dev/users/${userId}`);
	return response.data
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUsers.pending, (state) => {
				state.users.status = 'loading'
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.users.status = 'succeeded';
				state.users.items = action.payload
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.users.status = 'failed'
				state.users.error = action.error.message
			})
			.addCase(getUserById.pending, (state) => {
				state.user.status = 'loading'
			})
			.addCase(getUserById.fulfilled, (state, action) => {
				state.user.status = 'succeeded';
				state.user.item = action.payload
			})
			.addCase(getUserById.rejected, (state, action) => {
				state.user.status = 'failed'
				state.user.error = action.error.message
			})
	}
})

export const selectAllUsers = state => state.users.users.items
export const selectSingleUser = state => state.users.user.item

export default usersSlice.reducer