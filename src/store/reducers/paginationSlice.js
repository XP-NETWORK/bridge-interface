import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentNFTs(state, action) {
            state.currentsNFTs = action.payload;
        },
        setEachNFT(state, action) {
            const { nftObj, index } = action.payload;
            state.currentsNFTs = state.currentsNFTs.map((n, i) => {
                if (i === index) n = nftObj;
                return n;
            });
        },
    },
});

export const { setCurrentNFTs, setEachNFT } = paginationSlice.actions;

export default paginationSlice.reducer;
