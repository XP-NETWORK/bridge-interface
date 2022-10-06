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
        setDiscountLeftUsd(state, action) {
            state.discountLeftUsd = action.payload;
        },
        setDiscountOn(state, action) {
            state.discountOn = action.payload;
        },
        setUseDiscount(state, action) {
            state.useDiscount = action.payload;
        },
    },
});

export const {
    setUseDiscount,
    setDiscountOn,
    setDiscountLeftUsd,
    setDepositWalletModal,
    setDepositAlert,
    setSpend,
} = discountSlice.actions;

export default discountSlice.reducer;
