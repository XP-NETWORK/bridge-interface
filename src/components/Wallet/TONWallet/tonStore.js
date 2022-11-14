import { createSlice } from "@reduxjs/toolkit";

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initTonKeeperSession = {
  userId: getRandomArbitrary(1000, 99999),
};

const initialState = {
  tonKeeperSession: initTonKeeperSession,
  tonHubSession: undefined,
};

const tonStore = createSlice({
  name: "tonStore",
  initialState,
  reducers: {
    setTonKeeperSession(state, action) {
      state.tonHubSession = initialState.tonHubSession;
      state.tonKeeperSession = action.payload;
    },
    setTonHubSession(state, action) {
      state.tonKeeperSession = initialState.tonKeeperSession;
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
