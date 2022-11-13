import { createSlice } from "@reduxjs/toolkit";

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initialState = {
  tonKeeperSession: {
    userId: getRandomArbitrary(1000, 99999),
  },
};

const tonStore = createSlice({
  name: "tonStore",
  initialState,
  reducers: {
    setTonKeeperSession(state, action) {
      console.log(action);
      state.tonKeeperSession = action.payload;
    },
    setTonHubSession(state, action) {
      state.tonHubSession = action.payload;
    },
    setQRCodeModal(state, action) {
      state.qrCode = action.payload;
    },
    setActiveTonWalletConnection(state, action) {
      state.activeConnection = action.payload;
    },
  },
});

export const {
  setActiveTonWalletConnection,
  setTonKeeperSession,
  setQRCodeModal,
  setTonHubSession,
} = tonStore.actions;

export default tonStore.reducer;
