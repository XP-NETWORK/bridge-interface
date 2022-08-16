import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const signersSlice = createSlice({
    name: "signers",
    initialState,
    reducers: {
        setSigner(state, action) {
            state.signer = action.payload;
        },
        setChainFactoryConfig(state, action) {
            state.chainFactoryConfig = action.payload;
        },
    },
});

export const { setSigner, setChainFactoryConfig } = signersSlice.actions;

export default signersSlice.reducer;
