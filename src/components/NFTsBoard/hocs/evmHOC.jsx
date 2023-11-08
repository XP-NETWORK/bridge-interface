/* eslint-disable react/prop-types */
import React from "react";

import { checkXpNetLocked } from "../../../services/deposits";

import { setDiscountLeftUsd } from "../../../store/reducers/discountSlice";

import { ChainType } from "xp.network";

import DeployUserStore from "../../TransferBoard/DeployUserStore";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";

export const withEVM = (Wrapped) =>
    function CBU(props) {
        const discounts = async (dispatch, _, account) => {
            if (account) {
                const data = await checkXpNetLocked(account);
                dispatch(
                    setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25))
                );
            }
        };

        return (
            <Wrapped
                {...props}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.EVM]: {
                        DeployUserStore,
                        RenderClaimInDestination: ClaimInDestination,
                    },
                }}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                    [ChainType.EVM]: discounts,
                }}
            />
        );
    };
