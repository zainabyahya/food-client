import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";

export const getAllBookmarks = createAsyncThunk(
    'bookmarks/getAllBookmarks',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get('/bookmarks');
            return response.data.allBookmarks;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const handleBookmark = createAsyncThunk(
    'bookmarks/handleBookmark',
    async (postId, thunkAPI) => {
        try {
            console.log("i am here");
            const response = await instance.post(`/bookmarks`, { postId });
            return response.data.allBookmarks;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const getBookmarksByUserId = createAsyncThunk(
    'bookmarks/getBookmarksByUserId',
    async (userId, thunkAPI) => {
        try {
            const response = await instance.get(`/bookmarks/${userId}`);
            return response.data.userBookmarks.posts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    bookmarks: [],
    userBookmarks: [],
    bookmark: {},
    loading: false,
    error: null,
};

const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookmarks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBookmarks.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmarks = action.payload;
            })
            .addCase(getAllBookmarks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(handleBookmark.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleBookmark.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmarks = action.payload;
            })
            .addCase(handleBookmark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getBookmarksByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookmarksByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.userBookmarks = action.payload;
            })
            .addCase(getBookmarksByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ;
    },
});

export default bookmarkSlice.reducer;
