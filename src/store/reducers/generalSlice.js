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
    },
    setDepartureOrDestination(state, action){
      state.departureOrDestination = action.payload
    },
    setChainSearch(state, action){
      state.chainSearch = action.payload
    }
  },
});

export const { toggleNFTInfo, 
    setTo, 
    setFrom,
    setChainModal,
    setDepartureOrDestination,
    setChainSearch
} = generalSlice.actions;

export default generalSlice.reducer;
