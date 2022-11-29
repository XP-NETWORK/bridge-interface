/* eslint-disable react/prop-types */
import React from "react";
import { compose } from "redux";
import { withElrond as Elrond } from "./elrondHOC";
import { withAlgo as Algo } from "./algoHOC";
import { withServices } from "../../App/hocs/withServices";

import { useSelector } from "react-redux";

const withChains = (NFTaccount) =>
  function CB(props) {
    const _from = useSelector((state) => state.general.from);

    return (
      <NFTaccount
        {...props}
        _from={_from}
        chainSpecific={props.chainSpecific[_from.nonce]}
      />
    );
  };

export default compose(withServices, Elrond, Algo, withChains);
