import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/api';

export const addFoodPost = createAsyncThunk('food/addFoodPost', async (formData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/food', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("🚀 ~ addFoodPost ~ response:", response.data)
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
        console.log("---------hereeeeeeee-----------");
        const response = await instance.get(`/food/${foodPostId}`);
        console.log("🚀 ~ getFoodPostById ~ response:", response)

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
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFoodPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFoodPost.fulfilled, (state, action) => {
                state.loading = false;
                state.foodPosts = [action.payload, ...state.foodPosts];
            })
            .addCase(addFoodPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFoodPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateFoodPost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.foodPosts.findIndex(post => post._id === action.payload._id);
                if (index !== -1) {
                    state.foodPosts[index] = action.payload;
                }
            })
            .addCase(updateFoodPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFoodPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFoodPost.fulfilled, (state, action) => {
                state.loading = false;
                state.foodPosts = state.foodPosts.filter(post => post._id !== action.payload);
            })
            .addCase(deleteFoodPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllFoodPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllFoodPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.foodPosts = action.payload;
            })
            .addCase(getAllFoodPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFoodPostById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFoodPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.foodPost = action.payload;
            })
            .addCase(getFoodPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFoodPostByOwner.pending, (state) => {
                state.loading = true;

            })
            .addCase(getFoodPostByOwner.fulfilled, (state, action) => {
                state.loading = false;
                state.foodPosts = action.payload;
            })
            .addCase(getFoodPostByOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default foodSlice.reducer;
