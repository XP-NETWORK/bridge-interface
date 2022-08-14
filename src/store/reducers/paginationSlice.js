import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setIsEmpty(state, action) {
            state.empty = action.payload;
        },
        setScrollToggler(state) {
            state.scrollToggler = !state.scrollToggler;
        },
    },
});

export const { setIsEmpty, setScrollToggler } = paginationSlice.actions;

export default paginationSlice.reducer;
