import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async ({ phoneNumber, password }) => {
    const response = await instance.post('/auth/login', { phoneNumber, password });
    console.log("🚀 ~ login ~ response:", response.data)
    return response.data;
});


export const signup = createAsyncThunk('auth/signup', async (formData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/auth/signup', formData);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ signup ~ error.response.data:", error.response.data)
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.generatedToken;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
