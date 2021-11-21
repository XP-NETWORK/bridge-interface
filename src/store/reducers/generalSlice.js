import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTo(state, action) {
      state.to = action.payload;
    },
    setFrom(state, action) {
        state.from = action.payload;
    },
    setChainModal(state, action){
        state.showChainModal = action.payload;
    }
  },
});

export const { toggleNFTInfo, 
    setTo, 
    setFrom,
    setChainModal
} = generalSlice.actions;

export default generalSlice.reducer;
