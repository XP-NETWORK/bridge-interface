import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const tonStore = createSlice({
    name: "tonStore",
    initialState,
    reducers: {
        setTonKeeperResponse(state, action) {
            state.tonKeeperResponse = action.payload;
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
    setTonKeeperResponse,
    setQRCodeModal,
    setTonHubSession,
} = tonStore.actions;

export default tonStore.reducer;
