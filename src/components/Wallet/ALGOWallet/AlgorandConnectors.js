/* eslint-disable no-debugger */
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";

export const AlgorandChainIDs = {
    MainNet: 416001,
    TestNet: 416002,
};

export const peraWallet = new PeraWalletConnect({
    // Default chainId is "4160"
    chainId: window.location.pathname.includes("testnet")
        ? AlgorandChainIDs.TestNet
        : AlgorandChainIDs.MainNet,
});

export const connectPera = async (chain) => {
    // debugger;
    let account;
    try {
        const addresses = await peraWallet.connect();
        account = addresses[0];
    } catch (error) {
        console.log(error);
    }
    const signer = await chain.myAlgoSigner(peraWallet, account);
    console.log({ account });
    return { address: account, signer };
};

export const connectAlgoSigner = async (testnet) => {
    if (window.AlgoSigner) {
        try {
            await window.AlgoSigner.connect();
            const algo = await window.AlgoSigner.accounts({
                ledger: testnet ? "TestNet" : "MainNet",
            });
            const address = algo[0].address;
            const signer = {
                address: algo[0],
                algoSigner: window.AlgoSigner,
                ledger: testnet ? "TestNet" : "MainNet",
            };
            return { signer, address };
        } catch (e) {
            console.error(e);
            return JSON.stringify(e, null, 2);
        }
    } else {
        console.log("Algo Signer not installed.");
        return false;
    }
};

export const connectMyAlgo = async (chain) => {
    const myAlgoConnect = new MyAlgoConnect();
    try {
        const accountsSharedByUser = await myAlgoConnect.connect();
        const address = accountsSharedByUser[0].address;

        const signer = await chain.myAlgoSigner(myAlgoConnect, address);

        return { signer, address };
    } catch (error) {
        console.log(error);
        return false;
    }
};

// peraWallet
// .connect()
// .then((newAccounts) => {
//     // Setup the disconnect event listener
//     peraWallet.connector?.on("disconnect", handleDisconnect);

//     account = newAccounts[0];
// })
// .reject((error) => {
//     // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
//     // For the async/await syntax you MUST use try/catch
//     if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
//         // log the necessary errors
//     }
// });
