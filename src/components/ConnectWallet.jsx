import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Close from "../assets/img/icons/close.svg";
import NFTworng from "./NFTworng";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { algoConnector } from "../wallet/connectors";
import {
  setAccount,
  setAlgorandWallet,
  setStep,
  setWrongNetwork,
  setAlgorandAccount,
  setQrCodeString,
} from "../store/reducers/generalSlice";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../components/values";
import MaiarModal from "./MaiarModal";
import EVMWallet from "./Wallet/EVMWallet";
import TezosWallet from "./Wallet/TezosWallet";
import AlgorandWallet from "./Wallet/AlgorandWallet";
import TronWallet from "./Wallet/TronWallet";
import ElrondWallet from "./Wallet/ElrondWallet";
import USBWallet from "./Wallet/USBWallet";

function ConnectWallet() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const [show, setShow] = useState();
  const qrCodeString = useSelector((state) => state.general.qrCodeString);
  const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
  const handleClose = () => {
    setShow(false);
    if (qrCodeImage) {
      dispatch(setQrCodeString(""));
    }
  };
  const handleShow = () => setShow(true);
  const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
  const templeWallet = useSelector((state) => state.general.templeWallet);
  const metaMask = useSelector((state) => state.general.MetaMask);
  const tronLink = useSelector((state) => state.general.tronLink);
  const trustWallet = useSelector((state) => state.general.trustWallet);
  const AlgoSigner = useSelector((state) => state.general.AlgoSigner);
  const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
  const onWC = useSelector((state) => state.general.WalletConnect);
  const MaiarWallet = useSelector((state) => state.general.onMaiar);
  const { chainId, account } = useWeb3React();
  const testnet = useSelector((state) => state.general.testNet);
  const MyAlgo = useSelector((state) => state.general.MyAlgo);

  // const modalError = useSelector(state => state.generalerror)
  // const [strQR, setStrQr] = useState()
  // const [qrCodeString, setQqrCodeString] = useState()
  // const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
  // const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
  // Tezos.setWalletProvider(wallet);

  //   function getMobOps() {
  //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  //     if (/android/i.test(userAgent)) {
  //         return true
  //     }
  // }

  //! onMaiarExtension connection  < Removed to ConnectWalletHelper >.
  // const onMaiarExtension = async () => {
  //   // debugger
  //   const instance = ExtensionProvider.getInstance()
  //   try {
  //     await instance.init()
  //     await instance.login()
  //     const { account } = instance
  //     dispatch(setOnMaiar(true))
  //     dispatch(setElrondAccount(account.address))
  //     dispatch(setMaiarProvider(instance))
  //   }
  //   catch(err) {
  //     window.open('https://getmaiar.com/defi', '_blank');
  //     console.log(err)
  //   }
  // }

  //! MetaMask connection  < Removed to ConnectWalletHelper >.
  // const onInjected = async () => {

  //     try {
  //         if(!window.ethereum && window.innerWidth <= 600) {
  //             const uri = `https://metamask.app.link/dapp/${window.location.host + `?to=${to.text}&from=${from.text}`}/`
  //           window.open(uri)
  //         }
  //         await activate(injected);
  //         dispatch(setMetaMask(true))
  //       }
  //       catch (ex) {
  //           dispatch(setError(ex))
  //           if(ex.data){
  //             console.log(ex.data.message);
  //           }
  //           else console.log(ex);
  //       }
  //       setShow(false)
  // }

  //! onAlgoWallet connection  < Removed to ConnectWalletHelper >.
  // const onAlgoWallet = async () => {
  //   if (!algoConnector.connected) {
  //       algoConnector.createSession()
  //   }
  // }

  //! onTrustWallet connection  < Removed to ConnectWalletHelper >.
  // const onTrustWallet = async () => {

  //   try {
  //     if(!window.ethereum && window.innerWidth <= 600){
  //       const uri = `https://link.trustwallet.com/open_url?coin_id=60&url=https://${window.location.host + `?to=${to.text}&from=${from.text}`}/`
  //       window.open(uri)
  //     }
  //     await activate(injected);
  //     dispatch(setTrustWallet(true))
  //   }
  //   catch (error) {
  //     dispatch(setError(error))
  //     if(error.data){
  //       console.log(error.data.message);
  //     }
  //     else console.log(error);
  //   }
  //   setShow(false)
  // }

  // const generateQR = async text => {
  //     try {
  //       const QR = await QRCode.toDataURL(text)
  //       return QR
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //! connectTronlink connection  < Removed to ConnectWalletHelper >.
  // async function connectTronlink() {
  //   // debugger
  //     if(window.innerWidth <= 600 && !window.tronWeb){
  //       dispatch(setTronPopUp(true))
  //     }
  //     else{
  //       try{
  //         try{
  //           const accounts = await window.tronLink.request({ method: 'tron_requestAccounts' });

  //           if(!accounts){
  //             dispatch(setTronLoginError("loggedOut"))``
  //           }
  //         }
  //         catch(err){
  //           console.log(err);
  //           if(!window.tronWeb){
  //             dispatch(setTronLoginError("noTronWeb"))
  //           }
  //         }

  //         if(window.tronLink && window.tronWeb.defaultAddress.base58) {
  //           const publicAddress = window.tronWeb.defaultAddress.base58
  //           dispatch(setTronWallet(publicAddress))
  //           dispatch(setTronLink(true))

  //         }
  //       }
  //       catch(error) {
  //         if(!modalError){
  //           dispatch(setError(error))
  //           if(error.data){
  //             console.log(error.data.message);
  //           }
  //           else console.log(error);
  //         }
  //       }
  //     }
  //   }

  // const onClientConnect = ( maiarProvider ) => {
  //   return {
  //     onClientLogin: async () => {
  //         const add = await maiarProvider.getAddress()
  //       dispatch(setConfirmMaiarMob(true))
  //       dispatch(setElrondAccount(add))
  //       dispatch(setMaiarProvider(maiarProvider))
  //       dispatch(setOnMaiar(true))
  //       dispatch(setStep(2))
  //     },
  //     onClientLogout: async () => {
  //       dispatch(setReset())
  //     }
  //   }
  // }
  //! onMaiar connection  < Removed to ConnectWalletHelper >.
  // const onMaiar = async () => {
  //     // setOnMaiarConnect(true)
  //     const provider = new ProxyProvider( "https://gateway.elrond.com")
  //     const maiarProvider = new WalletConnectProvider(provider, 'https://bridge.walletconnect.org/', onClientConnect);
  //       try {
  //         await maiarProvider.init()
  //         maiarProvider.onClientConnect = onClientConnect(maiarProvider)
  //         const qrCodeString = await maiarProvider.login()
  //         setQqrCodeString(qrCodeString)
  //         const qr = await generateQR(qrCodeString)

  //         setStrQr(qr)
  //       } catch (error) {
  //         dispatch(setError(error))
  //         if(error.data){
  //           console.log(error.data.message);
  //         }
  //         else console.log(error);
  //       }
  //   }

  //! WalletConnect connection.
  // const onWalletConnect = async () => {
  //     const { rpc, chainId } = chainsConfig[from.key]
  //     try {
  //         const walletConnect = new WalletConnectConnector({
  //             rpc: {
  //               [chainId]: rpc
  //             },
  //               chainId,
  //               qrcode: true,
  //           })
  //           walletConnect.networkId = chainId
  //           await activate(walletConnect, undefined, true)
  //           dispatch(setOnWC(true))
  //           dispatch(setWC(walletConnect))
  //     } catch (error) {
  //       dispatch(setError(error))
  //       if(error.data){
  //         console.log(error.data.message);
  //       }
  //       else console.log(error);
  //     }
  // }

  //! onMyAlgo connection  < Removed to ConnectWalletHelper >.
  // const onMyAlgo = useCallback( async () => {
  //   const myAlgoConnect = new MyAlgoConnect();
  //   try {
  //     const accountsSharedByUser = await myAlgoConnect.connect()
  //     console.log("MY Algo: ", myAlgoConnect);
  //     dispatch(setAlgorandAccount(accountsSharedByUser[0].address))
  //     dispatch(setMyAlgo(true))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })

  //! onAlgoSigner connection  < Removed to ConnectWalletHelper >.
  // const onAlgoSigner = useCallback(async () => {
  //   if (typeof window.AlgoSigner !== undefined) {
  //     try {
  //       await window.AlgoSigner.connect()
  //       console.log("Algo: ", window.AlgoSigner);
  //       const algo = await window.AlgoSigner.accounts({
  //         ledger: 'MainNet'
  //       });
  //       const { address } = algo[0]

  //       dispatch(setAlgoSigner(true))
  //       dispatch(setAlgorandAccount(address))
  //     } catch (e) {
  //       console.error(e);
  //   return JSON.stringify(e, null, 2);
  //     }
  //   } else {
  //     console.log("Algo Signer not installed.");
  //   }
  // })

  //! onBeacon connection  < Removed to ConnectWalletHelper >.
  // const onBeacon = async () => {
  //   const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
  //   const wallet = new BeaconWallet({ name: "XP.NETWORK Cross-Chain NFT Bridge" });
  //   Tezos.setWalletProvider(wallet);
  //   console.log("Tezos: ", Tezos);
  //   try {
  //     const permissions = await wallet.client.requestPermissions();
  //     dispatch(setTezosAccount(permissions.address))
  //     dispatch(setKukaiWallet(true))
  //   } catch (error) {
  //     console.log("Got error:", error);
  //   }
  // }

  //! onTemple connection  < Removed to ConnectWalletHelper >.
  // const onTemple = async () => {
  //   // debugger
  //     try {
  //       const available = await TempleWallet.isAvailable();
  //       if (!available) {
  //         throw new Error("Temple Wallet not installed");
  //       }
  //       const wallet = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
  //       await wallet.connect("mainnet");
  //       const tezos = wallet.toTezos();
  //       const accountPkh = await tezos.wallet.pkh();
  //       dispatch(setTezosAccount(accountPkh))
  //       dispatch(setTempleWallet(true))

  //     } catch (error) {
  //       console.error(error);
  //     }
  // }

  useEffect(() => {
    algoConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts
      const { accounts } = payload.params[0];
      if (accounts) {
        dispatch(setAlgorandWallet(true));
        dispatch(setAlgorandAccount(accounts[0]));
      }
    });

    let correct;
    if (testnet) {
      correct = from ? TESTNET_CHAIN_INFO[from?.key].chainId === chainId : "";
    } else {
      correct = from ? CHAIN_INFO[from?.key].chainId === chainId : "";
    }

    if (from?.type === "EVM") {
      dispatch(setAccount(account));
    }
    if (from) {
      dispatch(
        setWrongNetwork(
          testnet
            ? TESTNET_CHAIN_INFO[from.key].chainId !== chainId
            : CHAIN_INFO[from.key].chainId !== chainId
        )
      );
    }
    if (
      ((metaMask || tronLink || onWC || trustWallet || MaiarWallet) &&
        correct) ||
      MyAlgo ||
      algorandWallet ||
      AlgoSigner ||
      kukaiWallet ||
      templeWallet
    ) {
      dispatch(setStep(2));
    }
  }, [
    account,
    metaMask,
    chainId,
    tronLink,
    onWC,
    trustWallet,
    AlgoSigner,
    algorandWallet,
    MaiarWallet,
    MyAlgo,
    templeWallet,
    kukaiWallet,
  ]);

  return (
    <div>
      <NFTworng />
      <div className={from && to ? "connectNft" : "disabled"}>
        <a href="#" className="themBtn disabled" onClick={handleShow}>
          Continue bridging -<span>{">"}</span>{" "}
        </a>
      </div>
      {!qrCodeString ? (
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          className="ChainModal"
        >
          <Modal.Header>
            <Modal.Title>Connect Wallet</Modal.Title>
            <span className="CloseModal" onClick={handleClose}>
              <img src={Close} alt="" />
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className="walletListBox">
              <ul className="walletList scrollSty">
                {/* !!! style={ from ? from.type === "EVM" && from.text !== "Fuse" ? {} : OFF : ''} */}
                {/* <li onClick={() => connectMetaMask(activate)} style={ from ? from.type === "EVM" ? {} : OFF : ''} className="wllListItem"><img src={MetaMask} alt="MetaMask Icon" /> MetaMask</li> */}
                {/* <Wallet active={from?.type === "EVM"} icon={MetaMask} connection={() => connectMetaMask(activate)} name={"MetaMask"}/> */}
                {/* <li onClick={() => onWalletConnect()} style={  OFF } className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li> */}
                {/* <li onClick={() => onTrustWallet()} style={(getMobOps() && window.innerWidth <= 600 && isEVM()) || (window.ethereum && window.innerWidth <= 600) ? {} : OFF } className="wllListItem"><img src={TrustWallet} alt="WalletConnect Icon" /> Trust Wallet</li> */}
                {/* <li onClick={connectMyAlgo} style={ from ? from.type === "Algorand" ?  {} : OFF : ''} className="wllListItem algo"><img src={MyAlgoBlue} alt="" /> MyAlgo</li> */}
                {/* <li onClick={connectAlgoSigner} style={ from ? (from.type === "Algorand" && window.innerWidth > 600 ) ?  {} : OFF : ''} className="wllListItem algo"><img src={AlgoSignerIcon} alt="Algor Signer Icon" /> Algo Signer</li> */}
                {/* <li onClick={connectAlgoWallet} style={ OFF } className="wllListItem algo"><img src={AlgorandWallet} alt="Algor Wallet Icon" /> Algorand Wallet</li> */}
                {/* <li onClick={() => connectTronlink()} style={ from ? from.type === "Tron" ? {} : OFF : ""} className="wllListItem"><img src={Tron} alt="Tron Icon" /> TronLink</li> */}
                {/* style={ from ? from.type === "Elrond" ? {} : OFF : ''} */}
                {/* <li onClick={connectBeacon} style={ from?.text === "Tezos" ? {} : OFF} className="wllListItem beacon"><img src={BeaconW} alt="Kukai Icon" /> Beacon</li> */}
                {/* <li onClick={connectTempleWallet} style={ (from?.text === "Tezos" && window.innerWidth > 600 ) ? {} : OFF} className="wllListItem"><img style={{width: "28px"}} src={Temple} alt="Temple Icon" /> Temple Wallet</li> */}
                {/* <Wallet active={from?.type === 'Tron'} icon={Tron} connection={connectTronlink} name={"TronLink"} /> */}
                {/* <li onClick={connectMaiar} style={ from ? from.type === "Elrond" ? {} : OFF : ''} className="wllListItem"><img src={Maiar} alt="" /> Maiar</li> */}
                {/* <li onClick={connectMaiarExtension} style={ from ? from.type === "Elrond" ? {} : OFF : ''}  className="wllListItem"><img src={Elrond} alt="Elrond Icon" /> Maiar Extension</li> */}
                {/* <li style={ OFF } className="wllListItem"><div><img src={Ledger} alt="Ledger Icon" />Ledger</div><div className="coming-chain">Coming soon</div></li> */}
                {/* <li style={ OFF } className="wllListItem"><div><img style={{marginLift: "-5px"}} src={Trezor} alt="Trezor Icon" />Trezor</div><div className="coming-chain">Coming soon</div></li> */}
                <EVMWallet wallet={"MetaMask"} />
                <EVMWallet wallet={undefined} /> {/* Wallet Connect */}
                <EVMWallet wallet={"TrustWallet"} />
                <AlgorandWallet wallet={"MyAlgo"} />
                <AlgorandWallet wallet={"AlgoSigner"} />
                <AlgorandWallet wallet={undefined} /> {/* Algorand Wallet */}
                <TronWallet />
                <ElrondWallet wallet={"Maiar"} />
                <TezosWallet wallet={"TempleWallet"} />
                <TezosWallet wallet={undefined} /> {/* Beacon */}
                <ElrondWallet wallet={undefined} /> {/** Maiar Extension*/}
                <USBWallet wallet={"Ledger"} />
                <USBWallet /> {/** Trezor */}
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <MaiarModal
          handleClose={handleClose}
          strQR={qrCodeImage}
          qrCodeString={qrCodeString}
          show={show}
        />
      )}
    </div>
  );
}
//
export default ConnectWallet;
