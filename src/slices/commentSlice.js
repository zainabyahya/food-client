import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";

// Initial state
const initialState = {
    comments: [],
    loading: false,
    error: null,
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    try {
        const response = await instance.get('/comments');
        return response.data.allComments;
    } catch (error) {
        throw error;
    }
});

export const addComment = createAsyncThunk('comments/addComment', async (commentData, { rejectWithValue }) => {
    console.log("🚀 ~ addComment ~ commentData:", commentData)
    try {
        const response = await instance.post('/comments', commentData);
        return response.data.newComment;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, { rejectWithValue }) => {
    try {
        await instance.delete(`/comments/${commentId}`);
        return commentId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ commentId, commentData }, { rejectWithValue }) => {
    try {
        const response = await instance.put(`/comments/${commentId}`, commentData);
        return response.data.updatedComment;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchCommentsByPost = createAsyncThunk('comments/fetchCommentsByPost', async (postId) => {
    try {
        const response = await instance.get(`/comments/post/${postId}`);
        return response.data.foundComments;
    } catch (error) {
        throw error;
    }
});

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(comment => comment._id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.map(comment =>
                    comment._id === action.payload._id ? action.payload : comment
                );
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(fetchCommentsByPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const commentActions = {
    fetchComments,
    addComment,
    deleteComment,
    updateComment,
};

export default commentSlice.reducer;
