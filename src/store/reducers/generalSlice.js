import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  selectedNFTList: [],
  NFTListView: false,
  approvedNFTList: [],
  txnHashArr: [],
  fees : 0,
  // confirmMaiarMob: false
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
      console.log("sdgfdsfgdfg");
      state.NFTList = action.payload
    },
    setSelectedNFTList(state, action){
      state.selectedNFTList = [...state.selectedNFTList, action.payload]
    },
    cleanSelectedNFTList(state, action){
      state.selectedNFTList = []
    },
    removeFromSelectedNFTList(state, action){
      const {tokenId, contract, chainId} = action.payload.native
      state.selectedNFTList = state.selectedNFTList.filter(n => !(
        n.native.tokenId === tokenId && n.native.contract === contract && n.native.chainId === chainId
      ))
    },
    setSearchNFTList(state, action){
      state.NFTListSearch = action.payload
    },
    allSelected(state){
      state.selectedNFTList = state.NFTList 
    },
    setNFTsListView(state){
      state.NFTListView = !state.NFTListView
    },
    updateApprovedNFTs(state, action) {
      const {tokenId, contract, chainId} = action.payload.native
      const isInApprovedNFTs = state.approvedNFTList.filter(n => n.native.tokenId === tokenId && n.native.contract === contract && chainId === n.native.chainId )[0]
      if(!isInApprovedNFTs)
      state.approvedNFTList = [...state.approvedNFTList, action.payload]
    },
    setApproved(state, action){
      state.approved = action.payload
    },
    setReceiver(state, action){
      state.receiver = action.payload
    },
    setTxnHash(state, action){
      state.txnHashArr = [...state.txnHashArr, action.payload]
    },
    setWrongNetwork(state, action){
      console.log("setWrongNetwork");
      state.wrongNetwork = action.payload
    },
    setMetaMaskActive(state, action){
      state.metaMaskActive = action.payload
    },
    setReset(){
      return initialState
    },
    setElrondAccount(state, action){
      state.elrondAccount = action.payload
    },
    setMaiarProvider(state, action){
      state.maiarProvider = action.payload
    },
    setOnMaiar(state, action){
      state.onMaiar = action.payload
    },
    setTronWallet(state, action){
      state.tronWallet = action.payload
    },
    setConfirmMaiarMob(state, action){
      state.confirmMaiarMob = action.payload
    },
    setSwitchDestination(state, action){
      state.switchDestination = action.payload
    },
    setAccountModal(state, action){
      state.accountModal = action.payload
    }
  },
});

export const { toggleNFTInfo, 
    setReset,
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
    allSelected,
    setNFTsListView,
    updateApprovedNFTs,
    setApproved,
    setReceiver,
    setTxnHash,
    setWrongNetwork,
    setMetaMaskActive,
    setElrondAccount,
    setMaiarProvider,
    setOnMaiar,
    setTronWallet,
    setConfirmMaiarMob,
    setSwitchDestination,
    setAccountModal
} = generalSlice.actions;

export default generalSlice.reducer;
