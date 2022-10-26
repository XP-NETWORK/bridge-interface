import { TonhubConnector } from "ton-x";
// import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnect from "@walletconnect/client";
import { TonConnectServer, AuthRequestTypes } from "@tonapps/tonconnect-server";
import store from "../../../store/store";
import { setQRCodeModal, setTonKeeperResponse } from "./tonStore";
import TonWeb from "tonweb";
import { setSigner } from "../../../store/reducers/signersSlice";

const staticSecret = process.env.REACT_APP_TONCONNECT_SECRET;
const tonconnect = new TonConnectServer({
    staticSecret,
});

export const connectTonKeeper = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { location } = document;
    const connectLink = `https://app.tonkeeper.com/ton-login/${location.host}`;
    try {
        const response = tonconnect.createRequest({
            image_url:
                "https://ddejfvww7sqtk.cloudfront.net/images/landing/ton-nft-tegro-dog/avatar/image_d0315e1461.jpg",
            callback_url: connectLink,
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
        store.dispatch(setTonKeeperResponse(response));
        store.dispatch(setQRCodeModal(true));
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const awaitReadiness = async (session) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const response = tonconnect.decodeResponse(session);
    console.log(response);
};

export const connectTonHub = async (testnet) => {
    // eslint-disable-next-line no-debugger
    debugger;
    // const TONHUB_TIMEOUT = 5 * 60 * 1000;
    const connector = new TonhubConnector({
        network: testnet ? "sandbox" : "mainnet",
    }); //Set network "sandbox" for testnet
    const { location } = document;
    const url = `${location.protocol}/${location.host}`;

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

const createKeyPairTonWallet = async () => {
    // debugger
    // 1. Use tonweb-mnemonic to generate random 24 words which determine the secret key.
    // These words will be compatible with TON wallet applications, i.e. using them you will be able to import your account into third-party applications.

    return TonWeb.utils.nacl.sign.keyPair();
};

export const connectTonWallet = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const keyPair = await createKeyPairTonWallet();
    const tonweb = new TonWeb();

    // There are standard wallet smart contracts that everyone uses.
    // There are several versions, at the moment wallet v3R2 is default.

    const WalletClass = tonweb.wallet.all.v3R2;

    const wallet = new WalletClass(tonweb.provider, {
        publicKey: keyPair.publicKey,
    });
    store.dispatch(setSigner(wallet));

    // Wallet address depends on key pair and smart contract code.
    // So for different versions of the smart contract you will get a different address, although the key pair is the same.
    // Let's get the wallet address (offline operation):

    /** @type {Address} */
    const address = await wallet.getAddress();

    // The address can be displayed in different formats
    // More on https://ton.org/docs/#/howto/step-by-step?id=_1-smart-contract-addresses

    const account = address.toString(true, true, true); // print address in default format. In 99% of cases this format is used in UI applications.
    return account;
    // We did everything offline and there is no our wallet smart contract on the network yet.
    // To deploy it, we first need to send Toncoins to the address.
    // Then when you want to send Toncoins from wallet to someone else - along with this first outgoing transfer, the deployment of the wallet smart contract will happen automatically.
};
