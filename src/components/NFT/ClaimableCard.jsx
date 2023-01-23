import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAlgorandClaimable,
  setApproveLoader,
  setNFTSetToggler,
  setTransferLoaderModal,
} from "../../store/reducers/generalSlice";

import PropTypes from "prop-types";
import { Chain } from "xp.network";
import { withServices } from "../App/hocs/withServices";

function ClaimableCard({ nft, serviceContainer }) {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  const algorandAccount = useSelector((state) => state.general.algorandAccount);

  const [isOptin, setIsOptin] = useState();
  const [chainWrapper, setChain] = useState(null);
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  useEffect(() => {
    if (bridge) {
      bridge
        .getChain(Chain.ALGORAND)
        .then((chainWrapper) => setChain(chainWrapper));
    }
  }, [bridge]);

  const checkIfOptIn = async () => {
    const isOpted = await chainWrapper.chain.isOptIn(
      algorandAccount,
      nft.nftId
    );
    setIsOptin(isOpted);
  };

  const optIn = async () => {
    dispatch(setApproveLoader(true));

    let isOpted;
    try {
      isOpted = await chainWrapper.chain.isOptIn(algorandAccount, nft.nftId);
    } catch (error) {
      console.log(error);
      dispatch(setApproveLoader(false));
    }

    if (!isOpted) {
      const signer = chainWrapper.signer;
      try {
        const optin = await chainWrapper.chain.optInNft(signer, nft);
        if (optin) {
          setIsOptin(true);
        }
      } catch (error) {
        console.log(error);
        dispatch(setApproveLoader(false));
      }
    } else {
      setIsOptin(true);
    }
    dispatch(setApproveLoader(false));
  };

  const claim = async () => {
    // debugger
    dispatch(setTransferLoaderModal(true));
    if (isOptin) {
      const signer = chainWrapper.signer;
      try {
        const c = await chainWrapper.chain.claimNft(signer, nft);
        if (c) {
          dispatch(removeAlgorandClaimable(nft.nftId));
        }
        dispatch(setNFTSetToggler());
      } catch (err) {
        dispatch(setTransferLoaderModal(false));
        console.log(err);
      }
    }
    dispatch(setTransferLoaderModal(false));
  };

  useEffect(() => {
    checkIfOptIn();
  }, []);

  return (
    <div className="image__wrapper claimable-card">
      <div className="claimable-card__wrapper">
        <div className="claimable-card__text">The NFT is not claimed</div>
        <div
          style={isOptin ? OFF : {}}
          onClick={optIn}
          className="not-whitelisted__button"
        >
          Optin
        </div>
        <div
          style={isOptin ? {} : OFF}
          onClick={claim}
          className="not-whitelisted__button"
        >
          Claim
        </div>
      </div>
    </div>
  );
}
ClaimableCard.propTypes = {
  nft: PropTypes.object,
  serviceContainer: PropTypes.object,
};

export default withServices(ClaimableCard);
