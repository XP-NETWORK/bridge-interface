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

export const chains = [...valuesChains]
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
  VeChain: ["Sync2"],
  Evms: ["MetaMask", "WalletConnect", "TrustWallet"],
  Secret: ["Keplr"],
};

export const wallets = [
  "MetaMask",
  ...(biz ? ["BitKeep"] : []),
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

/**
 * 
 * 
 * src="https://widget-staging.xp.network/?widget=true&background=ffffff&color=0d0d0d&fontSize=16&btnColor=ffffff&btnBackground=000000&btnRadius=9&fontFamily=Roboto&chains=BSC-xDai&cardBackground=1e222d&cardRadius=25&secondaryColor=242424&accentColor=10193d&borderColor=37405b&iconColor=000000&wallets=MetaMask-WalletConnect&bridgeState=undefined&showLink=true&cardColor=ffffff&cardBackgroundBot=3e4454&checkWallet=0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE"
 
<div style="height: 1000px; text-align: center">
<iframe src="https://widget-staging.xp.network/?widget=true&amp;background=ffffff&amp;color=0d0d0d&amp;fontSize=16&amp;btnColor=ffffff&amp;btnBackground=000000&amp;btnRadius=9&amp;fontFamily=Roboto&amp;chains=BSC-xDai&amp;cardBackground=1e222d&amp;cardRadius=25&amp;secondaryColor=242424&amp;accentColor=10193d&amp;borderColor=37405b&amp;iconColor=000000&amp;wallets=MetaMask-WalletConnect&amp;bridgeState=undefined&amp;showLink=true&amp;cardColor=ffffff&amp;cardBackgroundBot=3e4454" frameborder="0" width="80%" height="100%"></iframe>
</div>


*/
