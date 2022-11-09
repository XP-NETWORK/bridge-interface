import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const tonStore = createSlice({
    name: "tonStore",
    initialState,
    reducers: {
        setTonKeeperSession(state, action) {
            state.tonKeeperSession = action.payload;
        },
        setTonHubSession(state, action) {
            state.tonHubSession = action.payload;
        },
        setQRCodeModal(state, action) {
            state.qrCode = action.payload;
        },
    },
});

export const {
    setTonKeeperSession,
    setQRCodeModal,
    setTonHubSession,
} = tonStore.actions;

export default tonStore.reducer;
