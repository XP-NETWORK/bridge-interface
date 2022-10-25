import { TonhubConnector } from "ton-x";
// import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnect from "@walletconnect/client";
import { TonConnectServer, AuthRequestTypes } from "@tonapps/tonconnect-server";

export const connectTonKeeper = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const staticSecret = process.env.REACT_APP_TONCONNECT_SECRET;
    const tonconnect = new TonConnectServer({
        staticSecret,
    });
    try {
        const request = tonconnect.createRequest({
            image_url:
                "https://ddejfvww7sqtk.cloudfront.net/images/landing/ton-nft-tegro-dog/avatar/image_d0315e1461.jpg",
            callback_url: `http://localhost:3000/tonconnect`,
            items: [
                {
                    type: AuthRequestTypes.ADDRESS,
                    required: true,
                },
                {
                    type: AuthRequestTypes.OWNERSHIP,
                    required: true,
                },
            ],
        });
        const encodedResponse = request.query.tonlogin.toString();
        tonconnect.decodeResponse(encodedResponse);
    } catch (error) {
        console.log(error);
    }
};

export const connectTonHub = async (testnet) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    // const TONHUB_TIMEOUT = 5 * 60 * 1000;
    const connector = new TonhubConnector({
        network: testnet ? "sandbox" : "mainnet",
    }); //Set network "sandbox" for testnet
    const { location } = document;
    const url = `${location.protocol}//${location.host}`;

    let session = await connector.createNewSession({
        name: "XP.NETWORK Cross-Chain NFT Bridge",
        url,
    });

    // const sessionId = session.id;
    // const sessionSeed = session.seed;

    try {
        const wcConnector = new WalletConnect({
            connector,
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
            qrcode: true,
            session,
            sessionId: session.id,
        });

        wcConnector.createSession();

        //     // const sessionSeed = session.seed;
        //     // const sessionLink = session.link;
        //     session = await wcConnector.awaitSessionReady(sessionId, 5 * 60 * 1000);
        //     if (session.state === "revoked" || session.state === "expired") {
        //         // Handle revoked or expired session
        //     } else if (session.state === "ready") {
        //         // Handle session
        //         const walletConfig = session.walletConfig;

        //         // You need to persist this values to work with this connection:
        //         // * sessionId
        //         // * sessionSeed
        //         // * walletConfig

        //         // You can check signed wallet config on backend using TonhubConnector.verifyWalletConfig.
        //         // walletConfig is cryptographically signed for specific session and other parameters
        //         // you can safely use it as authentication proof without the need to sign something.
        //         const correctConfig = TonhubConnector.verifyWalletConfig(
        //             sessionId,
        //             walletConfig
        //         );
        //         console.log(correctConfig);
        //         // ...
        //     } else {
        //         throw new Error("Impossible");
        //     }
    } catch (error) {
        console.log("Ton Hub:", error);
    }
};
