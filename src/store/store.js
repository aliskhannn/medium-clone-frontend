import { configureStore } from "@reduxjs/toolkit";

import postsReducer from './slices/posts/postsSlice'
import usersReducer from './slices/users/usersSlice'

export default configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer
	}
})