<center>
# MULTICHAIN NFT BRIDGE INTERFACE
</center>
<br />
Parsing steps to adding new blockchain to ui
<br />

-   [x] [1. Add chain to values](#1-add-the-chain-to-values)
-   [x] [2. ChainSelectBox](#2-ChainSelectBox-component)
-   [x] [3. Create new component for wallet like EVMWallet](#3-Create-new-wallet-component)

3. Create new component for wallet like EVMWallet

### 1. Add chain to values:

<hr/><br/>

<center>

## All costs you can find in xpjs: [consts](https://github.com/XP-NETWORK/xpjs/blob/secretjs/src/consts.ts)

</center>
<br/>

```javascript
export const chains = [
    {
        type: "EVM",
        key: "Ethereum",
        text: "Ethereum",
        value: "Ethereum",
        nonce: 5,
        chainId: 1,
        tnChainId: 3,
        order: -1,
        image: { avatar: true, src: Ethereum },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
];

export const chainsConfig = {
    Ethereum: {
        type: EVM,
        img: Ethereum,
        chainId: 1,
        rpc: "https://mainnet.infura.io/v3/",
        tx: "https://etherscan.io/tx/",
        testTx: "https://ropsten.etherscan.io/tx/",
        token: "ETH",
        Chain: Chain.ETHEREUM,
    },
};

export const coins = [
    "ETH", // 0
];

//TESTNET_CHAIN_INFO (for testnet)
export const TESTNET_CHAIN_INFO = {
    Ethereum: {
        nonce: 5,
        chainId: 3,
    },
};

//CHAIN_INFO (for mainnet)
export const CHAIN_INFO = {
    Ethereum: {
        nonce: 5,
        native: coins[3],
        chainId: 1,
        rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
        decimals: 1e18,
        contract: "0x2C742F65E6FEcDbb4ceE3D35473e39012aEDf3DD",
        blockExplorerUrls: "https://ropsten.etherscan.io/address/",
        testBlockExplorerUrls: "https://ropsten.etherscan.io/address/",
    },
};
```

### 2. ChainSelectBox component:

<center>

## Add chain to switch Chains function for ability to swap chains between themselves

</center>

<br/>

```javascript
const switchChains = (e) => {
    if (from.type !== to.type) {
        switch (from.type) {
            case "EVM":
                if (account) {
                    dispatch(setTemporaryFrom(to));
                    dispatch(setTemporaryTo(from));
                    dispatch(setChangeWallet(true));
                } else handleSwitch(e);
                break;
            default:
                break;
        }
    } else {
        handleSwitch(e);
    }
};
```

<br/>

### 3 Create new wallet component

<center>

## EVM wallet example

<center>

[evmwallet]: (https://github.com/XP-NETWORK/bridge-interface/blob/new-ui/src/components/Wallet/EVMWallet.jsx)

<center>

## Add component to WalletList

<center>

[WalletList]:(https://github.com/XP-NETWORK/bridge-interface/blob/new-ui/src/components/Wallet/WalletList.jsx) components

1. Values
    <!-- To add values for arrays:
    chains
    chainsConfig
    coins
    TESTNET_CHAIN_INFO (for testnet)
    CHAIN_INFO (for mainnet) -->
2. ChainSelectBox
    <!-- Add chain to switch Chains function for ability to swap chains between themselves -->
3. Create new component for wallet like EVMWallet
    <!-- Switch rendering
    Create styles to show only when departure is undefined or only when supported chains are selected -->
4. WalletList
    <!-- Add component to:
    walletComponents
    sortWallet -->
