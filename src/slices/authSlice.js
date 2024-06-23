import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import instance from "../utils/api";
import decodeJWT from "../utils/jwt";

const initialState = {
    isAuthenticated: false,
    currentToken: null,
    user: null,
    location: null,
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

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().currentToken;
            if (!token) {
                throw new Error("No token available");
            }
            const decodedToken = checkForToken(token);
            console.log("🚀 ~ decodedToken:", decodedToken)
            return decodedToken;
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
            .addCase("auth/getUser", (state, action) => {
                state.isAuthenticated = true;
                state.currentToken = action.payload;
            })
            .addCase("auth/getLocation", (state, action) => {
                state.isAuthenticated = true;
                state.location = action.payload;
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.currentToken = action.payload;
                state.user = action.payload;
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
                state.user = action.payload;
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
            }).addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentToken = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
