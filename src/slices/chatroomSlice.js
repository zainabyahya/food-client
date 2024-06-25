import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/api';

const initialState = {
    chatrooms: [],
    chatroom: null,
    loading: false,
    isSuccess: false,
    error: null,
};

// Action to get chatrooms by user ID
export const getChatroomByUser = createAsyncThunk(
    'chatrooms/getChatroomByUser',
    async (userId, thunkAPI) => {
        try {
            const response = await instance.get(`/chatrooms/user/${userId}`);
            return response.data.allChatrooms;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to get chatroom by ID
export const getChatroomsById = createAsyncThunk(
    'chatrooms/getChatroomsById',
    async (chatroomId, thunkAPI) => {
        try {
            const response = await instance.get(`/chatrooms/${chatroomId}`);
            return response.data.foundChatrooms;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to add a new chatroom
export const addChatroom = createAsyncThunk(
    'chatrooms/addChatroom',
    async (users, thunkAPI) => {
        try {
            const response = await instance.post('/chatrooms', { users });
            return response.data.chatroom;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to delete a chatroom
export const deleteChatroom = createAsyncThunk(
    'chatrooms/deleteChatroom',
    async (chatroomId, thunkAPI) => {
        try {
            await instance.delete(`/chatrooms/${chatroomId}`);
            return chatroomId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const chatroomSlice = createSlice({
    name: 'chatrooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getChatroomsByUser
            .addCase(getChatroomByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChatroomByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.chatrooms = action.payload;
            })
            .addCase(getChatroomByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getChatroomsById
            .addCase(getChatroomsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChatroomsById.fulfilled, (state, action) => {
                state.loading = false;
                state.chatroom = action.payload;
            })
            .addCase(getChatroomsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addChatroom
            .addCase(addChatroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addChatroom.fulfilled, (state, action) => {
                state.loading = false;
                state.chatroom = action.payload;
                state.chatrooms.push(action.payload);
            })
            .addCase(addChatroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteChatroom
            .addCase(deleteChatroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteChatroom.fulfilled, (state, action) => {
                state.loading = false;
                state.chatrooms = state.chatrooms.filter(chatroom => chatroom._id !== action.payload);
            })
            .addCase(deleteChatroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chatroomSlice.reducer;
