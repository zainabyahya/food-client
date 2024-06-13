import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/api';

export const addFoodPost = createAsyncThunk('food/addFoodPost', async (formData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/food', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.newFoodPost;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateFoodPost = createAsyncThunk('food/updateFoodPost', async ({ foodPostId, formData }, { rejectWithValue }) => {
    try {
        const response = await instance.put(`/food/${foodPostId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.updatedFoodPost;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteFoodPost = createAsyncThunk('food/deleteFoodPost', async (foodPostId, { rejectWithValue }) => {
    try {
        await instance.delete(`/food/${foodPostId}`);
        return foodPostId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getAllFoodPosts = createAsyncThunk('food/getAllFoodPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/food');
        return response.data.foodPosts;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getFoodPostById = createAsyncThunk('food/getFoodPostById', async (foodPostId, { rejectWithValue }) => {
    try {
        const response = await instance.get(`/food/${foodPostId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getFoodPostByOwner = createAsyncThunk('food/getFoodPostByOwner', async (ownerId, { rejectWithValue }) => {
    try {
        const response = await instance.get(`/food/owner/${ownerId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const foodSlice = createSlice({
    name: 'food',
    initialState: {
        foodPosts: [],
        foodPost: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFoodPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFoodPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.foodPosts.push(action.payload);
            })
            .addCase(addFoodPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateFoodPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateFoodPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.foodPosts.findIndex(post => post._id === action.payload._id);
                if (index !== -1) {
                    state.foodPosts[index] = action.payload;
                }
            })
            .addCase(updateFoodPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteFoodPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFoodPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.foodPosts = state.foodPosts.filter(post => post._id !== action.payload);
            })
            .addCase(deleteFoodPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAllFoodPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllFoodPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.foodPosts = action.payload;
            })
            .addCase(getAllFoodPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getFoodPostById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFoodPostById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.foodPost = action.payload;
            })
            .addCase(getFoodPostById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getFoodPostByOwner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFoodPostByOwner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.foodPosts = action.payload;
            })
            .addCase(getFoodPostByOwner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default foodSlice.reducer;
