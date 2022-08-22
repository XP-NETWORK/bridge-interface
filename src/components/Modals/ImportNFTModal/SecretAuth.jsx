import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImportedNFTtoNFTlist,
  setError,
  setBigLoader,
  setSecretLoggedIn,
  setSecretCred,
  initialSecretCred,
  cleanSelectedNFTList,
} from "../../../store/reducers/generalSlice";
import { CHAIN_INFO } from "../../values";
import "./importNFTModal.css";
import { getFactory } from "../../../wallet/helpers";
import { Chain } from "xp.network";
import { useDidUpdateEffect, useCheckMobileScreen } from "../../Settings/hooks";

const SecretAuth = ({ setLogdIn, refreshSecret }) => {
  const dispatch = useDispatch();

  const [importBlocked, setImportBlocked] = useState(false);
  const signer = useSelector((state) => state.signers.signer);
  //MyViewingKey#1

  //secret146snljq0kjsva7qrx4am54nv3fhfaet7srx4n2
  /// const [error, setError] = useState("");

  const { secretAccount, checkWallet, secretCred } = useSelector(
    ({ general: { secretAccount, checkWallet, secretCred } }) => ({
      secretAccount,
      checkWallet,
      secretCred,
    })
  );

  const fetchSecretNfts = async () => {
    try {
      setImportBlocked(true);
      const factory = await getFactory();
      const secret = await factory.inner(Chain.SECRET);
      let secretNFTs = await secret.nftList(
        checkWallet || secretAccount,
        secretCred.viewKey,
        secretCred.contract
      );

      secretNFTs = secretNFTs.map((nft) => ({
        ...nft,
        metaData: !nft?.uri
          ? {
              ...nft?.metaData,
              image: nft?.metaData?.media[0]?.url,
              imageFormat: nft?.metaData?.media[0]?.extension,
            }
          : null,
      }));
      dispatch(addImportedNFTtoNFTlist(secretNFTs));

      setLogdIn(true);
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error);
    }
    setImportBlocked(false);
    dispatch(setBigLoader(false));
  };

  // const checkFunc = async () => {
  //     await signer.tx.snip721();
  // };

  useDidUpdateEffect(() => {
    fetchSecretNfts();
  }, [refreshSecret]);

  return (
    <div className="nftListBox withSecret">
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
            value={secretCred.contract}
            onChange={(e) =>
              dispatch(
                setSecretCred({
                  ...secretCred,
                  contract: e.target.value,
                })
              )
            }
          />
          <div className="inputWrapper">
            <input
              type="text"
              placeholder="Enter viewing key"
              value={secretCred.viewKey}
              onChange={(e) =>
                dispatch(
                  setSecretCred({
                    ...secretCred,
                    viewKey: e.target.value,
                  })
                )
              }
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
//sdfsdfsdf

const SecretContractPannel = () => {
  const { secretCred } = useSelector(({ general: { secretCred } }) => ({
    secretCred,
  }));

  const dispatch = useDispatch();

  const isMobile = useCheckMobileScreen();

  return (
    <div className="scretPannelWrap">
      <div className="scretPannel">
        <p>
          <span>Contract: </span>
          <a
            target="_blank"
            href={`${CHAIN_INFO.Secret.blockExplorerUrl}accounts/${secretCred.contract}`}
          >
            {isMobile
              ? `${secretCred.contract.slice(
                  0,
                  5
                )}...${secretCred.contract.slice(-6)}`
              : secretCred.contract}
          </a>
        </p>
        <div
          className="clear-selected"
          onClick={() => {
            dispatch(cleanSelectedNFTList());
            dispatch(setSecretCred(initialSecretCred));
            dispatch(setSecretLoggedIn(false));
          }}
        >
          Change contract
        </div>
      </div>
    </div>
  );
};

export const withSecretAuth = (Wrapped) => (props) => {
  const secretLoggedIn = useSelector((state) => state.general.secretLoggedIn);
  const { from, nfts } = useSelector(({ general: { from, NFTList } }) => ({
    from,
    nfts: NFTList,
  }));

  const dispatch = useDispatch();
  const refreshSecret = useSelector((state) => state.general.refreshSecret);

  const isSecret = from.text === "Secret";

  const renderAuth = isSecret && !secretLoggedIn;

  return (
    <div className={isSecret ? "secretContainer" : ""}>
      <div style={renderAuth ? {} : { display: "none" }}>
        <SecretAuth
          refreshSecret={refreshSecret}
          setLogdIn={(val) => dispatch(setSecretLoggedIn(val))}
        />
      </div>
      <div style={!renderAuth ? {} : { display: "none" }}>
        <Wrapped {...props} secretRender={isSecret && SecretContractPannel} />
      </div>
    </div>
  );
};

export default SecretAuth;
