import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import {
  setError,
  setIcpClaimSuccess,
  setIsAssociated,
  setTempleClaimed,
  setTempleWalletData,
  setTemporaryFrom,
  setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { XPDecentralizedUtility } from "../../utils/xpDecentralizedUtility";
import { Modal, Spinner } from "react-bootstrap";
import WalletList from "../Wallet/WalletList";
import { sleep } from "../../utils";
import { TIME } from "../../constants/time";

export const ClaimInDestination = (connection) => {
  return function CB({
    serviceContainer,
    fromChain,
    toChain,
    hash,
    setDestHash,
  }) {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const [fromChainWapper, setFromChainWapper] = useState(null);

    useState(async () => {
      const _from = await bridge.getChain(fromChain);

      setFromChainWapper(_from);
    }, []);

    const to = useSelector((state) => state.general.to);
    const [showModal, setShowModal] = useState(false);

    const { account, isTempleWallet } = useSelector(
      (state) => state.general.templeWalletData,
    );
    const templeIsClaimed = useSelector(
      (state) => state.general.templeIsClaimed,
    );

    const isAssociated = useSelector((state) => state.general.isAssociated);

    const handler = async () => {
      if (to.text === "Tezos") {
        dispatch(setTemporaryFrom(to));
        dispatch(setTempleWalletData({ account, isTempleWallet: true }));
        dispatch(setTempleClaimed(true));
        setShowModal(true);
        return;
      }

      dispatch(setQuietConnection(true));
      dispatch(setTransferLoaderModal(true));

      const xPDecentralizedUtility = new XPDecentralizedUtility();

      const chainWapper = await connection(bridge, toChain);
      // if (to.text === "Hedera" && destWalletAddress.includes(".")) {
      //   let signer;
      //   while (!signer?.accountToSign) {
      //     signer = hashConnect.getSigner(destWalletAddress);
      //     console.log({ signer });
      //     sleep(3000)
      //   }
      // }

      try {
        const originChainIdentifier = await bridge.getChain(fromChain);
        const targetChainIdentifier = await bridge.getChain(toChain);
        console.log("identifiers: ", {
          originChainIdentifier,
          targetChainIdentifier,
        });

        if (to?.type === "Hedera" && !isAssociated) {
          console.log("inside association");
          await xPDecentralizedUtility.associateTokens(targetChainIdentifier);
          dispatch(setIsAssociated(true));
          dispatch(setTransferLoaderModal(false));
          return;
        }

        const claimRes = await xPDecentralizedUtility.claimNFT(
          originChainIdentifier,
          bridge,
          hash,
          chainWapper,
          fromChainWapper,
        );
        if (to.text === "ICP") {
          await sleep(TIME.FIVE_SECONDS);
          const claimData = await xPDecentralizedUtility.readClaimed721Event(
            targetChainIdentifier,
            claimedHash
          );
          dispatch(setTransferLoaderModal(false));
          dispatch(
            setIcpClaimSuccess({
              showModal: true,
              canisterId: claimData?.nft_contract,
            })
          );
        } else {
          dispatch(setTransferLoaderModal(false));
        }

        const claimedHash = claimRes?.hash || claimRes;

        setDestHash(claimedHash);
      } catch (e) {
        console.log("in catch block", e);
        dispatch(setError({ message: e.message }));
        dispatch(setTransferLoaderModal(false));
      }
    };

    const inputElement = useRef(null);
    const [walletSearch, setWalletSearch] = useState("");

    const handleClose = () => {
      setShowModal(false);
      setWalletSearch("");
    };

    const handleChange = (e) => {
      if (!(e.nativeEvent.data === " " && walletSearch.length === 0)) {
        setWalletSearch(e.target.value);
      }
    };

    useEffect(() => {
      if (account?.signer && isTempleWallet && templeIsClaimed) {
        claim();
        dispatch(setTempleClaimed(false));
      }
    }, [account, isTempleWallet]);

    const claim = async () => {
      dispatch(setQuietConnection(true));
      dispatch(setTransferLoaderModal(true));

      const chainWapper = await connection(bridge, toChain, fromChain, hash);
      chainWapper.setSigner(account.signer);

      try {
        const originChainIdentifier = await bridge.getChain(fromChain);

        const xPDecentralizedUtility = new XPDecentralizedUtility();

        const { hash: claimedHash } = await xPDecentralizedUtility.claimNFT(
          originChainIdentifier,
          bridge,
          hash,
          chainWapper,
          fromChainWapper,
        );

        setDestHash(claimedHash);
        dispatch(setTransferLoaderModal(false));

        dispatch(setTemporaryFrom(""));
        dispatch(
          setTempleWalletData({
            account: {},
            isTempleWallet: false,
            isClaimed: false,
          }),
        );
      } catch (e) {
        console.log("in catch block");
        console.log(e);
        dispatch(setError({ message: e.message }));
        dispatch(setTransferLoaderModal(false));
      }
    };

    const transferModalLoader = useSelector(
      (state) => state.general.transferModalLoader,
    );

    return (
      <>
        <Modal
          show={showModal}
          onHide={handleClose}
          animation={null}
          className="ChainModal wallet-modal"
        >
          <Modal.Header>
            <Modal.Title style={{ minWidth: "max-content" }}>
              Connect Wallet
            </Modal.Title>
            <span className="CloseModal" onClick={handleClose}>
              <div className="close-modal"></div>
            </span>
          </Modal.Header>
          <div className="wallet-search__container">
            <input
              ref={inputElement}
              onChange={handleChange}
              value={walletSearch}
              className="wallet-search serchInput"
              type="text"
              placeholder="Search"
            />
            <div className="magnify"></div>
          </div>
          <Modal.Body>
            <div className="walletListBox">
              <WalletList input={walletSearch} connected={handleClose} />
            </div>
          </Modal.Body>
        </Modal>
        <button
          className="changeBtn ClaimInDestination"
          onClick={handler}
          disabled={transferModalLoader}
        >
          {to?.type !== "Hedera"
            ? "Claim"
            : isAssociated
            ? "Claim"
            : "Associate Token"}
          {transferModalLoader && (
            <Spinner animation="border" size="sm" className="ml-3" />
          )}
        </button>
      </>
    );
  };
};
