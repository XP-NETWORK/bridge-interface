import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const tonStore = createSlice({
    name: "tonStore",
    initialState,
    reducers: {
        setTonKeeperResponse(state, action) {
            state.tonKeeperResponse = action.payload;
        },
        setQRCodeModal(state, action) {
            state.qrCode = action.payload;
        },
    },
});

export const { setTonKeeperResponse, setQRCodeModal } = tonStore.actions;

export default tonStore.reducer;
