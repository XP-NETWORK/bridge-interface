/* eslint-disable react/prop-types */
import BigNumber from "bignumber.js";
import React from "react";

import { setHederaClaimables } from "../../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import { ChainType, Chain } from "xp.network";

import { withServices } from "../../App/hocs/withServices";

const CheckClaimables = withServices(({ serviceContainer }) => {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  const getClaimables = () => {
    bridge.getChain(Chain.HEDERA).then((wrapper) => {
      const hashConnect = wrapper.signer.hashconnect;
      const cb = async (payload) => {
        if (!payload) return;
        const message = await hashConnect.messages.decode(payload, hashConnect);
        if (!message.data?.receipt) return;
        if (message.data?.receipt) {
          let notEmpty = true;
          let index = 1;
          const tokens = [];
          while (notEmpty) {
            const claimableIndex = new Uint8Array(
              Buffer.from(message.data.receipt, "base64")
            ).subarray(
              (index != null ? index : 0) * 32,
              (index != null ? index : 0) * 32 + 32
            );
            const token = Buffer.from(claimableIndex).toString("hex");
            token && tokens.push(token);

            if (!token) notEmpty = false;
            index++;
          }
          console.log(tokens);
          hashConnect.relay.payload.off(cb);
          tokens.filter((token) => !new BigNumber(token).eq(0));
          tokens.length && dispatch(setHederaClaimables(tokens));
          //tokens.length && (await wrapper.claim(tokens[0]));

          //token && dispatch(setClaimable(token));
        }
      };
      hashConnect.relay.payload.on(cb);
      wrapper.getClaimables();
    });
  };
  return (
    <button className="hederaCheckClaimBtn" onClick={getClaimables}>
      Check Claimables
    </button>
  );
});

const RenderClaimables = withServices(({ serviceContainer }) => {
  const { bridge } = serviceContainer;
  const hederaClaimables = useSelector(
    (state) => state.general.hederaClaimables
  );

  const clickClaim = (token) => {
    bridge.getChain(Chain.HEDERA).then((wrapper) => wrapper.claim(token));
  };

  return (
    <>
      {Array.isArray(hederaClaimables) &&
        hederaClaimables.map((item) => (
          <div key={item} className="nft-box__wrapper">
            <div className="nft__card--selected claimable-card__wrapper">
              <div className="claimable-card__text">The NFT is not claimed</div>
              {new BigNumber(item).toString()}
              <div
                onClick={() => clickClaim(item)}
                style={{ background: "black" }}
                className="not-whitelisted__button"
              >
                Claim
              </div>
            </div>
          </div>
        ))}
    </>
  );
});

export const withHedera = (Wrapped) =>
  function CBU(props) {
    return (
      <Wrapped
        {...props}
        //algorandAccount={algorandAccount}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.HEDERA]: { CheckClaimables, RenderClaimables },
        }}
        chainSpecific={{
          ...(props.chainSpecific || {}),
        }}
      />
    );
  };
