import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setImportModal,
  addImportedNFTtoNFTlist,
  setError,
} from "../../../store/reducers/generalSlice";
import { CHAIN_INFO } from "../../values";
import axios from "axios";
import "./importNFTModal.css";
import EVMBody from "./EVMBody";
import CosmosBody from "./CosmosBody";
import { getFactory } from "../../../wallet/helpers";
import { Chain } from "xp.network";

const SecretAuth = ({ nfts }) => {
  const dispatch = useDispatch();

  const [importBlocked, setImportBlocked] = useState(false);
  const [viewKey, setViewKey] = useState("MyViewingKey#1");
  const [contract, setContract] = useState(
    "secret1kj69tq5lxlu8vvpjtcltyu58v5476sma4sr9yk"
  );
  /// const [error, setError] = useState("");

  const { secretAccount, checkWallet } = useSelector(
    ({ general: { secretAccount, checkWallet } }) => ({
      secretAccount,
      checkWallet,
    })
  );

  const isExist = (nft) => {
    // debugger;
    const isExist = nfts.some((e) => {
      let exist;
      const {
        native: { contract, chainId, tokeId },
      } = e;
      if (
        contract === nft.native.contract &&
        chainId === nft.native.chainId &&
        tokeId === nft.native.tokeId
      ) {
        exist = true;
      }
      return exist;
    });
    return isExist;
  };

  const fetchSecretNfts = async () => {
    try {
      setImportBlocked(true);
      const factory = await getFactory();
      const secret = await factory.inner(Chain.SECRET);
      const secretNFTs = await secret.nftList(
        checkWallet || secretAccount,
        viewKey,
        contract
      );

      if (secretNFTs?.length > 0) {
        secretNFTs.forEach((nft) => {
          if (!isExist(nft)) {
            dispatch(addImportedNFTtoNFTlist(nft));
            dispatch(setImportModal(false));
            setImportBlocked(false);
          } else {
            setError("NFT exist in nft list");
            setImportBlocked(false);
          }
        });
      }
    } catch (error) {
      dispatch(setError(error.message));
      setImportBlocked(false);
      console.log(error);
    }
  };

  return (
    <div className="nftListBox">
      <div className="secretAuth">
        <h3>Private ownership </h3>
        <p>
          Your assets are protected. Please enter contract address and viewing
          key below.
        </p>
        <div className="fieldsWrapper">
          <input
            type="text"
            placeholder="Paste contract address"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          />
          <div className="inputWrapper">
            <input
              type="text"
              placeholder="Enter viewing key"
              value={viewKey}
              onChange={(e) => setViewKey(e.target.value)}
            />
          </div>
        </div>
        <div
          className="transfer-button"
          onClick={fetchSecretNfts}
          style={!importBlocked ? {} : { opacity: 0.6, pointerEvents: "none" }}
        >
          Show assets
        </div>
      </div>
    </div>
  );
};

export const withSecretAuth = (Wrapped) => (props) => {
  const { from, nfts } = useSelector(({ general: { from, NFTList } }) => ({
    from,
    nfts: NFTList,
  }));

  return !nfts?.length && from.text === "Secret" ? (
    <SecretAuth nfts={nfts} />
  ) : (
    <Wrapped {...props} />
  );
};

export default SecretAuth;
