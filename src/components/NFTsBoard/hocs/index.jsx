/* eslint-disable react/prop-types */
import React from "react";
import { compose } from "redux";
import { withElrond as Elrond } from "./elrondHOC";
import { withAlgo as Algo } from "./algoHOC";
import { withEVM as EVM } from "./evmHOC";
import { withHedera as Hedera } from "./hederaHOC";
import { withICP as ICP } from "./icpHOC";
import { withServices } from "../../App/hocs/withServices";

import { useSelector } from "react-redux";

import { CHAIN_INFO } from "xp.network";

const withChains = (NFTaccount, options = {}) =>
    function CB(props) {
        const { withDestinationChains } = options;
        const { chainSpecific, chainSpecificRender } = props;
        const _chain = useSelector((state) =>
            withDestinationChains ? state.general.to : state.general.from
        );
        const type = CHAIN_INFO.get(_chain.nonce).type;

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
    ICP,
    Elrond,
    Algo,
    EVM,
    withChains
);
