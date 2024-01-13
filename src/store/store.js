import { configureStore } from "@reduxjs/toolkit";

import postsReducer from './slices/PostsSlice'

export default configureStore({
	reducer: {
		posts: postsReducer
	}
})