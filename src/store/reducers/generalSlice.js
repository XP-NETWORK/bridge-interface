import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
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
    },
    setStep(state, action){
      state.step = action.payload
    },
    setMetaMask(state, action){
      state.MetaMask = action.payload
    },
    setAccount(state, action){
      state.account = action.payload
    }
  },
});

export const { toggleNFTInfo, 
    setTo, 
    setFrom,
    setChainModal,
    setDepartureOrDestination,
    setChainSearch,
    setStep,
    setAccount,
    setMetaMask
} = generalSlice.actions;

export default generalSlice.reducer;
