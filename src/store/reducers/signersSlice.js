import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quietConnection: false,
};

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
        setWalletAddress(state, action) {
            state.walletAddress = action.payload;
        },
        setQuietConnection(state, action) {
            state.quietConnection = action.payload;
        },
    },
});

export const {
    setSigner,
    setChainFactoryConfig,
    setWalletAddress,
    setQuietConnection,
} = signersSlice.actions;

export default signersSlice.reducer;
