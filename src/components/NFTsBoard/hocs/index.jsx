/* eslint-disable react/prop-types */
import React from "react";
import { compose } from "redux";
import { withElrond as Elrond } from "./elrondHOC";
import { withTezos as Tezos } from "./tezosHOC";
import { withAlgo as Algo } from "./algoHOC";
import { withEVM as EVM } from "./evmHOC";
import { withHedera as Hedera } from "./hederaHOC";
import { withICP as ICP } from "./icpHOC";
import { withCasper as Casper } from "./casperHOC";
import { withTon as Ton } from "./tonHOC";
import { withServices } from "../../App/hocs/withServices";
import { withCosmos as Cosmos } from "./cosmosHOC";

import { useSelector } from "react-redux";

import { v3_ChainId } from "../../../utils/chainsTypes";

const withChains = (NFTaccount, options = {}) =>
  function CB(props) {
    const { withDestinationChains } = options;
    const { chainSpecific, chainSpecificRender } = props;
    const _chain = useSelector((state) =>
      withDestinationChains ? state.general.to : state.general.from
    );
    const type = v3_ChainId[_chain.nonce].type;

    return (
      <NFTaccount
        {...props}
        _from={_chain}
        chainSpecific={chainSpecific[type]}
        chainSpecificRender={chainSpecificRender[type]}
      />
    );
  };

export default compose(
  withServices,
  Hedera,
  Casper,
  ICP,
  Elrond,
  Tezos,
  Cosmos,
  Ton,
  Algo,
  EVM,
  withChains
);