import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {
        setDepositWalletModal(state, action) {
            state.walletModal = action.payload;
        },
    },
});

export const { setDepositWalletModal } = discountSlice.actions;

export default discountSlice.reducer;
