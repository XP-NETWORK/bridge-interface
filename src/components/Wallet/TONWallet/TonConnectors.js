import { TonhubConnector } from "ton-x";
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// import WalletConnect from "@walletconnect/client";
import { TonConnectServer, AuthRequestTypes } from "@tonapps/tonconnect-server";
import tonMnemonic from "tonweb-mnemonic";

import store from "../../../store/store";
import {
  setQRCodeModal,
  setTonHubSession,
  setTonKeeperResponse,
} from "./tonStore";

import TonWeb from "tonweb";
// import { setSigner } from "../../../store/reducers/signersSlice";

const staticSecret = process.env.REACT_APP_TONCONNECT_SECRET;
const tonconnect =
  false &&
  new TonConnectServer({
    staticSecret,
  });

var connector;

export const connectTonKeeper = async () => {
  // eslint-disable-next-line no-debugger
  debugger;
  // const { location } = document;
  const connectLink = `bridge.xp.network/tonconnect`;
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
  connector = new TonhubConnector({
    network: testnet ? "sandbox" : "mainnet",
  });

  let session = await connector.createNewSession({
    name: "XP.NETWORK Cross-Chain NFT Bridge",
    url: "https://bridge.xp.network",
  });
  store.dispatch(setTonHubSession(session));
  store.dispatch(setQRCodeModal(true));
};

export const awaitTonHubReady = async () => {
  // eslint-disable-next-line no-debugger
  // debugger;
  const { tonHubSession } = store.getState().tonStore;
  const newSession = await connector.awaitSessionReady(
    tonHubSession.id,
    1 * 60 * 1000
  );

  try {
    if (newSession.state === "revoked" || newSession.state === "expired") {
      // Handle revoked or expired session
    } else if (newSession.state === "ready") {
      // Handle session
      const walletConfig = newSession.wallet;
      // You need to persist this values to work with this connection:
      // * sessionId
      // * sessionSeed
      // * walletConfig
      // You can check signed wallet config on backend using TonhubConnector.verifyWalletConfig.
      // walletConfig is cryptographically signed for specific session and other parameters
      // you can safely use it as authentication proof without the need to sign something.

      TonhubConnector.verifyWalletConfig(tonHubSession.id, walletConfig);

      console.log(walletConfig);
      const pk = walletConfig.walletConfig.split("pk=")[1].split(",")[0];

      var enc = new TextEncoder();

      const wallet = new TonWeb.Wallets.all.v3R2(
        new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC"),
        {
          publicKey: enc.encode(pk),
          wc: 0,
        }
      );
      console.log(wallet);
      return {
        signer: wallet,
        address: walletConfig.address,
      };
      // ...
    } else {
      throw new Error("Impossible");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  //return newSession;
};

// const createKeyPairTonWallet = async () => {
//     mnemonic
//     // debugger
//     // 1. Use tonweb-mnemonic to generate random 24 words which determine the secret key.
//     // These words will be compatible with TON wallet applications, i.e. using them you will be able to import your account into third-party applications.

//     return TonWeb.utils.nacl.sign.keyPair();
// };

export const connectTonWallet = async () => {
  const tonweb = new TonWeb();

  const seed = await tonMnemonic(staticSecret);
  const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(seed);
  const publicKey = keyPair.publicKey;
  const wallet = tonweb.wallet.create({ publicKey });
  const address = await wallet.getAddress();
  const nonBounceableAddress = address.toString(true, true, false);
  console.log({ nonBounceableAddress });
  console.log(await tonweb);
};

// export const connectTonWallet = async () => {
//     // eslint-disable-next-line no-debugger
//     debugger;
//     const keyPair = await createKeyPairTonWallet();
//     const tonweb = new TonWeb();

//     // There are standard wallet smart contracts that everyone uses.
//     // There are several versions, at the moment wallet v3R2 is default.

//     const WalletClass = tonweb.wallet.all.v3R2;

//     const wallet = new WalletClass(tonweb.provider, {
//         publicKey: keyPair.publicKey,
//     });
//     store.dispatch(setSigner(wallet));

//     // Wallet address depends on key pair and smart contract code.
//     // So for different versions of the smart contract you will get a different address, although the key pair is the same.
//     // Let's get the wallet address (offline operation):

//     /** @type {Address} */
//     const address = await wallet.getAddress();

//     // The address can be displayed in different formats
//     // More on https://ton.org/docs/#/howto/step-by-step?id=_1-smart-contract-addresses

//     const account = address.toString(true, true, true); // print address in default format. In 99% of cases this format is used in UI applications.
//     return account;
//     // We did everything offline and there is no our wallet smart contract on the network yet.
//     // To deploy it, we first need to send Toncoins to the address.
//     // Then when you want to send Toncoins from wallet to someone else - along with this first outgoing transfer, the deployment of the wallet smart contract will happen automatically.
// };
