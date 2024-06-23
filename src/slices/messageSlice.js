import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/api';

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

// Action to get messages by chatroom ID
export const getMessagesByChatroom = createAsyncThunk(
    'messages/getMessagesByChatroom',
    async (chatroomId, thunkAPI) => {
        try {
            const response = await instance.get(`/messages/${chatroomId}`);
            return response.data.allMessages;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to get messages by user ID
export const getMessagesByUser = createAsyncThunk(
    'messages/getMessagesByUser',
    async (userId, thunkAPI) => {
        try {
            const response = await instance.get(`/messages/user/${userId}`);
            return response.data.foundMessages;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to add a new message
export const addMessage = createAsyncThunk(
    'messages/addMessage',
    async (messageData, thunkAPI) => {
        try {
            const response = await instance.post('/messages', messageData);
            return response.data.newMessage;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to delete a message
export const deleteMessage = createAsyncThunk(
    'messages/deleteMessage',
    async ({ messageId, chatroomId }, thunkAPI) => {
        try {
            await instance.delete(`/messages/${messageId}`, { data: { chatroom: chatroomId } });
            return messageId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action to update a message
export const updateMessage = createAsyncThunk(
    'messages/updateMessage',
    async ({ messageId, messageData }, thunkAPI) => {
        try {
            const response = await instance.put(`/messages/${messageId}`, messageData);
            return response.data.updatedMessage;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getMessagesByChatroom
            .addCase(getMessagesByChatroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessagesByChatroom.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getMessagesByChatroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getMessagesByUser
            .addCase(getMessagesByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessagesByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getMessagesByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addMessage
            .addCase(addMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload);
            })
            .addCase(addMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteMessage
            .addCase(deleteMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = state.messages.filter(message => message._id !== action.payload);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateMessage
            .addCase(updateMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMessage.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.messages.findIndex(message => message._id === action.payload._id);
                if (index !== -1) {
                    state.messages[index] = action.payload;
                }
            })
            .addCase(updateMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default messageSlice.reducer;
