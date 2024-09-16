import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import AuthService from "../../services/AuthService";

export const fetchRegister = createAsyncThunk('fetchRegister', async (params, { rejectWithValue }) => {
	try {
		const response = await AuthService.registration(params);
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const fetchLogin = createAsyncThunk('fetchLogin', async ({ username, password }, { rejectWithValue }) => {
	try {
		const response = await AuthService.login(username, password);
		localStorage.setItem("token", response.data.accessToken);
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const logout = createAsyncThunk('logout', async () => {
	await AuthService.logout();
	localStorage.removeItem("token");
});

export const getProfile = createAsyncThunk('getProfile', async () => {
	const response = await AuthService.getProfile();
	return response.data;
});

export const updateProfile = createAsyncThunk('updateProfile', async (params) => {
	const response = await AuthService.updateProfile(params);
	return response.data;
});

export const checkAuth = createAsyncThunk('checkAuth', async () => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
		withCredentials: true
	});
	localStorage.setItem("token", response.data.accessToken);
	return response.data;
});

export const changePassword = createAsyncThunk('changePassword', async ({ userId, oldPassword, newPassword }) => {
	const response = await AuthService.changePassword(userId, oldPassword, newPassword);
	return response;
});

const initialState = {
	data: null,
	isAuth: false,
	status: 'idle',
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// Register
			.addCase(fetchRegister.pending, (state) => {
				state.status = 'loading';
				state.data = null;
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchRegister.rejected, (state) => {
				state.status = 'error';
				state.data = null;
			})
			// Update profile
			.addCase(updateProfile.pending, (state) => {
				state.status = 'loading';
				state.data = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(updateProfile.rejected, (state) => {
				state.status = 'error';
				state.data = null;
			})
			// Login
			.addCase(fetchLogin.pending, (state) => {
				state.status = 'loading';
				state.data = null;
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuth = true;
				state.data = action.payload;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.payload;
				state.data = null;
			})
			// Logout
			.addCase(logout.fulfilled, (state) => {
				state.status = 'succeeded';
				state.isAuth = false;
			})
			// Get Profile
			.addCase(getProfile.pending, (state) => {
				state.status = 'loading';
				state.data = null;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuth = true;
				state.data = action.payload;
			})
			.addCase(getProfile.rejected, (state) => {
				state.status = 'error';
				state.data = null;
			})
			// Check auth
			.addCase(checkAuth.pending, (state) => {
				state.status = 'loading';
				state.data = null;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuth = true;
				state.data = action.payload;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.status = 'error';
				state.data = null;
			})
			// Change password
			.addCase(changePassword.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})
	}
});

export const selectIsAuth = state => state.auth.isAuth;
export const selectUserData = state => state.auth.data;

export default authSlice.reducer;