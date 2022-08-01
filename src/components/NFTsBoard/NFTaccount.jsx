import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import { Modal } from "react-bootstrap";
import ImportNFTModal from "../Modals/ImportNFTModal/ImportNFTModal";
import {
  setBalance,
  setError,
  setWrappedEGold,
  cleanSelectedNFTList,
  setUnwrappedEGold,
} from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlgorandClaimables,
  getFactory,
  setNFTS,
} from "../../wallet/helpers";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
import MobileTransferBoard from "../TransferBoard/MobileTransferBoard";
import "./NFTsBoard.css";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal";
import UnsupportedNetwork from "../Modals/ChangeNetwork/UnsupportedNetwork";
import SelectNFTAler from "../Alerts/SelectNFTAler";
import PasteDestinationAlert from "../Alerts/PasteDestinationAlert";
import NoApprovedNFT from "../Alerts/NoApprovedNFT";
import { usePrevious } from "../Settings/hooks";
import { chainsConfig } from "../values";
import ImportNFTButton from "../Buttons/ImportNFTButton";

import WalletConnectionModal from "../Wallet/WalletConnectionModal";
import ChangeWalletModal from "../Modals/ChangeWallet/ChangeWalletModal";

import NFTscreen from "./NFTscreen";
import NFTmobileView from "./NFTmobileView";

import { SecretNetworkClient } from "secretjs";
import EGoldSuccess from "./../Modals/eGoldSuccess/EGoldSuccess";

import UserConnect from "../User/UserConnect";
import AccountModal from "../Modals/AccountModal/AccountModal";

function NFTaccount() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from.key);
  const _from = useSelector((state) => state.general.from);
  const prevSelected = usePrevious(from);
  const type = useSelector((state) => state.general.from.type);
  const algorandAccount = useSelector((s) => s.general.algorandAccount);
  const nfts = useSelector((state) => state.general.NFTList);

  const importModal = useSelector((state) => state.general.importModal);
  const algorandClaimables = useSelector(
    (state) => state.general.algorandClaimables
  );
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const prevAccount = usePrevious(account);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const secretAccount = useSelector((state) => state.general.secretAccount);
  const NFTSetToggler = useSelector((state) => state.general.NFTSetToggler);
  const prevNFTSetToggler = usePrevious(NFTSetToggler);
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const wrappedEGold = useSelector((state) => state.general.wrappedEGold);
  const unwrappedEGold = useSelector((state) => state.general.unwrappedEGold);

  const accountWalletModal = useSelector(
    (state) => state.general.accountWalletModal
  );
  const prevWrappedEGold = usePrevious(wrappedEGold);
  //keplrWallet
  const keplrWallet = useSelector((state) => state.general.keplrWallet);

  const widget = useSelector((state) => state.general.widget);
  // const [balanceInterval, setBalanceInterval] = useState();
  let balanceInterval = useRef(null);

  //Anjelika - 0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE
  //Anjelika elrond - erd1s89aq3s0z6mjfpx8s85zntlfywsvj5r8nzcdujw7mx53f9et9ezq9fnrws
  //Dima. U - 0x6449b68cc5675f6011e8DB681B142773A3157cb9
  // -||- vechain 0x124fBa3250c8d72FBcb5b5712d0dF48c33E6C1F6, 0x124fBa3250c8d72FBcb5b5712d0dF48c33E6C1F6
  // Dima.B - 0x0d7df42014064a163DfDA404253fa9f6883b9187
  //
  // ????? - 0x3Aa485a8e745Fc2Bd68aBbdB3cf05B58E338D7FE

  async function getNFTsList(str) {
    const useHardcoded = false;
    const hard = "tz1fZ7KC2be1zjUkWThhws2Gsmg99m2wY5Mt";
    try {
      const w = useHardcoded
        ? hard
        : type === "EVM" || type === "VeChain"
        ? account
        : type === "Tezos"
        ? tezosAccount
        : type === "Algorand"
        ? algorandAccount
        : type === "Elrond"
        ? elrondAccount
        : type === "Tron"
        ? tronWallet
        : undefined;
      await setNFTS(w, from, undefined, "account");
    } catch (error) {
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  const getWegldBalance = async () => {
    if (elrondAccount && !prevWrappedEGold) {
      try {
        const factory = await getFactory();
        const elronfFactory = await factory.inner(chainsConfig[from].Chain);
        const weGoldBalance = await elronfFactory.wegldBalance(elrondAccount);
        if (weGoldBalance) dispatch(setWrappedEGold(weGoldBalance));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getBalance = async () => {
    let _account =
      account ||
      algorandAccount ||
      tezosAccount ||
      elrondAccount ||
      tronWallet ||
      secretAccount;
    const factory = await getFactory();
    const fromChain = await factory.inner(chainsConfig[from].Chain);
    let balance;
    let balanceToShow;

    !balance &&
      setTimeout(async () => {
        try {
          balance = factory
            ? await factory.balance(fromChain, _account)
            : undefined;

          switch (_from.type) {
            case "EVM":
              balanceToShow = balance / 1e18;
              dispatch(setBalance(Number(balanceToShow)));
              break;
            case "Tezos":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Tron":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Algorand":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Elrond":
              dispatch(setBalance(balance / 1e18));
              break;
            case "VeChain":
              dispatch(setBalance(balance / 1e18));
              break;
            case "Cosmos":
              dispatch(setBalance(balance / 1e6));
              break;
            default:
              break;
          }
          return balance;
        } catch (error) {
          console.log(error);
        }
      }, 3000);
  };

  useEffect(() => {
    const checkIfDataLoaded = async () => {
      if (!nfts?.some((nft) => nft.dataLoaded)) {
        await getNFTsList();
      }
    };
    checkIfDataLoaded();
    const checkAlgorand = async () => {
      if (
        algorandAccount &&
        !algorandClaimables?.some((nft) => nft.dataLoaded)
      ) {
        await getAlgorandClaimables(algorandAccount);
      }
    };
    checkAlgorand();
    getBalance();

    if (from === "Elrond") {
      getWegldBalance();
    }
    balanceInterval = setInterval(() => getBalance(), 5000);
    return () => clearInterval(balanceInterval);
  }, []);

  useEffect(() => {
    clearInterval(balanceInterval);
    const getNFTList = async () => {
      if (nfts && prevSelected !== from) {
        await getNFTsList();
      } else if (nfts && prevAccount !== account) {
        await getNFTsList();
      } else if (nfts && NFTSetToggler !== prevNFTSetToggler) {
        await getNFTsList();
      }
    };
    getNFTList();
    getBalance();
    balanceInterval = setInterval(() => getBalance(), 5000);
    dispatch(cleanSelectedNFTList());
    return () => clearInterval(balanceInterval);
  }, [from, account, NFTSetToggler]);

  // useEffect(() => {
  //     document.addEventListener(
  //         "keydown",
  //         async (event) => {
  //             if (event.code === "Numpad4") {
  //                 const f = await getFactory();

  //                 const fromChain = await f.inner(chainsConfig[from].Chain);

  //                 console.log(keplrWallet, "fromChain");

  //                 // const a = await keplrWallet.tx.snip721.setViewingKey(
  //                 //     {
  //                 //         contractAddress:
  //                 //             "secret146snljq0kjsva7qrx4am54nv3fhfaet7srx4n2",
  //                 //         sender: secretAccount,
  //                 //         msg: {
  //                 //             set_viewing_key: {
  //                 //                 key: "MyViewingKey#1",
  //                 //             },
  //                 //         },
  //                 //     },
  //                 //     {
  //                 //         gasLimit: "1000000",
  //                 //     }
  //                 // );

  //                 // const a = await f.mint(fromChain, keplrWallet, {
  //                 //     url:
  //                 //         "https://wnfts.xp.network/w/30429570476105310976966757785",
  //                 // });
  //             }
  //         },
  //         false
  //     );
  // }, []);

  return (
    <div className="NFTaccount">
      <Modal
        show={importModal}
        animation={false}
        className=" ChainModal import-nft__modal"
      >
        <ImportNFTModal />
      </Modal>
      <Modal
        show={accountWalletModal}
        // onHide={handleClose}
        animation={false}
        className="ChainModal wallet-modal"
      >
        <WalletConnectionModal />
      </Modal>
      <Modal
        show={unwrappedEGold}
        animation={false}
        className="eGold-success ChainModal"
      >
        <EGoldSuccess />
      </Modal>
      <ChangeNetworkModal />
      <ChangeWalletModal />
      <UnsupportedNetwork />
      <SelectNFTAler />
      <PasteDestinationAlert />
      <NoApprovedNFT />
      <Container className="nftSlectContaine">
        <ReturnBtn />
        {widget && (
          <>
            <UserConnect />
            {window.innerWidth < 760 && <UserConnect mobile={true} />}
            <AccountModal />
          </>
        )}
        <div className="row">
          <div className="nftListCol col-lg-8">
            <NFTscreen />
            <MobileTransferBoard />
          </div>
          <DesktopTransferBoard />
        </div>
        <NFTmobileView selectedNFTs={selectedNFTs} _from={_from} nfts={nfts} />
      </Container>
    </div>
  );
}

export default NFTaccount;
