// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";

// Async thunks
export const getAllUsers = createAsyncThunk('users/getAll', async () => {
    const response = await instance.get('/users');
    return response.data.allUsers;
});

export const getUserById = createAsyncThunk('users/getById', async (userId) => {
    const response = await instance.get(`/users/${userId}`);
    return response.data.foundUser;
});

export const deleteUser = createAsyncThunk('users/delete', async (userId) => {
    await instance.delete(`/users/${userId}`);
    return userId;
});

export const updateUser = createAsyncThunk(
    'users/update',
    async ({ userId, userData }) => {
        const response = await instance.put(`/users/${userId}`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.updatedUser;
    }
);


export const updateUserRating = createAsyncThunk(
    'users/updateUserRating',
    async ({ userId, rating }) => {
        const response = await instance.put(`/rating/${userId}`, { rating });
        return response.data.updatedUser;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                if (state.user && state.user._id === action.payload._id) {
                    state.user = action.payload;
                }
            })
            .addCase(updateUserRating.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                if (state.user && state.user._id === action.payload._id) {
                    state.user = action.payload;
                }
            });
    },
});

export default userSlice.reducer;
