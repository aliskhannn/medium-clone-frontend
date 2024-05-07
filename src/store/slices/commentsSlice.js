import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommentsService from "../../services/CommentsService";

export const getCommentsOnPost = createAsyncThunk("comments/getCommentsOnPost", async (postId) => {
	const response = await CommentsService.getCommentsOnPost(postId);
	return response.data;
});

export const createComment = createAsyncThunk("comments/createComment", async ({ postId, comment }) => {
	const response = await CommentsService.createComment(postId, comment);
	return response.data;
});

export const removeComment = createAsyncThunk('posts/removeComment', async ({ postId, commentId }) => {
	await CommentsService.removeComment(postId, commentId);
});

export const updateComment = createAsyncThunk('posts/updateComment', async ({ postId, commentId, comment }) => {
	await CommentsService.updateComment(postId, commentId, comment);
});

export const likeComment = createAsyncThunk('posts/likeComment', async ({ postId, commentId }) => {
	await CommentsService.likeComment(postId, commentId);
	console.log("id", commentId);
});

const initialState = {
	comments: [],
	status: 'idle',
	error: null
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCommentsOnPost.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getCommentsOnPost.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.comments = action.payload
			})
			.addCase(getCommentsOnPost.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.comments.unshift(action.payload);
				const { parentId } = action.meta.arg.comment;
				const existingComment = state.comments.find(comment => comment._id === parentId);
				if (existingComment) {
					existingComment.replies.push({ _id: action.payload._id });
				}
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				const { commentId, comment } = action.meta.arg;
				const existingComment = state.comments.find(comment => comment._id === commentId);
				if (existingComment) {
					existingComment.content = comment.content;
				}
			})
			.addCase(removeComment.fulfilled, (state, action) => {
				const { commentId } = action.meta.arg;
				const removingComment = state.comments.find(comment => comment._id === commentId);
				const parentOfRemovingComment = state.comments.find(comment => comment._id === removingComment.parent);
				if (parentOfRemovingComment) {
					console.log(parentOfRemovingComment.replies.filter(reply => reply._id !== removingComment._id));
					parentOfRemovingComment.replies = parentOfRemovingComment.replies.filter(reply => reply._id !== removingComment._id);
				}
				state.comments = state.comments.filter(comment => comment._id !== commentId);
			})
	}
})

export const selectAllCommentsOnPost = (state) => state.comments.comments

export default commentsSlice.reducer