/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit";
import { utils } from "ethers";

export const initialSecretCred = {
    contract: "",
    viewKey: "",
};

const initialState = {
    step: 0,
    selectedNFTList: [],
    NFTListView: false,
    approvedNFTList: [],
    whitelistedNFTS: [],
    txnHashArr: [],
    fees: 0,
    currentTx: 0,
    bigLoader: true,
    innerWidth: 0,
    alert: false,
    NFTListSearch: "",
    refreshSecret: false,
    secretCred: initialSecretCred,
    NFTSetToggler: false,
    isInvalid: true,
    afterNearRedirect: true,
    hederaClaimables: [],
    algorandAddresses: [],
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setAlgorandAddresses(state, action) {
            state.algorandAddresses = action.payload;
        },
        setDeepLink(state, action) {
            state.deepLink = action.payload;
        },
        setWhitelistingLoader(state, action) {
            state.whitelistingLoader = action.payload;
        },
        setWhiteListedCollection(state, action) {
            const { contract } = action.payload;

            state.currentsNFTs = state.currentsNFTs.map((n) => {
                if (n.native.contract === contract)
                    n = {
                        ...n,
                        whitelisted: true,
                    };
                return n;
            });
        },
        setAptosAccount(state, action) {
            state.aptosAccount = action.payload;
        },
        setConnectedWallet(state, action) {
            state.connectedWallet = action.payload;
        },
        setStaging(state, action) {
            state.staging = action.payload;
        },
        setUnstoppableDomains(state, action) {
            state.unstoppableDomains = action.payload;
        },
        setRedirectModal(state, action) {
            state.redirectModal = action.payload;
        },
        setHederaWallet(state, action) {
            state.hederaWallet = action.payload;
        },
        setHederaAccount(state, action) {
            state.hederaAccount = action.payload;
        },
        setFilteredNFTSList(state, action) {
            state.filteredNFTList = action.payload;
        },

        setTemporaryTo(state, action) {
            state.temporaryTo = action.payload;
        },

        setSecretLoggedIn(state, action) {
            state.secretLoggedIn = action.payload;
        },
        setRefreshSecret(state) {
            state.refreshSecret = !state.refreshSecret;
        },
        setKeplrAccount(state, action) {
            state.secretAccount = action.payload;
        },
        setSecretCred(state, action) {
            state.secretCred = {
                contract: action.payload.contract,
                viewKey: action.payload.viewKey,
            };
        },
        setKeplrWallet(state, action) {
            state.keplrWallet = action.payload;
        },
        setBitKeep(state, action) {
            state.bitKeep = action.payload;
        },
        setTemporaryFrom(state, action) {
            state.temporaryFrom = action.payload;
        },
        setAccountWalletModal(state, action) {
            state.accountWalletModal = action.payload;
        },
        setCheckWallet(state, action) {
            state.checkWallet = action.payload;
        },
        setWrappedEGold(state, action) {
            state.wrappedEGold = action.payload;
        },
        setUnwrappedEGold(state, action) {
            state.unwrappedEGold = action.payload;
        },
        setTempleWalletSigner(state, action) {
            state.templeSigner = action.payload;
        },
        setKukaiWalletSigner(state, action) {
            state.kukaiWalletSigner = action.payload;
        },
        setBalance(state, action) {
            state.balance = action.payload;
        },
        setNFTSetToggler(state) {
            state.NFTSetToggler = !state.NFTSetToggler;
        },
        setGitLatestCommit(state, action) {
            state.gitLatestCommit = action.payload;
        },
        setEachNFT(state, action) {
            const { nftObj, index } = action.payload;
            state.currentsNFTs = state.currentsNFTs.map((n, i) => {
                if (i === index) n = nftObj;
                return n;
            });
        },
        setEachClaimables(state, action) {
            const { nftObj, index } = action.payload;
            state.algorandClaimables = state.algorandClaimables.map((n, i) => {
                if (i === index) n = nftObj;
                return n;
            });
        },
        setPreloadNFTs(state, action) {
            state.preloadNFTs = action.payload;
        },
        setAlert(state, action) {
            state.alert = action.payload;
        },
        setNFTSelectAlert(state, action) {
            state.NFTselectAlert = action.payload;
        },
        setDestinationAlert(state, action) {
            state.destinationAlert = action.payload;
        },
        setTxnStatus(state, action) {
            if (!action.payload) return;
            const {
                status,
                fromHash,
                tokenId,
                toHash,
                initialTokenId,
                nftUri,
                contract,
                createdAt,
            } = action.payload;

            state.txnHashArr = state.txnHashArr.map((e) => {
                let hash;
                switch (true) {
                    case Array.isArray(e.hash?.hash):
                        hash = utils.hexlify(e.hash?.hash)?.replace(/^0x/, "");
                        break;
                    case Array.isArray(e.hash?.hash?.data):
                        hash = utils
                            .hexlify(e.hash?.hash?.data)
                            ?.replace(/^0x/, "");
                        break;
                    case e.hash?.hash?.type === "Buffer":
                        hash = utils
                            .hexlify(e.hash?.hash?.data)
                            ?.replace(/^0x/, "");
                        break;
                    default:
                        hash = e.hash;
                        break;
                }

                if (hash === fromHash) {
                    e.hash = hash;
                    e.status = status;
                    e.tokenId = tokenId;
                    e.toHash = toHash;
                    e.nftUri = nftUri;
                    e.trxDate = createdAt;
                    e.initialTokenId = initialTokenId;
                    e.contract = contract;
                }
                return e;
            });
        },
        setWalletsModal(state, action) {
            state.walletsModal = action.payload;
        },
        setQrCodeString(state, action) {
            state.qrCodeString = action.payload;
        },
        setQrImage(state, action) {
            state.qrCodeImage = action.payload;
        },
        setTo(state, action) {
            state.to = action.payload;
        },
        setFrom(state, action) {
            state.from = action.payload;
        },
        setChainModal(state, action) {
            state.showChainModal = action.payload;
        },
        setDepartureOrDestination(state, action) {
            state.departureOrDestination = action.payload;
        },
        setChainSearch(state, action) {
            state.chainSearch = action.payload;
        },
        setStep(state, action) {
            state.step = action.payload;
        },
        setMetaMask(state, action) {
            state.MetaMask = action.payload;
        },
        setWidget(state, action) {
            state.widget = action.payload;
        },
        setWSettings(state, action) {
            state.wsettings = action.payload;
        },
        setAccount(state, action) {
            state.account = action.payload;
        },
        //!!!!!!!
        setNFTList(state, action) {
            state.NFTList = action.payload;
        },
        setSelectedNFTList(state, action) {
            const nft = {
                ...action.payload,
                amountToTransfer: action.payload.native?.amount ? 1 : undefined,
            };
            state.selectedNFTList = [...state.selectedNFTList, nft];
        },
        cleanSelectedNFTList(state) {
            state.selectedNFTList = [];
        },
        removeFromSelectedNFTList(state, action) {
            const { tokenId, contract, chainId } = action.payload.native;
            state.selectedNFTList = state.selectedNFTList.filter(
                (n) =>
                    !(
                        n.native.tokenId === tokenId &&
                        n.native.contract === contract &&
                        n.native.chainId === chainId
                    )
            );
        },
        setSelectedNFTAmount(state, action) {
            const { amount, index } = action.payload;

            state.selectedNFTList = state.selectedNFTList.map((e, i) => {
                if (i === index) {
                    e.amountToTransfer = amount;
                }
                return e;
            });
        },
        setSearchNFTList(state, action) {
            state.NFTListSearch = action.payload;
        },
        setCurrentNFTs(state, action) {
            state.currentsNFTs = action.payload;
        },

        allSelected(state) {
            state.selectedNFTList = state.currentsNFTs.filter(
                (n) => n.whitelisted
            );
        },
        setNFTsListView(state) {
            state.NFTListView = !state.NFTListView;
        },
        clearApprovedNFTs(state) {
            state.approvedNFTList = [];
        },
        updateApprovedNFTs(state, action) {
            const { tokenId, contract, chainId } = action.payload.native;
            const isInApprovedNFTs = state.approvedNFTList.filter(
                (n) =>
                    n.native.tokenId === tokenId &&
                    n.native.contract === contract &&
                    chainId === n.native.chainId
            )[0];
            if (!isInApprovedNFTs)
                state.approvedNFTList = [
                    ...state.approvedNFTList,
                    action.payload,
                ];
        },
        setApproved(state, action) {
            state.approved = action.payload;
        },
        setReceiver(state, action) {
            state.receiver = action.payload;
        },
        setIsInvalidAddress(state, action) {
            state.isInvalid = action.payload;
        },
        cleanTxnHashArr(state) {
            state.txnHashArr = state.txnHashArr?.initialState
                ? state.txnHashArr?.initialState
                : [];
        },
        setTxnHash(state, action) {
            const { nft, txn, mw } = action.payload;
            const { tokenId, contract, chainId } = nft.native;
            const mintWith = mw;
            state.txnHashArr = [...state.txnHashArr, txn];
            state.selectedNFTList = state.selectedNFTList.map((n) => {
                const { native } = n;
                if (
                    native.tokenId === tokenId &&
                    native.contract === contract &&
                    native.chainId === chainId
                ) {
                    n.txn = txn;
                    n.mintWith = mintWith;
                }
                return n;
            });
        },
        setWrongNetwork(state, action) {
            state.wrongNetwork = action.payload;
        },
        setUnsupportedNetwork(state, action) {
            state.unsupportedNetwork = action.payload;
        },
        setMetaMaskActive(state, action) {
            state.metaMaskActive = action.payload;
        },
        setReset(state) {
            return {
                ...initialState,
                widget: state.widget,
                wsettings: state.wsettings,
                //account: state.account
            };
        },
        setElrondAccount(state, action) {
            state.elrondAccount = action.payload;
        },
        setMaiarProvider(state, action) {
            state.maiarProvider = action.payload;
        },
        removeAlgorandClaimable(state, action) {
            state.algorandClaimables = state.algorandClaimables.filter(
                (n) => n.nftId !== action.payload
            );
        },
        setOnMaiar(state, action) {
            state.onMaiar = action.payload;
        },
        setTronWallet(state, action) {
            state.tronWallet = action.payload;
        },
        setConfirmMaiarMob(state, action) {
            state.confirmMaiarMob = action.payload;
        },
        setSwitchDestination(state, action) {
            state.switchDestination = action.payload;
        },
        setAccountModal(state, action) {
            state.accountModal = action.payload;
        },
        setBigLoader(state, action) {
            state.bigLoader = action.payload;
        },
        setApproveLoader(state, action) {
            state.approveLoader = action.payload;
        },
        setTronLink(state, action) {
            state.tronLink = action.payload;
        },
        setOnWC(state, action) {
            state.WalletConnect = action.payload;
        },
        setWC(state, action) {
            state.WCProvider = action.payload;
        },
        setError(state, action) {
            // debugger;
            if (action.payload) {
                const { err, data, message } = action.payload;

                switch (true) {
                    case typeof data === "object":
                        if (
                            data.message?.includes("User cant pay the bills") ||
                            data.message?.includes(
                                "insufficient funds for transfer"
                            )
                        )
                            state.error = `You don't have enough funds to pay the fees`;
                        else state.error = data.message || err.message;
                        break;
                    case err:
                        state.error = err.data.message || err.message;
                        break;
                    default:
                        if (message?.includes("User cant pay the bills"))
                            state.error = `You don't have enough funds to pay the fees`;
                        if (message?.includes("not whitelisted"))
                            state.error = `NFT contract is not whitelisted`;
                        if (message.includes("user rejected transaction")) {
                            return;
                        } else state.error = message;
                        break;
                }
            } else state.error = false;
        },
        setTronPopUp(state, action) {
            state.tronPopUp = action.payload;
        },
        setBigNumFees(state, action) {
            state.bigNumberFees = action.payload;
        },
        setTronLoginError(state, action) {
            state.tronLoginError = action.payload;
        },
        setTrustWallet(state, action) {
            state.trustWallet = action.payload;
        },
        setFactory(state, action) {
            state.factory = action.payload;
        },
        connectAlgorandWalletClaim(state, action) {
            state.connectClaimAlgorand = action.payload;
        },
        claimAlgorandPopup(state, action) {
            // claim from success popup
            state.algorandClaimPopup = action.payload;
        },
        setAlgoSigner(state, action) {
            state.AlgoSigner = action.payload;
        },
        setAlgorandAccount(state, action) {
            state.algorandAccount = action.payload;
        },
        setShowAbout(state, action) {
            state.about = action.payload;
        },
        setShowVideo(state, action) {
            state.video = action.payload;
        },
        setAlgorandClaimables(state, action) {
            state.algorandClaimables = action.payload;
        },

        setAlgorandWallet(state, action) {
            state.AlgorandWallet = action.payload;
        },
        setMyAlgo(state, action) {
            state.MyAlgo = action.payload;
        },

        removeFromNotWhiteListed(state) {
            state.nftsToWhitelist.shift();
        },
        setTransferLoaderModal(state, action) {
            state.transferModalLoader = action.payload;
        },
        setValidatorsInf(state, action) {
            state.validatorsInfo = action.payload;
        },
        setGetFeaturedModal(state, action) {
            state.featuredModal = action.payload;
        },
        setTransactionStep(state, action) {
            state.transactionStep = action.payload;
        },
        setTezosAccount(state, action) {
            state.tezosAccount = action.payload;
        },
        setKukaiWallet(state, action) {
            state.kukaiWallet = action.payload;
        },
        setTempleWallet(state, action) {
            state.templeWallet = action.payload;
        },
        setTestNet(state, action) {
            state.testNet = action.payload;
        },
        setInnerWidth(state, action) {
            state.innerWidth = action.payload;
        },
        setAlgoAccountToClaim(state, action) {
            state.algorandAccountToClaim = action.payload;
        },

        setSelectNFTAlert(state, action) {
            state.selectNFTAlert = action.payload;
        },
        setPasteDestinationAlert(state, action) {
            state.pasteDestinationAlert = action.payload;
        },
        setNoApprovedNFTAlert(state, action) {
            state.noApprovedNFTAlert = action.payload;
        },
        setSync2(state, action) {
            state.account = action.payload;
            state.Sync2 = true;
        },
        setSync2Connex(state, action) {
            state.sync2Connex = action.payload;
        },
        setChangeWallet(state, action) {
            state.changeWallet = action.payload;
        },
        setImportModal(state, action) {
            state.importModal = action.payload;
        },
        addImportedNFTtoNFTlist(state, action) {
            state.NFTList = action.payload;
        },
        setTonWallet(state, action) {
            state.TonWallet = action.payload;
        },
        setTonAccount(state, action) {
            state.tonAccount = action.payload;
        },
        setNearRedirect(state) {
            state.afterNearRedirect = false;
        },
        setHederaClaimables(state, action) {
            state.hederaClaimables = action.payload;
        },
    },
});

export const {
    setAlgorandAddresses,
    setDeepLink,
    setWhitelistingLoader,
    setWhiteListedCollection,
    setConnectedWallet,
    setUnstoppableDomains,
    setRedirectModal,
    setHederaAccount,
    setHederaWallet,
    setFilteredNFTSList,
    setUnwrappedEGold,
    setSecretLoggedIn,
    setKeplrAccount,
    setKeplrWallet,
    setBitKeep,
    setTemporaryFrom,
    setCheckWallet,
    addImportedNFTtoNFTlist,
    setImportModal,
    setNFTSetToggler,
    setChangeWallet,
    setNoApprovedNFTAlert,
    setPasteDestinationAlert,
    setSelectNFTAlert,
    setAlgoAccountToClaim,
    setSync2,
    setSync2Connex,
    setEachClaimables,
    setEachNFT,
    setUnsupportedNetwork,
    setPreloadNFTs,
    setAlert,
    setTxnStatus,
    setInnerWidth,
    setTempleWallet,
    setKukaiWallet,
    setTezosAccount,
    setTestNet,
    setGetFeaturedModal,
    setTransactionStep,
    setValidatorsInf,
    setTransferLoaderModal,
    toggleNFTInfo,
    removeFromNotWhiteListed,
    setReset,
    setTo,
    claimAlgorandPopup,
    setAlgorandClaimables,
    setFrom,
    setChainModal,
    setDepartureOrDestination,
    setChainSearch,
    setStep,
    setAccount,
    setMetaMask,
    setNFTList,
    setFactory,
    setSelectedNFTList,
    cleanSelectedNFTList,
    removeFromSelectedNFTList,
    setSearchNFTList,
    allSelected,
    setNFTsListView,
    updateApprovedNFTs,
    setApproved,
    setReceiver,
    setTxnHash,
    setWrongNetwork,
    setMetaMaskActive,
    setElrondAccount,
    removeAlgorandClaimable,
    setMaiarProvider,
    setOnMaiar,
    connectAlgorandWalletClaim,
    setTronWallet,
    setConfirmMaiarMob,
    setSwitchDestination,
    setAccountModal,
    setBigLoader,
    setApproveLoader,
    setTronLink,
    setOnWC,
    setWC,
    setWidget,
    setError,
    setBigNumFees,
    setTronPopUp,
    setTronLoginError,
    setTrustWallet,
    setAlgoSigner,
    setAlgorandAccount,
    setShowAbout,
    setShowVideo,
    setAlgorandWallet,
    setMyAlgo,
    cleanTxnHashArr,
    setQrCodeString,
    setQrImage,
    setWSettings,
    setWalletsModal,
    setGitLatestCommit,
    setBalance,
    setWrappedEGold,
    setTempleWalletSigner,
    setKukaiWalletSigner,
    setCurrentNFTs,
    setAccountWalletModal,
    setRefreshSecret,
    setTemporaryTo,
    setSecretCred,
    setSelectedNFTAmount,
    setTonAccount,
    setTonWallet,
    setStaging,
    setAptosAccount,
    setIsInvalidAddress,
    setNearRedirect,
    setHederaClaimables,
} = generalSlice.actions;

export default generalSlice.reducer;
