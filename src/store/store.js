import { configureStore } from "@reduxjs/toolkit";

import postsReducer from './slices/postsSlice'
import commentsReducer from './slices/commentsSlice'
import authRecuder from "./slices/authSlice";
import usersReducer from './slices/users/usersSlice'

export default configureStore({
	reducer: {
		auth: authRecuder,
		posts: postsReducer,
		comments: commentsReducer,
		users: usersReducer
	}
})