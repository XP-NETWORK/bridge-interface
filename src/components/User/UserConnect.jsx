import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import {
  setAccountModal,
  setFrom,
  setUnsupportedNetwork,
  setWalletsModal,
} from "../../store/reducers/generalSlice";
import { setSigner } from "../../store/reducers/signersSlice";
import { chains } from "../values";
import Identicon from "./Identicon";
import { setDepositWalletModal } from "../../store/reducers/discountSlice";
import PropTypes from "prop-types";

export default function UserConnect({ mobile }) {
  const dispatch = useDispatch();
  const to = useSelector((state) => state.general.to);

  const WCProvider = useSelector((state) => state.general.WCProvider);
  const _account = useSelector((state) => state.general.account);
  const innerWidth = useSelector((state) => state.general.innerWidth);

  const bitKeep = useSelector((state) => state.general.bitKeep);

  const { account, chainId } = useWeb3React();

  const testnet = useSelector((state) => state.general.testNet);

  const location = useLocation();

  const walletAccount = _account;

  const handleConnect = () => {
    switch (location.pathname) {
      case "/discounts":
        if (!walletAccount) {
          dispatch(setDepositWalletModal(true));
        } else if (walletAccount) dispatch(setAccountModal(true));
        break;
      default:
        if (!walletAccount) {
          dispatch(setWalletsModal(true));
        } else if (walletAccount) dispatch(setAccountModal(true));
        break;
    }
  };

  const getAccountString = () => {
    if (innerWidth >= 425) {
      return `${walletAccount.substring(0, 5)}...${walletAccount.substring(
        walletAccount.length - 4
      )}`;
    } else if (innerWidth >= 375) {
      return `${walletAccount.substring(0, 4)}...${walletAccount.substring(
        walletAccount.length - 4
      )}`;
    } else if (innerWidth >= 320) {
      return `${walletAccount.substring(0, 3)}...${walletAccount.substring(
        walletAccount.length - 4
      )}`;
    }
  };

  const getChain = async (id) => {
    if (testnet) {
      return chains.find((chain) => chain.tnChainId === id);
    } else {
      return chains.find((chain) => chain.chainId === id);
    }
  };

  const handleChangeAccountOrChainId = async (hex) => {
    const hexToDecimal = (hex) => parseInt(hex, 16);
    const decimal = hexToDecimal(hex);
    const chainConnected = await getChain(decimal);

    switch (true) {
      case testnet:
        if (
          !chainConnected?.testNet ||
          !chains.some((chain) => chain.tnChainId === decimal)
        ) {
          dispatch(setUnsupportedNetwork(true));
        } else if (decimal === to.tnChainId) {
          dispatch(setUnsupportedNetwork(true));
        } else {
          dispatch(setUnsupportedNetwork(false));
          dispatch(setFrom(chainConnected));
        }
        break;
      default:
        if (
          !chainConnected?.mainnet ||
          !chains.some((chain) => chain?.chainId === decimal)
        ) {
          dispatch(setUnsupportedNetwork(true));
        } else if (decimal === to.chainId) {
          dispatch(setUnsupportedNetwork(true));
        } else {
          dispatch(setUnsupportedNetwork(false));
          dispatch(setFrom(chainConnected));
        }
        break;
    }
  };

  useEffect(() => {
    if (bitKeep && _account) {
      window.bitkeep?.ethereum?.on("chainChanged", (chainId) => {
        handleChangeAccountOrChainId(chainId);
      });

      window.bitkeep?.ethereum?.on("accountsChanged", () => {
        handleChangeAccountOrChainId();
      });
    } else {
      if (account) {
        window.ethereum.on("chainChanged", (chainId) => {
          handleChangeAccountOrChainId(chainId);
        });

        window.ethereum.on("accountsChanged", () => {
          handleChangeAccountOrChainId();
        });
      }
    }
  }, []);

  useEffect(() => {
    if (account && WCProvider) {
      const provider = new ethers.providers.Web3Provider(
        WCProvider?.walletConnectProvider || window.ethereum
      );
      const signer = provider.getSigner(account);
      dispatch(setSigner(signer));
    }
  }, [chainId, WCProvider]);


  /*useEffect(() => {
    if (!account && WalletConnect) {
      active !== undefined && window.location.reload();
    }

    dispatch(setAccount(account));
  }, [active]);*/

  return (
    <div
      onClick={handleConnect}
      className={`${
        walletAccount ? "navbar-connect connected" : "navbar-connect"
      } ${mobile ? "xmobile_only" : "xdesktop_only"}`}
    >
      {walletAccount ? getAccountString() : "Connect Wallet"}
      {walletAccount && <Identicon account={walletAccount} />}
    </div>
  );
}
UserConnect.propTypes = {
  desktop: PropTypes.bool,
  mobile: PropTypes.bool,
};
