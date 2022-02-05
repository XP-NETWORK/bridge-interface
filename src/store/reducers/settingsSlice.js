import { createSlice } from "@reduxjs/toolkit";

export const chains = [
  "Velas",
  "Ethereum",
  "BSC",
  "Polygon",
  "Algorand",
  "Tron",
  "Elrond",
  "Avalanche",
  "Fantom",
  "xDai",
  "Fuse",
  "Cardano",
  "Heco",
  "Solana",
  "Tezos",
];

export const activeChains = [
  "Velas",
  "Ethereum",
  "BSC",
  "Polygon",
  "Algorand",
  "Tron",
  "Elrond",
  "Avalanche",
  "Fantom",
  "xDai",
  "Fuse",
];

export const newChains = ["Velas"];

export const comingSoonChains = ["Cardano", "Heco", "Solana", "Tezos"];

export const availability = {
  Algorand: ["MyAlgo", "AlgoSigner"],
  Elrond: ["Maiar", "MaiarExtension"],
  Tron: ["TronLink"],
  Tezos: ["Beacon", "TempleWallet"],
  //["BSC", "Velas", "Ethereum", "Polygon", ]: ["MetaMask", "WalletConnect", "TrustWallet", "Ledger", "Trezor"],
};

export const wallets = [
  "MetaMask",
  "WalletConnect",
  "TrustWallet",
  "MyAlgo",
  "AlgoSigner",
  "TronLink",
  "Maiar",
  "Beacon",
  "TempleWallet",
  "MaiarExtension",
  "Ledger",
  "Trezor",
];

const initialState = {
  btnRadius: 9,
  fontSize: 16,
  backgroundColor: "#1D212A",
  color: "#ffffff",
  btnBackground: "#3e64ed",
  btnColor: "#ffffff",
  fontFamily: "Roboto",
  cardBackground: "#1e222d",
  cardRadius: 25,
  accentColor: "#3e64ed",
  secondaryColor: "#62718a",
  selectedChains: [...chains],
  selectedWallets: [...wallets],
  copied: null,
  borderColor: "#37405b",
  iconColor: "#3e64ed",
  showAlert: false,
  showLink: true,
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action) {
      return action.payload;
    },
  },
});

export const { setSettings } = settingSlice.actions;

export default settingSlice.reducer;
