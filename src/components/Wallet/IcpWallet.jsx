import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getChainObject } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";

import { getRightPath } from "../../utils";

import { withServices } from "../App/hocs/withServices";

import { Chain } from "xp.network";
import {
  setAccount,
  setError,
  setFrom,
  setAuthModalLoader,
} from "../../store/reducers/generalSlice";

import plugIcon from "../../assets/img/wallet/plug.svg";
import stoic from "../../assets/img/wallet/stoic.svg";
import bitfinity from "../../assets/img/wallet/bitfinity.svg";
//import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function IcpWallet({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const isMobile = useCheckMobileScreen();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToAccountRoute = () => {
    navigate(getRightPath(bridge.network));
  };

  const connectPlugType = async (wallet, name, chainWrapper) => {
    const { ic } = window;

    const provider = ic[wallet];

    if (!provider) {
      dispatch(
        setError({
          message: `You have to install ${name} wallet into your browser`,
        })
      );
      return;
    }

    const account = {};

    await provider
      .requestConnect({
        host: "https://tools.xp.network/",
        whitelist: [
          "ryjl3-tyaaa-aaaaa-aaaba-cai",
          chainWrapper.chain.getParams().bridgeContract.toText(),
        ],
        timeout: 6e4,
      })
      .catch((e) => {
        console.log(e, "em");
        dispatch(setError(e));
      });

    const principalId = await provider.getPrincipal();

    account.address = principalId.toText();
    account.signer = provider;

    if (!provider.createAgent) {
      chainWrapper.chain.setActorCreator(provider);
      account.signer.agent = {};
      return account;
    }

    const prepareAgent = async (canisterId) => {
      await provider.createAgent({
        host: "https://tools.xp.network/",
        whitelist: [
          "ryjl3-tyaaa-aaaaa-aaaba-cai",
          canisterId,
          chainWrapper.chain.getParams().bridgeContract.toText(),
        ],
      });
    };
    chainWrapper.prepareAgent = prepareAgent;

    return account;
  };

  const connectors = {
    Bitfinity: async (chainWrapper) => {
      return await connectPlugType("infinityWallet", "Bitfinity", chainWrapper);
    },
    Plug: async (chainWrapper) => {
      return await connectPlugType("plug", "Plug", chainWrapper);
    },
    Stoic: async () => {
      const lib = await import("ic-stoic-identity");
      const { StoicIdentity } = lib;
      return new Promise((resolve) => {
        StoicIdentity.load().then(async (identity) => {
          if (identity !== false) {
            //ID is a already connected wallet!
          } else {
            //No existing connection, lets make one!
            identity = await StoicIdentity.connect();
          }

          //Lets display the connected principal!
          const account = {};
          //console.log(identity.getPrincipal().toText());
          account.address = identity.getPrincipal().toText();
          account.signer = identity;

          resolve(account);
        });
      });
    },
  };

  const onClickHandler = async (wallet) => {
    try {
      dispatch(setAuthModalLoader(true));

      const [chainWrapper] = await Promise.all([
        bridge.getChain(Chain.DFINITY),
      ]);

      const connect = connectors[wallet];
      const account = await connect(chainWrapper);
      dispatch(setAuthModalLoader(false));
      if (!account) return;

      chainWrapper.setSigner(account.signer);
      bridge.setCurrentType(chainWrapper);

      dispatch(setAccount(account.address));

      if (!from) dispatch(setFrom(getChainObject(Chain.DFINITY)));

      if (from && to) navigateToAccountRoute();
    } catch {
      dispatch(setAuthModalLoader(false));
    }
  };

  const getStyle = () => {
    return {};
  };

  return (
    <>
      <li
        style={isMobile ? { display: "none" } : getStyle()}
        onClick={() => onClickHandler("Bitfinity")}
        className="wllListItem keplr"
        data-wallet="Bitfinity"
      >
        <img src={bitfinity} alt="Bitfinity" />
        <p>Bitfinity</p>
      </li>
      <li
        style={isMobile ? { display: "none" } : getStyle()}
        onClick={() => onClickHandler("Plug")}
        className="wllListItem keplr"
        data-wallet="Plug"
      >
        <img src={plugIcon} alt="Plug" />
        <p>Plug</p>
      </li>

      <li
        style={isMobile ? { display: "none" } : getStyle()}
        onClick={() => onClickHandler("Stoic")}
        className="wllListItem keplr"
        data-wallet="Stoic"
      >
        <img src={stoic} alt="Plug" />
        <p>Stoic</p>
      </li>
    </>
  );
}

export default withServices(IcpWallet);
