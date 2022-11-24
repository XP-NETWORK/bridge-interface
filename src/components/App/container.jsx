import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { compose } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { withNearConnection } from "../Wallet/NEARWallet/withNearConnection";
import { withServices } from "./hocs/withServices";

import { BridgeModes } from "../values";
import {
  setTestNet,
  setStaging,
  setCheckWallet,
} from "../../store/reducers/generalSlice";

import { getAndSetFactory } from "../../wallet/helpers";
import { useNavigate } from "react-router";

const Container = ({ children, serviceContainer, setContainer }) => {
  const dispatch = useDispatch();
  const factory = useSelector((state) => state.general.factory);
  const navigate = useNavigate();

  useEffect(() => {
    let network;
    if (window.location.pathname.includes(BridgeModes.Staging)) {
      network = BridgeModes.Staging;
      dispatch(setStaging(true));
    } else if (window.location.pathname.includes(BridgeModes.TestNet)) {
      network = BridgeModes.TestNet;
      dispatch(setTestNet(true));
    }
    const saveFactory = async () => {
      await Promise.all([
        serviceContainer?.bridge
          ?.init(network)
          ?.then((bridge) => setContainer({ ...serviceContainer, bridge })),
        getAndSetFactory(network),
      ]);
    };
    if (!factory) saveFactory();
    const hardcoded = new URLSearchParams(window.location.search).get(
      BridgeModes.CheckWallet
    );

    const query = window.location.search;

    dispatch(setCheckWallet(hardcoded));
    navigate(`/${network ? network + "/" : ""}connect${query || ""}`);
  }, []);

  return <>{children}</>;
};

Container.propTypes = {
  children: PropTypes.any,
  serviceContainer: PropTypes.object,
  setContainer: PropTypes.func,
};

export default compose(withServices, withNearConnection)(Container);
