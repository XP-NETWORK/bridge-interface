import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const signersSlice = createSlice({
    name: "signers",
    initialState,
    reducers: {
        setSigner(state, action) {
            state.signer = action.payload;
        },
    },
});

export const { setSigner } = signersSlice.actions;

export default signersSlice.reducer;
