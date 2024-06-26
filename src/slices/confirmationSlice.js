import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";

export const createConfirmation = createAsyncThunk(
    'confirmation/createConfirmation',
    async (confirmationData, thunkAPI) => {
        console.log("🚀 ~ confirmationData:", confirmationData)
        try {
            console.log("i am here------------------------");
            const response = await instance.post('/confirmation', confirmationData);
            console.log("🚀 ~ response.data.newConfirmation:", response.data.newConfirmation)

            return response.data.newConfirmation;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateConfirmation = createAsyncThunk(
    'confirmation/updateConfirmation',
    async (confirmationData, thunkAPI) => {
        console.log("🚀 ~ confirmationData:", confirmationData)

        try {
            const response = await instance.put(`/confirmation/${confirmationData.confirmationId}`, confirmationData);
            return response.data.confirmation;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const checkConfirmationloading = createAsyncThunk(
    'confirmation/checkConfirmationloading',
    async (confirmationId, thunkAPI) => {
        try {
            const response = await instance.get(`/confirmation/${confirmationId}/loading`);
            return response.data.loading;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getConfirmationByPostId = createAsyncThunk(
    'confirmation/getConfirmationByPostId',
    async (postId, thunkAPI) => {
        try {
            const response = await instance.get(`/confirmation/post/${postId}`);
            return response.data.confirmation;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getConfirmationByUsersIds = createAsyncThunk(
    'confirmation/getConfirmationByUsersIds',
    async (users, thunkAPI) => {
        console.log("🚀 ~ users:", users)
        try {
            const response = await instance.get(`/confirmation/users`, users);
            return response.data.confirmation;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Slice
const confirmationSlice = createSlice({
    name: 'confirmation',
    initialState: {
        confirmation: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createConfirmation
            .addCase(createConfirmation.pending, (state) => {
                state.loading = true;
            })
            .addCase(createConfirmation.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmation = action.payload;
            })
            .addCase(createConfirmation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateConfirmation
            .addCase(updateConfirmation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateConfirmation.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmation = action.payload;
            })
            .addCase(updateConfirmation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // checkConfirmationloading
            .addCase(checkConfirmationloading.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkConfirmationloading.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(checkConfirmationloading.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getConfirmationByPostId
            .addCase(getConfirmationByPostId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getConfirmationByPostId.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmation = action.payload;
            })
            .addCase(getConfirmationByPostId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getConfirmationByUsersIds
            .addCase(getConfirmationByUsersIds.pending, (state) => {
                state.loading = true;
            })
            .addCase(getConfirmationByUsersIds.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmation = action.payload;
            })
            .addCase(getConfirmationByUsersIds.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload;
            });
    }
});

export default confirmationSlice.reducer;
