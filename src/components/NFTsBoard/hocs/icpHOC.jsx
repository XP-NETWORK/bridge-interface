import React, { useState } from "react";
import { ChainType, CHAIN_INFO, Chain } from "xp.network";
import { useDispatch, useSelector } from "react-redux";
import { setPreFetchData } from "../../../store/reducers/generalSlice";
import { useCheckMobileScreen } from "../../Settings/hooks";
import { StringShortener } from "../../../utils";

const CollectionPannel = () => {
    const { preFetchData } = useSelector(({ general: { preFetchData } }) => ({
        preFetchData,
    }));

    //const dispatch = useDispatch();

    const isMobile = useCheckMobileScreen();

    const chain = CHAIN_INFO.get(Chain.DFINITY);

    return (
        <div className="scretPannelWrap collectionPannelWrap">
            <div className="collectionPannel">
                <p>
                    <span>Contract: </span>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${chain.blockExplorerUrlAddr}${preFetchData.contract}`}
                    >
                        {isMobile
                            ? StringShortener(preFetchData.contract, 10)
                            : preFetchData.contract}
                    </a>
                </p>
                <div
                    className="clear-selected"
                    onClick={() => {
                        /*dispatch(cleanSelectedNFTList());
          dispatch(setSecretCred(initialSecretCred));
          dispatch(setSecretLoggedIn(false));*/
                    }}
                >
                    Change contract
                </div>
            </div>
        </div>
    );
};

const PreNftFech = ({ show }) => {
    const dispatch = useDispatch();

    const [input, setInput] = useState();
    const handleLoadAssets = () => {
        if (!input) return;
        dispatch(
            setPreFetchData({
                contract: input,
            })
        );
    };

    return (
        <div className={`nftListBox preNftFetch ${show && "hidden"}`}>
            <div className="preScreen">
                <h3>NFT canister</h3>
                <p>Please enter canister address below.</p>

                <div className="fieldsWrapper">
                    <div className="contract-input__wrapper">
                        <input
                            onBlur={() => {}}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            id="contractAdd"
                            name="contractAddress"
                            placeholder="Paste Canister Address"
                            value={input}
                            className={""}
                        />
                        {/*contractOnBlur && !validContract && (
            <span className={"contract--invalid"}>
              Error Contract Address
            </span>
          )*/}
                        {/* {toggle === "set" && <SecretContractsDropdown />} */}
                    </div>
                </div>
                <div className="buttonContainer">
                    <div className="transfer-button" onClick={handleLoadAssets}>
                        Load assets
                    </div>
                    <div className="transfer-button secondary">
                        Show Default collections
                    </div>
                </div>
            </div>
        </div>
    );
};

export const withICP = (Wrapped) =>
    function CBU(props) {
        return (
            <Wrapped
                {...props}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.DFINITY]: { PreNftFech, CollectionPannel },
                }}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                }}
            />
        );
    };
