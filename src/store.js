import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import commentReducer from './slices/commentSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import chatroomReducer from './slices/chatroomSlice';
import messageReducer from './slices/messageSlice';
import foodReducer from './slices/foodSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        comment: commentReducer,
        bookmark: bookmarkReducer,
        chatroom: chatroomReducer,
        message: messageReducer,
        food: foodReducer,

    },
})