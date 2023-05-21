import { createSlice } from "@reduxjs/toolkit";
import { chains as valuesChains } from "../../components/values";

export const fonts = [
  "Open Sans",
  "Roboto",
  "Inter",
  "Josefin Sans",
  "Lato",
  "Montserrat",
  "Mukta",
  "Playfair Display",
  "Poppins",
  "Quicksand",
  "Raleway",
  "Ubuntu",
];

export const chains = [...valuesChains];

export const activeChains = [
  ...chains.filter((chain) => !chain.maintenance).map((c) => c.value),
];

export const newChains = ["Velas"];

export const comingSoonChains = ["Cardano", "Heco", "Solana", "Tezos"];

export const availability = {
  Algorand: ["MyAlgo", "AlgoSigner"],
  Elrond: ["Maiar", "MaiarExtension"],
  Tron: ["TronLink"],
  Tezos: ["Beacon", "TempleWallet"],
  //["BSC", "Velas", "Ethereum", "Polygon", ]: ["MetaMask", "WalletConnect", "Trust Wallet", "Ledger", "Trezor"],
};

export const wallets = [
  "MetaMask",
  "WalletConnect",
  "Trust Wallet",
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

export const initialState = {
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
  selectedChains: [...chains.map((c) => c.value)],
  selectedWallets: [...wallets],
  copied: null,
  borderColor: "#37405b",
  iconColor: "#3e64ed",
  showAlert: false,
  showLink: true,
  collapsed: false,
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
