import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Elrond from "../../assets/img/chain/multiverseX.png";
import Maiar from "../../assets/img/wallet/Maiar.svg";

import {
  setAccount,
  setError,
  setQrCodeString,
  setConfirmMaiarMob,
  setOnMaiar,
  setQrImage,
  setFrom,
} from "../../store/reducers/generalSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { withServices } from "../App/hocs/withServices";
import { Chain } from "xp.network";
import QRCode from "qrcode";
import {
  WalletConnectProvider,
  ProxyProvider,
  ExtensionProvider,
} from "@elrondnetwork/erdjs";

import { chains, getChainObject } from "../../components/values";
import { getRightPath } from "../../wallet/helpers";

function ElrondWallet({ wallet, close, serviceContainer }) {
  const { bridge } = serviceContainer;
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const to = useSelector((state) => state.general.to);
  // const testnet = useSelector((state) => state.general.testNet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const query = window.location.search || "";

  const handleConnect = async (wallet) => {
    try {
      const chainWrapper = await bridge.getChain(from?.nonce || Chain.ELROND);

      let account = {};

      switch (wallet) {
        case "Maiar": {
          await new Promise((r) => {
            (async () => {
              const provider = new ProxyProvider("https://gateway.elrond.com");
              const maiarProvider = new WalletConnectProvider(
                provider,
                "https://bridge.walletconnect.org/"
              );
              await maiarProvider.init();

              maiarProvider.onClientConnect = {
                onClientLogin: async () => {
                  const addess = await maiarProvider.getAddress();
                  account.address = addess;
                  account.signer = maiarProvider;
                  dispatch(setConfirmMaiarMob(true));
                  dispatch(setOnMaiar(true));
                  dispatch(setQrImage(null));
                  !from &&
                    dispatch(
                      setFrom(
                        chains.find((chain) => chain.nonce === Chain.ELROND)
                      )
                    );
                  r();
                },
                onClientLogout: async () => {
                  chainWrapper.setSigner(null);
                  dispatch(
                    setError({
                      message:
                        "You have disconnected from Maiar, in order to transfer assets please login again",
                    })
                  );
                },
              };

              const qrCodeString = await maiarProvider.login();
              dispatch(setQrCodeString(qrCodeString));
              const qr = await QRCode.toDataURL(qrCodeString);
              dispatch(setQrImage(qr));
            })();
          });
          break;
        }
        case "Maiar Extension": {
          const instance = ExtensionProvider.getInstance();
          await instance
            .init()
            .catch(() => window.open("https://getmaiar.com/defi", "_blank"));
          await instance.login();
          const {
            account: { address },
          } = instance;
          if (account?.name === "CanceledError") {
            throw new Error("CanceledError");
          }
          account.address = address;
          account.signer = instance;
          break;
        }
      }

      console.log(account, "account");
      dispatch(setAccount(account.address));
      chainWrapper.setSigner(account.signer);
      bridge.setCurrentType(chainWrapper);
      close();
      if (to) navigateToAccountRoute();
      if (!from) {
        dispatch(setFrom(getChainObject(Chain.ELROND)));
      }
    } catch (e) {
      dispatch(setError(e));
    }
  };

  const navigateToAccountRoute = () => {
    navigate(getRightPath());
  };

  const getStyle = () => {
    if (temporaryFrom?.type === "Elrond") {
      return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "Elrond") {
      return OFF;
    } else if (!from) {
      return {};
    } else if (from && from.type === "Elrond") {
      return {};
    } else return OFF;
  };

  return wallet === "Maiar" ? (
    <li
      style={getStyle()}
      onClick={() => handleConnect("Maiar")}
      className="wllListItem"
      data-wallet="Maiar"
    >
      <img src={Maiar} alt="" />
      <p>Maiar</p>
    </li>
  ) : (
    <li
      style={getStyle()}
      onClick={() => handleConnect("Maiar Extension")}
      className="wllListItem"
      data-wallet="MultiversX DeFi Wallet"
    >
      <img src={Elrond} alt="Elrond Icon" />
      <p>MultiversX DeFi Wallet</p>
    </li>
  );
}
ElrondWallet.propTypes = {
  close: PropTypes.any,
  wallet: PropTypes.string,
  serviceContainer: PropTypes.object,
};

export default withServices(ElrondWallet);
