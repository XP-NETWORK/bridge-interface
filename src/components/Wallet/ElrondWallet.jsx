// /* eslint-disable no-unused-vars */
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Elrond from "../../assets/img/chain/multiverseX.png";
// import Maiar from "../../assets/img/chain/multiverseX.png";

// import {
//   setAccount,
//   setError,
//   setQrCodeString,
//   setConfirmMaiarMob,
//   setOnMaiar,
//   setQrImage,
//   setFrom,
// } from "../../store/reducers/generalSlice";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// import { withServices } from "../App/hocs/withServices";
// import { Chain } from "xp.network";
// import QRCode from "qrcode";
// import {
//   WalletConnectProvider,
//   ProxyProvider,
//   ExtensionProvider,
// } from "@elrondnetwork/erdjs";

// import { chains, getChainObject } from "../../components/values";
// import { getRightPath } from "../../wallet/helpers";

// //import { WalletConnectV2Provider } from "@multiversx/sdk-wallet-connect-provider";
// import { wcId } from "./EVMWallet/evmConnectors";

// function ElrondWallet({ close, serviceContainer }) {
//   const { bridge } = serviceContainer;
//   const OFF = { opacity: 0.6, pointerEvents: "none" };
//   const from = useSelector((state) => state.general.from);
//   const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
//   const to = useSelector((state) => state.general.to);
//   const testnet = useSelector((state) => state.general.testNet);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const query = window.location.search || "";

//   const handleConnect = async (wallet) => {
//     try {
//       const chainWrapper = await bridge.getChain(from?.nonce || Chain.ELROND);

//       let account = {};

//       switch (wallet) {
//         case "xPortal": {
//           const xportal = await import(
//             "@multiversx/sdk-wallet-connect-provider"
//           );
//           console.log(xportal, "xportal");
//           const projectId = wcId;
//           // The default WalletConnect V2 Cloud Relay
//           const relayUrl = "wss://relay.walletconnect.com";
//           // T for Testnet, D for Devnet and 1 for Mainnet
//           const chainId = "1";

//           const callbacks = {
//             onClientLogin: async function() {
//               // closeModal() is defined above
//               // closeModal();
//               const address = await provider.getAddress();
//               console.log("Address:", address);
//             },
//             onClientLogout: async function() {
//               console.log("onClientLogout()");
//             },
//             onClientEvent: async function(event) {
//               console.log("onClientEvent()", event);
//             },
//           };

//           const provider = new xportal.WalletConnectV2Provider(
//             callbacks,
//             chainId,
//             relayUrl,
//             projectId
//           );

//           await provider.init();

//           provider.onClientConnect = {
//             onClientLogin: async (data) => {
//               console.log(data, "xPortal successful connected.");
//             },
//             onClientLogout: async () => {
//               window.safeLocalStorage?.clear();
//               //dispatch(setAccount(""));
//               //navigate("/");
//               dispatch(
//                 setError({
//                   message:
//                     "You have disconnected from Maiar, in order to transfer assets please login again",
//                 })
//               );
//             },
//           };

//           const { uri, approval } = await provider.connect();
//           const qr = await QRCode.toDataURL(uri);
//           dispatch(setQrImage(qr));
//           console.log(approval, "approval");
//           await provider.login({ approval });

//           account.address = provider.address;
//           account.signer = provider;
//           console.log(provider, "providerprovider");

//           console.log("gacha");
//           break;
//           /* await new Promise((r) => {
//             (async () => {
//               const provider = new ProxyProvider("https://gateway.elrond.com");
//               const maiarProvider = new WalletConnectProvider(
//                 provider,
//                 "https://bridge.walletconnect.org/"
//               );
//               await maiarProvider.init();

//               maiarProvider.onClientConnect = {
//                 onClientLogin: async () => {
//                   const addess = await maiarProvider.getAddress();
//                   account.address = addess;
//                   account.signer = maiarProvider;
//                   dispatch(setConfirmMaiarMob(true));
//                   dispatch(setOnMaiar(true));
//                   dispatch(setQrImage(null));
//                   !from &&
//                     dispatch(
//                       setFrom(
//                         chains.find((chain) => chain.nonce === Chain.ELROND)
//                       )
//                     );
//                   r();
//                 },
//                 onClientLogout: async () => {
//                   chainWrapper.setSigner(null);
//                   dispatch(
//                     setError({
//                       message:
//                         "You have disconnected from Maiar, in order to transfer assets please login again",
//                     })
//                   );
//                 },
//               };

//               const qrCodeString = await maiarProvider.login();
//               dispatch(setQrCodeString(qrCodeString));
//               const qr = await QRCode.toDataURL(qrCodeString);
//               dispatch(setQrImage(qr));
//             })();
//           });*/
//         }
//         case "Maiar Extension": {
//           const instance = ExtensionProvider.getInstance();
//           await instance
//             .init()
//             .catch(() => window.open("https://getmaiar.com/defi", "_blank"));
//           await instance.login();
//           const {
//             account: { address },
//           } = instance;
//           if (account?.name === "CanceledError") {
//             throw new Error("CanceledError");
//           }
//           account.address = address;
//           account.signer = instance;
//           break;
//         }
//       }

//       dispatch(setAccount(account.address));
//       chainWrapper.setSigner(account.signer);
//       bridge.setCurrentType(chainWrapper);
//       close();
//       if (to) navigateToAccountRoute();
//       if (!from) {
//         dispatch(setFrom(getChainObject(Chain.ELROND)));
//       }
//     } catch (e) {
//       dispatch(setError(e));
//     }
//   };

//   const navigateToAccountRoute = () => {
//     navigate(getRightPath());
//   };

//   const getStyle = () => {
//     if (temporaryFrom?.type === "Elrond") {
//       return {};
//     } else if (temporaryFrom && temporaryFrom?.type !== "Elrond") {
//       return OFF;
//     } else if (!from) {
//       return {};
//     } else if (from && from.type === "Elrond") {
//       return {};
//     } else return OFF;
//   };

//   return (
//     <>
//       {" "}
//       <li
//         style={getStyle()}
//         onClick={() => handleConnect("xPortal")}
//         className="wllListItem"
//         data-wallet="Maiar"
//       >
//         <img src={Maiar} alt="" />
//         <p>xPortal</p>
//       </li>
//       <li
//         style={getStyle()}
//         onClick={() => handleConnect("Maiar Extension")}
//         className="wllListItem"
//         data-wallet="MaiarExtension"
//       >
//         <img src={Elrond} alt="Elrond Icon" />
//         <p>MultiversX DeFi Wallet</p>
//       </li>
//     </>
//   );
// }
// ElrondWallet.propTypes = {
//   close: PropTypes.any,
//   wallet: PropTypes.string,
//   serviceContainer: PropTypes.object,
// };

// export default withServices(ElrondWallet);
