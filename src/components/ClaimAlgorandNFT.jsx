import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as CloseComp } from "../assets/img/icons/close.svg";
// import Wrong from '../assets/img/Wrong.svg';
// import { CHAIN_INFO } from "./values";
import { useSelector } from "react-redux";
// import { getAddEthereumChain } from "../wallet/chains"
import { useDispatch } from "react-redux";
import { claimAlgorandPopup } from "../store/reducers/generalSlice";
import ChangeNetworkLoader from "./innercomponents/ChangeNetworkLoader";
import { useWeb3React } from "@web3-react/core";
import { parseNFTS, setClaimablesAlgorand } from "../wallet/helpers";
import { AlgorandClaimable } from "./Transactionhistory";

function ClaimAlgorandNFT() {
  const handleClose = () => {
    dispatch(claimAlgorandPopup(undefined));
  };
  const [claimable, setClaimable] = useState();
  const [claimInterval, setClaimInterval] = useState();
  // const from = useSelector(state => state.general.from)
  const algorandClaimPopup = useSelector(
    (state) => state.general.algorandClaimPopup
  );
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  console.log("algorandAccount: ", algorandAccount);
  // const account = useSelector(state => state.general.account)
  const dispatch = useDispatch();
  // const [loader, setLoader] = useState(false)
  // const { chainId } = useWeb3React()

  const handleClose = () => {
    dispatch(claimAlgorandPopup(undefined));
  };
  const [claimable, setClaimable] = useState();
  const [claimInterval, setClaimInterval] = useState();
  // const from = useSelector(state => state.general.from)
  const algorandClaimPopup = useSelector(
    (state) => state.general.algorandClaimPopup
  );
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  // const account = useSelector(state => state.general.account)
  const dispatch = useDispatch();
  // const [loader, setLoader] = useState(false)
  // const { chainId } = useWeb3React()

  const getClaimable = async () => {
    const claimables = await setClaimablesAlgorand(algorandAccount, true);

    const sameName = claimables.filter(
      (n) => n?.name === algorandClaimPopup?.name
    );
    if (sameName && sameName.length > 0) {
      const { contract, chainId, tokenId } = algorandClaimPopup.native;
      const fetched = await parseNFTS(sameName);
      const filtered = fetched.filter(
        (n) => n.wrapped.contract === contract && n.wrapped.tokenId === tokenId
      )[0];
      if (filtered) {
        setClaimable(filtered);
        clearInterval(claimInterval);
      }
    }
  };

  const toShow = () => {
    return algorandClaimPopup ? true : false;
  };

  useEffect(async () => {
    // debugger
    if (algorandClaimPopup) {
      getClaimable();
      if (claimInterval) clearInterval(claimInterval);
      const s = setInterval(() => {
        getClaimable();
      }, 3000);
      setClaimInterval(s);
      return () => clearInterval(claimInterval);
    }
  }, [algorandClaimPopup]);

  return (
    <div>
      {/* <li className="wllListItem" onClick={handleShow}><img src={MetaMask} /> MetaMask</li> */}
      <Modal
        animation={false}
        show={toShow()}
        onHide={handleClose}
        className="nftWorng"
      >
        <Modal.Header className="border-0">
          <Modal.Title>Claim Algorand NFT</Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            <CloseComp className="svgWidget" />
          </span>
        </Modal.Header>
        <Modal.Body className="modalBody text-center">
          <div className="wrongNFT claimablealgornadnftss">
            {claimable ? (
              <AlgorandClaimable nft={claimable} />
            ) : (
              <ChangeNetworkLoader />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ClaimAlgorandNFT;
