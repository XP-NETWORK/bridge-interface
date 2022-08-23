import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {
        setDepositWalletModal(state, action) {
            state.walletModal = action.payload;
        },
        setDepositAlert(state, action) {
            state.depositAlert = action.payload;
        },
        setSpend(state, action) {
            state.spend = action.payload;
        },
    },
});

export const {
    setDepositWalletModal,
    setDepositAlert,
    setSpend,
} = discountSlice.actions;

export default discountSlice.reducer;
