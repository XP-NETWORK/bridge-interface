/* eslint-disable no-debugger */
import { PeraWalletConnect } from "@perawallet/connect";

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

export const connectPera = async (handleDisconnect) => {
    // debugger;
    let account;
    peraWallet
        .connect()
        .then((newAccounts) => {
            // Setup the disconnect event listener
            peraWallet.connector?.on("disconnect", handleDisconnect);

            account = newAccounts[0];
        })
        .reject((error) => {
            // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
            // For the async/await syntax you MUST use try/catch
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                // log the necessary errors
            }
        });
    return { address: account, signer: peraWallet };
};
