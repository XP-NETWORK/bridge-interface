import { createSlice } from "@reduxjs/toolkit";
import { chains as valuesChains } from "../../components/values";
import { biz } from "../../components/values";

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

export const chains = [
  ...valuesChains.map((c) => ({
    ...c,
    value: c.value || c.text,
  })),
]
  .filter((c) => c.mainnet || c.coming)
  .sort((a, b) => b.order - a.order)
  .sort((a, b) => (a.coming && !b.coming ? 1 : -1));

export const activeChains = [
  ...chains.filter((chain) => !chain.maintenance).map((c) => c.value),
];

export const newChains = ["Godwoken"];

export const comingSoonChains = ["Cardano", "Solana", "TON"];

export const availability = {
  Algorand: ["MyAlgo", "AlgoSigner"],
  Elrond: ["Maiar", "MaiarExtension"],
  Tron: ["TronLink"],
  Tezos: ["Beacon", "TempleWallet"],
  VeChain: ["Sync2", "VeChainThor"],
  Evms: ["MetaMask", "WalletConnect", "TrustWallet", "BitKeep"],
  Secret: ["Keplr"],
  TON: ["TonWallet", "TonHub", "TonKeeper"],
};

export const wallets = [
  "MetaMask",
  "BitKeep",
  "WalletConnect",
  "TrustWallet",
  "MyAlgo",
  "AlgoSigner",
  "TronLink",
  "Maiar",
  "Beacon",
  "TempleWallet",
  "MaiarExtension",
  "Sync2",
  "VeChainThor",
  ...(biz ? ["TonWallet"] : []),
  ...(biz ? ["TonHub"] : []),
  ...(biz ? ["TonKeeper"] : []),
  ...(biz ? ["Keplr"] : []),

  //...(biz ? ["Sync2"] : []),

  //"Ledger",
  //"Trezor",
];

export const initialChainFees = {
  chain: "",
  extraFees: 0,
  wallet: "",
};

export const initialState = {
  btnRadius: 9,
  fontSize: 16,
  backgroundColor: "#efecec",
  panelBackground: "#e6e1e1",
  modalBackground: "#efecec",
  color: "#14161a",
  btnBackground: "#395FEB",
  btnColor: "#ffffff",
  fontFamily: "Roboto",
  cardBackground: "#1e222d",
  cardBackgroundBot: "#1e222d",
  cardColor: "#ffffff",
  cardRadius: 25,
  accentColor: "#3e64ed",
  secondaryColor: "#0c0d0d",
  selectedChains: [...chains.map((c) => c.value)],
  selectedWallets: [...wallets],
  copied: null,
  borderColor: "#988b8b",
  iconColor: "#3e64ed",
  tooltipBg: "#1D212A",
  tooltipColor: "#ffffff",
  affiliationFees: 0,
  affiliationWallet: "",
  affiliationSettings: [initialChainFees],
  showAlert: false,
  showLink: true,
  collapsed: false,
  theme: "dtm",
  fromChain: "",
  toChain: "",
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    toggleTheme(state) {
      state.theme = state.theme === "dtm" ? "ltm" : "dtm";
    },
  },
});

export const { setSettings, toggleTheme } = settingSlice.actions;

export default settingSlice.reducer;
