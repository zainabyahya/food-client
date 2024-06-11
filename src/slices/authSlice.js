import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";
import decodeJWT from "../utils/jwt";

const initialState = {
    isAuthenticated: false,
    currentToken: null,
    user: null,
    loading: false,
    error: null,
};

export const checkForToken = (receivedToken) => {
    if (receivedToken) {
        instance.defaults.headers.common.Authorization = `Bearer ${receivedToken}`
        localStorage.setItem("token", receivedToken);
        const decodedToken = decodeJWT(receivedToken);
        return decodedToken
    }
    return null;
}

export const login = createAsyncThunk(
    'auth/loginUser',
    async ({ phoneNumber, password }, { rejectWithValue }) => {
        try {
            const res = await instance.post(`/auth/login`, { phoneNumber, password });
            const receivedToken = res.data;
            const token = checkForToken(receivedToken);
            return token;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signUpUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await instance.post('/auth/signup', formData);
            const receivedToken = res.data;
            const token = checkForToken(receivedToken);
            return token;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.currentToken = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.currentToken = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.currentToken = null;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
