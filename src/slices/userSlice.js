// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";


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
    async (user) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await instance.put(`/users/${user._id}`, user, config);
        return response.data.updatedUser;
    }
);


export const updateUserRating = createAsyncThunk(
    'users/updateUserRating',
    async (user) => {
        console.log("🚀 ~ user:", user)
        const response = await instance.put(`/users/rating/${user.id}`, user);
        console.log("🚀 ~ esponse.data.updatedUser:", response.data.updatedUser)

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
                state.user = action.payload;
            })
            .addCase(updateUserRating.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default userSlice.reducer;
