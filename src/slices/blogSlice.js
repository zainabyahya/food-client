import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";

const initialState = {
    blogPosts: [],
    singlePost: {},
    loading: false,
    error: null,
};

export const fetchBlogPosts = createAsyncThunk('blog/fetchBlogPosts', async () => {
    try {
        const response = await instance.get('/blogs');
        return response.data.allBlogPosts;
    } catch (error) {
        throw error;
    }
});

export const getBlogPostById = createAsyncThunk('blog/getBlogPostById', async (postId) => {
    try {
        const response = await instance.get(`/blogs/${postId}`);
        return response.data.foundBlogPost;
    } catch (error) {
        throw error;
    }
});

export const addBlogPost = createAsyncThunk('blog/addBlogPost', async (formData) => {
    try {
        const response = await instance.post('/blogs', formData);
        return response.data.newBlogPost;
    } catch (error) {
        throw error;
    }
});

export const deleteBlogPost = createAsyncThunk('blog/deleteBlogPost', async (postId) => {
    console.log("🚀 ~ deleteBlogPost ~ postId:", postId)
    try {
        await instance.delete(`/blogs/${postId}`);
        return postId;
    } catch (error) {
        throw error;
    }
});

export const updateBlogPost = createAsyncThunk('blog/updateBlogPost', async (data) => {
    try {
        const response = await instance.put(`/blogs/update/${data._id}`, data);
        console.log("🚀 ~ updateBlogPost ~ esponse.data.updatedBlogPost:", response.data.updatedBlogPost)

        return response.data.updatedBlogPost;
    } catch (error) {
        throw error;
    }
});
export const fetchBlogPostsByAuthor = createAsyncThunk(
    'blog/fetchBlogPostsByAuthor',
    async (authorId) => {
        try {
            const response = await instance.get(`/blogs/author/${authorId}`);
            console.log("🚀 ~ response.data:", response.data.foundBlogPosts)

            return response.data.foundBlogPosts;
        } catch (error) {
            throw error;
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.blogPosts = action.payload;
            })
            .addCase(fetchBlogPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBlogPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBlogPost.fulfilled, (state, action) => {
                state.loading = false;
                state.blogPosts = [action.payload, ...state.blogPosts];
            })
            .addCase(addBlogPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBlogPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlogPost.fulfilled, (state, action) => {
                state.loading = false;
                state.blogPosts = state.blogPosts.filter(post => post._id !== action.payload);
            })
            .addCase(deleteBlogPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBlogPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlogPost.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPostIndex = state.blogPosts.findIndex(post => post._id === action.payload._id);
                if (updatedPostIndex !== -1) {
                    state.blogPosts[updatedPostIndex] = action.payload;
                }
            })
            .addCase(updateBlogPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).addCase(getBlogPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePost = action.payload;
            })
            .addCase(getBlogPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchBlogPostsByAuthor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPostsByAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.blogPosts = action.payload;
            })
            .addCase(fetchBlogPostsByAuthor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
});

export default blogSlice.reducer;
