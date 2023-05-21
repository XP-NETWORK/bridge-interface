/* eslint-disable no-debugger */
import React, { useEffect, useState } from "react";
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
// import { validateFunctions } from "../../../services/addressValidators";
import "./importNFTModal.css";
import { Chain, CHAIN_INFO } from "xp.network";
import { useCheckMobileScreen } from "../../Settings/hooks";
import vk from "../../../assets//img/icons/vkey.svg";
// import SecretContractsDropdown from "../../Dropdowns/SecretContractsDropdown";
import PropTypes from "prop-types";

import { withServices } from "../../App/hocs/withServices";

const SecretAuth = ({ setLogdIn, serviceContainer }) => {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  const off = { opacity: 0.6, pointerEvents: "none" };
  const [toggle, setToggle] = useState("set");
  const [validContract, setValidContract] = useState(true);
  // const [contract, setContract] = useState();
  const [contractOnBlur, setContractOnBlur] = useState(false);
  const [importBlocked, setImportBlocked] = useState(false);
  const { account, checkWallet, secretCred, NFTSetToggler, from } = useSelector(
    ({
      general: { account, checkWallet, secretCred, NFTSetToggler, from },
    }) => ({
      account,
      checkWallet,
      secretCred,
      NFTSetToggler,
      from,
    })
  );
  const fetchSecretNfts = async () => {
    if (!secretCred.viewKey || !secretCred.contract) return;

    try {
      setImportBlocked(true);
      const chainWrapper = await bridge.getChain(Chain.SECRET);

      let secretNFTs = await chainWrapper.chain.nftList(
        checkWallet || account,
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
      dispatch(setError({ message: error.message }));
      console.log(error);
    }
    setImportBlocked(false);
    dispatch(setBigLoader(false));
  };

  const createViewingKey = async () => {
    // debugger;
    try {
      setImportBlocked(true);
      const x = await bridge.getChain(Chain.SECRET);

      const created = await x.chain.setViewingKey(
        x.signer,
        secretCred.contract,
        secretCred.viewKey
      );
      console.log("Viewing Key was created: ", created);
      if (created) {
        let secretNFTs = await x.getNFTs(checkWallet || account, secretCred);
        secretNFTs = x.filterNFTs(secretNFTs);
        dispatch(addImportedNFTtoNFTlist(secretNFTs));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
    setImportBlocked(false);
  };

  const handleContractChange = (value) => {
    value = value.trim();
    let count = 0;
    let lastChar = "";
    for (let i = 0; i < value.length; i++) {
      const currentChar = value[i];
      if (currentChar === lastChar) {
        count++;
        if (count > 3) {
          return;
        }
      } else {
        count = 1;
        lastChar = currentChar;
      }
    }
    dispatch(setSecretCred({ ...secretCred, contract: value }));
    if (value.length === 0 || (value.length === 45 && value.startsWith("secret1"))) {
      setValidContract(true);
    } else {
      setValidContract(false);
    }
  };

  const hadleSelectToggle = (btn) => {
    switch (btn) {
      case "set":
        setToggle("set");
        break;
      case "show":
        setToggle("show");
        dispatch(setSecretCred(initialSecretCred));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    from?.key === "Secret" && fetchSecretNfts();
  }, [NFTSetToggler]);

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
            {/* <input
              // disabled={toggle === "set" ? true : false}
              type="text"
              placeholder="Paste contract address"
              value={secretCred.contract}
              onChange={()=>{setContractOnBlur(true)}}
              onBlur={(e) =>
                dispatch(
                  setSecretCred({
                    ...secretCred,
                    contract: e.target.value,
                  })
                )
              }
            /> */}
            <input
              onBlur={() => setContractOnBlur(true)}
              onChange={(e) => {
                handleContractChange(e.target.value);
                setContractOnBlur(true);
              }}
              type="text"
              id="contractAdd"
              name="contractAddress"
              placeholder="Paste Contract Address"
              value={secretCred.contract}
              className={
                validContract
                  ? "contract__input--valid"
                  : "contract__input--invalid"
              }
            />
            {contractOnBlur && !validContract && (
              <span className={"contract--invalid"}>
                Error Contract Address
              </span>
            )}
            {/* {toggle === "set" && <SecretContractsDropdown />} */}
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
  serviceContainer: PropTypes.object,
};

export const SecretContractPanned = () => {
  const { secretCred } = useSelector(({ general: { secretCred } }) => ({
    secretCred,
  }));

  const dispatch = useDispatch();

  const isMobile = useCheckMobileScreen();
  const chain = CHAIN_INFO.get(Chain.SECRET);

  return (
    <div className="scretPannelWrap">
      <div className="scretPannel">
        <p>
          <span>Contract: </span>
          <a
            target="_blank"
            rel="noreferrer"
            href={`${chain.blockExplorerUrlAddr}${secretCred.contract}`}
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
  withServices(function Callback(props) {
    const secretLoggedIn = useSelector((state) => state.general.secretLoggedIn);
    const { from } = useSelector(({ general: { from, NFTList } }) => ({
      from,
      nfts: NFTList,
    }));

    const dispatch = useDispatch();

    const isSecret = from.key === "Secret";

    const renderAuth = isSecret && !secretLoggedIn;

    return (
      <div className={isSecret ? "secretContainer" : ""}>
        <div style={renderAuth ? {} : { display: "none" }}>
          <SecretAuth
            serviceContainer={props.serviceContainer}
            setLogdIn={(val) => dispatch(setSecretLoggedIn(val))}
          />
        </div>
        <div style={!renderAuth ? {} : { display: "none" }}>
          <Wrapped
            {...props}
            // secretRender={isSecret && SecretContractPanned}
          />
        </div>
      </div>
    );
  });

export default SecretAuth;
