import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hederaQuietConnection: false,
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
        setHederaQuietConnection(state, action) {
            state.hederaQuietConnection = action.payload;
        },
    },
});

export const {
    setSigner,
    setChainFactoryConfig,
    setWalletAddress,
    setHederaQuietConnection,
} = signersSlice.actions;

export default signersSlice.reducer;
