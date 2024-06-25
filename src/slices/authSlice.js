import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import instance from "../utils/api";
import decodeJWT from "../utils/jwt";
const savedLocation = JSON.parse(localStorage.getItem('location'));

const initialState = {
    isAuthenticated: false,
    currentToken: null,
    user: null,
    location: savedLocation || null,
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
            localStorage.removeItem('location');
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const setLocation = createAsyncThunk('auth/setLocation', async (location) => {
    localStorage.setItem('location', JSON.stringify(location));
    return location;
});

export const loadInitialLocation = createAsyncThunk('auth/loadInitialLocation', async () => {
    const location = JSON.parse(localStorage.getItem('location'));
    return location;
});

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
                state.location = null;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(setLocation.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.location = action.payload;
            })
            .addCase(setLocation.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.location = null;
                console.error(action.error.message);
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
