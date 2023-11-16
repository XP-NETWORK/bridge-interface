/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";

import DeployUserStore from "../../TransferBoard/DeployUserStore";

export const withCasper = (Wrapped) =>
    function CBU(props) {
        return (
            <Wrapped
                {...props}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.CASPER]: {
                        DeployUserStore,
                    },
                }}
            />
        );
    };
