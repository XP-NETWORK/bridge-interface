import { TonhubConnector } from "ton-x";

import store from "../../../store/store";
import { setQRCodeModal, setTonKeeperSession } from "./tonStore";

import axios from "axios";
import { setWalletsModal } from "../../../store/reducers/generalSlice";

var connector;

export const connectTonKeeper = async (userId) => {
  // eslint-disable-next-line no-debugger
  const api = axios.create({
    baseURL: "https://tonkeeper.xp.network",
  });

  store.dispatch(setTonKeeperSession({ userId, message: "Connect TonKeeper" }));
  store.dispatch(setWalletsModal(false));
  store.dispatch(setQRCodeModal(true));

  let session = undefined;
  let stop = false;
  const now = Date.now();
  const expried = 5 * 60 * 1000;

  while (!session && Date.now() < now + expried) {
    if (stop) return;
    await new Promise((r) => setTimeout(r, 3000));
    session = await (await api.get(`/getSession/${userId}`)).data;
  }

  return {
    signer: {
      ...session,
      sessionId: `${userId}${now.toString()}`,
    },
    address: session.address,
  };
};

encodeURIComponent;
export const connectTonHub = async (isMobile, testnet) => {
  connector = new TonhubConnector({
    network: testnet ? "sandbox" : "mainnet",
  });

  let session = await connector.createNewSession({
    name: "XP.NETWORK Cross-Chain NFT Bridge",
    url: "https://bridge.xp.network",
  });

  store.dispatch(setWalletsModal(false));
  const deepLink = session.link; //.replace("://", "tonkeeper://"); //`market://launch?id={APP_ID};` session.link.replace("ton://", "tonhub://");
  console.log(deepLink);
  !isMobile
    ? store.dispatch(setQRCodeModal(true))
    : window.open(deepLink, "_blank");

  return { connector, session };
};

export const awaitTonHubReady = async (tonHubSession) => {
  // eslint-disable-next-line no-debugger
  //const { tonHubSession } = store.getState().tonStore;
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

      TonhubConnector.verifyWalletConfig(tonHubSession.id, walletConfig);

      return {
        config: walletConfig,
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
};

export const connectTonWallet = async () => {
  if (window.ton) {
    const ton = window.ton;
    const address = (await ton.send("ton_requestWallets"))?.at(0)?.address;
    if (address) {
      return {
        address,
        signer: ton,
      };
    }
  } else {
    alert("You have to install tonWallet extension");
  }
};
