/* eslint-disable react/prop-types */
import React from "react";
import { compose } from "redux";
import { withElrond as Elrond } from "./elrondHOC";
import { withAlgo as Algo } from "./algoHOC";
import { withEVM as EVM } from "./evmHOC";
import { withServices } from "../../App/hocs/withServices";

import { useSelector } from "react-redux";

import { CHAIN_INFO } from "xp.network";

const withChains = (NFTaccount) =>
  function CB(props) {
    const { chainSpecific } = props;
    const _from = useSelector((state) => state.general.from);
    const type = CHAIN_INFO.get(_from.nonce).type;

    return (
      <NFTaccount
        {...props}
        _from={_from}
        chainSpecific={chainSpecific[type]}
      />
    );
  };

export default compose(withServices, Elrond, Algo, EVM, withChains);
