import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalMinted: 0,
    success: true,
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setTotal(state, action) {
            state.totalMinted = action.payload;
        },
        setSuccess(state, action) {
            state.success = action.payload;
        },
    },
});

export const { setTotal, setSuccess } = eventSlice.actions;

export default eventSlice.reducer;
