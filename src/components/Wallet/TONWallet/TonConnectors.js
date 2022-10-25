import { TonhubConnector } from "ton-x";
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";

export const connectTonHub = async (testnet) => {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
        const connector = new TonhubConnector({
            network: testnet ? "testnet" : "mainnet",
        });
        let session = await connector.createNewSession({
            name: "XP.Network",
            url: "https://bridge.xp.network/",
        });
        const sessionId = session.id;
        // const sessionSeed = session.seed;
        // const sessionLink = session.link;
        session = await connector.awaitSessionReady(sessionId, 5 * 60 * 1000);
        if (session.state === "revoked" || session.state === "expired") {
            // Handle revoked or expired session
        } else if (session.state === "ready") {
            // Handle session
            const walletConfig = session.walletConfig;

            // You need to persist this values to work with this connection:
            // * sessionId
            // * sessionSeed
            // * walletConfig

            // You can check signed wallet config on backend using TonhubConnector.verifyWalletConfig.
            // walletConfig is cryptographically signed for specific session and other parameters
            // you can safely use it as authentication proof without the need to sign something.
            const correctConfig = TonhubConnector.verifyWalletConfig(
                sessionId,
                walletConfig
            );
            console.log(correctConfig);
            // ...
        } else {
            throw new Error("Impossible");
        }
    } catch (error) {
        console.log("Ton Hub:", error);
    }
};
