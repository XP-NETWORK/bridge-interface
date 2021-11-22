import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  selectedNFTList:[],
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
    },
    setNFTList(state, action){
      state.NFTList = action.payload
    },
    setSelectedNFTList(state, action){
      state.selectedNFTList = [...state.selectedNFTList, action.payload]
    },
    cleanSelectedNFTList(state, action){
      state.selectedNFTList = []
    },
    removeFromSelectedNFTList(state, action){
      state.selectedNFTList = state.selectedNFTList.filter((n,i) => i !== action.payload)
    },
    setSearchNFTList(state, action){
      state.NFTListSearch = action.payload
    },
    allSelected(state){
      state.selectedNFTList = state.NFTList 
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
    setMetaMask,
    setNFTList,
    setSelectedNFTList,
    cleanSelectedNFTList,
    removeFromSelectedNFTList,
    setSearchNFTList,
    allSelected
} = generalSlice.actions;

export default generalSlice.reducer;
