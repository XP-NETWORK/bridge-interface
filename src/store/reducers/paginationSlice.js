import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentNFTs(state, action) {
            state.currentsNFTs = action.payload;
        },
    },
});

export const { setCurrentNFTs } = paginationSlice.actions;

export default paginationSlice.reducer;
