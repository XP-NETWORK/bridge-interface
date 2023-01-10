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
import { Chain } from "xp.network";
import { useDidUpdateEffect, useCheckMobileScreen } from "../../Settings/hooks";
import vk from "../../../assets//img/icons/vkey.svg";
import SecretContractsDropdown from "../../Dropdowns/SecretContractsDropdown";
import PropTypes from "prop-types";

const SecretAuth = ({ setLogdIn, refreshSecret }) => {
  const dispatch = useDispatch();
  const off = { opacity: 0.6, pointerEvents: "none" };
  const [toggle, setToggle] = useState("show");
  const factory = useSelector((state) => state.general.factory);
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
    if (!secretCred.viewKey || !secretCred.contract) return;

    try {
      setImportBlocked(true);

      const secret = await factory.inner(Chain.SECRET);

      let secretNFTs = await secret.nftList(
        checkWallet || secretAccount,
        secretCred.viewKey,
        secretCred.contract
      );

      // let secretNFTs = await secret.nftList(
      //     "secret1dazpkyxaj9eau9ej0fv266vdaaxtgn9nhak6ad",
      //     secretCred.viewKey,
      //     secretCred.contract
      // );

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
      dispatch(setError({ message: error.message }));
      console.log(error);
    }
    setImportBlocked(false);
    dispatch(setBigLoader(false));
  };

  const createViewingKey = async () => {
    try {
      setImportBlocked(true);

      const secret = await factory.inner(Chain.SECRET);
      const created = await secret.setViewingKey(
        signer,
        secretCred.contract,
        secretCred.viewKey
      );
      console.log("Viewing Key was created: ", created);
      if (created) {
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
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    }
    setImportBlocked(false);
  };

  const hadleSelectToggle = (btn) => {
    switch (btn) {
      case "set":
        setToggle("set");
        dispatch(setSecretCred(initialSecretCred));
        break;
      case "show":
        setToggle("show");
        break;
      default:
        break;
    }
  };

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
        <div className="secret-toggle">
          <div
            onClick={() => hadleSelectToggle("show")}
            className={toggle === "show" ? "show--selected" : "show"}
          >
            Show assets
          </div>
          <div
            onClick={() => hadleSelectToggle("set")}
            className={toggle === "set" ? "set--selected" : "set"}
          >
            Set V-Key
          </div>
        </div>
        <div className="fieldsWrapper">
          <div className="contract-input__wrapper">
            <input
              disabled={toggle === "set" ? true : false}
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
            {toggle === "set" && <SecretContractsDropdown />}
          </div>
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
            <img className="vkey-icon" src={vk} alt="" />
          </div>
        </div>
        <div
          style={secretCred.contract && secretCred.viewKey ? {} : off}
          className="withSecret__btns"
        >
          {toggle === "show" && (
            <div
              className="transfer-button"
              onClick={fetchSecretNfts}
              style={
                !importBlocked ? {} : { opacity: 0.6, pointerEvents: "none" }
              }
            >
              Show assets
            </div>
          )}
          {toggle === "set" && (
            <div
              className="transfer-button"
              onClick={createViewingKey}
              style={
                !importBlocked ? {} : { opacity: 0.6, pointerEvents: "none" }
              }
            >
              Create V-Key
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
SecretAuth.propTypes = {
  setLogdIn: PropTypes.any,
  refreshSecret: PropTypes.any,
};

const SecretContractPanned = () => {
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
            rel="noreferrer"
            href={`${CHAIN_INFO.Secret.blockExplorerUrls}accounts/${secretCred.contract}`}
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

export const withSecretAuth = (Wrapped) =>
  function Callback(props) {
    const secretLoggedIn = useSelector((state) => state.general.secretLoggedIn);
    const { from } = useSelector(({ general: { from, NFTList } }) => ({
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
          <Wrapped {...props} secretRender={isSecret && SecretContractPanned} />
        </div>
      </div>
    );
  };
export default SecretAuth;
