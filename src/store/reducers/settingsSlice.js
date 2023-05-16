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

export const chains = [
    ...valuesChains.map((c) => ({
        ...c,
        value: c.key || c.text,
    })),
]
    .filter((c) => c.mainnet || c.coming || c.testNet)
    .sort((a, b) => b.order - a.order)
    .sort((a, b) => (a.coming && !b.coming ? 1 : -1));

export const activeChains = [
    ...chains.filter((chain) => !chain.maintenance).map((c) => c.key),
];

//export const newChains = ["Caduceus", "SKALE", "TON", ""];

export const comingSoonChains = ["Cardano"];

export const availability = {
    Algorand: ["MyAlgo", "AlgoSigner"],
    Elrond: ["xPortal", "MultiversX DeFi Wallet"],
    Tron: ["TronLink"],
    Tezos: ["Beacon", "TempleWallet"],
    VeChain: ["Sync2", "VeChainThor"],
    Evms: ["MetaMask", "WalletConnect", "TrustWallet", "BitKeep"],
    Secret: ["Keplr", "Fina"],
    TON: ["TonWallet", "TonHub", "TonKeeper"],
    APTOS: ["Petra"],
    NEAR: ["WalletSelector"],
    Solana: ["Phantom", "Solflare"],
};

export const wallets = [
    "MetaMask",
    "BitKeep",
    "WalletConnect",
    "TrustWallet",
    "MyAlgo",
    "AlgoSigner",
    "TronLink",
    "xPortal",
    "Beacon",
    "TempleWallet",
    "MultiversX DeFi Wallet",
    "Sync2",
    "VeChainThor",
    "TonWallet",
    "TonHub",
    "TonKeeper",
    "Phantom",
    "Solflare",
    "WalletSelector",
    "Keplr",
    "Fina",
    //...(biz ? ["Sync2"] : []),
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
    selectedChains: [...chains.map((c) => c.key)],
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
