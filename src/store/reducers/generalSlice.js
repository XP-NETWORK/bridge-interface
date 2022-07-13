import { createSlice } from "@reduxjs/toolkit";
import { isShown } from "../../components/NFT/NFTHelper";

const initialState = {
    step: 0,
    selectedNFTList: [],
    NFTListView: false,
    approvedNFTList: [],
    nftsToWhitelist: [],
    txnHashArr: [],
    fees: 0,
    currentTx: 0,
    bigLoader: true,
    innerWidth: 0,
    alert: true,
    NFTListSearch: "",
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setKeplrAccount(state, action) {
            state.secretAccount = action.payload;
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
        setTempleWalletSigner(state, action) {
            state.templeSigner = action.payload;
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
            state.NFTList = state.NFTList.map((n, i) => {
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
            const {
                status,
                fromHash,
                tokenId,
                toHash,
                initialTokenId,
                nftUri,
                createdAt,
            } = action.payload;
            state.txnHashArr = state.txnHashArr.map((e) => {
                if (e.hash === fromHash) {
                    e.status = status;
                    e.tokenId = tokenId;
                    e.toHash = toHash;
                    e.nftUri = nftUri;
                    e.trxDate = createdAt;
                    e.initialTokenId = initialTokenId;
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
            state.selectedNFTList = [...state.selectedNFTList, action.payload];
        },
        cleanSelectedNFTList(state, action) {
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
        setSearchNFTList(state, action) {
            state.NFTListSearch = action.payload;
        },
        allSelected(state) {
            const nfts = JSON.parse(JSON.stringify(state.NFTList));
            const onlyWhiteListedAndNotHidden = nfts
                .filter((n) => n.whitelisted)
                .filter((n) => isShown(state.NFTListSearch, n));

            state.selectedNFTList = onlyWhiteListedAndNotHidden;
        },
        setNFTsListView(state) {
            state.NFTListView = !state.NFTListView;
        },
        clearApprovedNFTs(state, action) {
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
        cleanTxnHashArr(state) {
            state.txnHashArr = state.txnHashArr?.initialState
                ? state.txnHashArr?.initialState
                : [];
        },
        setTxnHash(state, action) {
            const { nft, txn } = action.payload;
            const { tokenId, contract, chainId } = nft.native;
            state.txnHashArr = [...state.txnHashArr, action.payload.txn];

            state.selectedNFTList = state.selectedNFTList.map((n) => {
                const { native } = n;
                if (
                    native.tokenId === tokenId &&
                    native.contract === contract &&
                    native.chainId === chainId
                ) {
                    n.txn = txn;
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
            state.error = action.payload;
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
        removeFromClaimables(state, action) {
            const { index } = action.payload;
            state.algorandClaimables = state.algorandClaimables.filter(
                (n, i) => i !== index
            );
        },
        setAlgorandWallet(state, action) {
            state.AlgorandWallet = action.payload;
        },
        setMyAlgo(state, action) {
            state.MyAlgo = action.payload;
        },
        setNFTsToWhitelist(state, action) {
            state.nftsToWhitelist = [...state.nftsToWhitelist, action.payload];
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
        updateNFTs(state, action) {
            const { whitelisted, nft } = action.payload;
            const actionContract = nft.native.contract;
            const actionOwner = nft.native.owner;
            const actionTokenId = nft.native.tokenId;
            const nfts = JSON.parse(JSON.stringify(state.NFTList));
            nfts.forEach((n, index) => {
                const { contract, owner, tokenId } = n.native;
                if (
                    contract === actionContract &&
                    owner === actionOwner &&
                    tokenId === actionTokenId
                ) {
                    state.NFTList[index].whitelisted = whitelisted;
                }
            });
        },
        setInnerWidth(state, action) {
            state.innerWidth = action.payload;
        },
        setAlgoAccountToClaim(state, action) {
            state.algorandAccountToClaim = action.payload;
        },
        setURLToOptIn(state, action) {
            state.URLToOptIn = action.payload;
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
        setSync2Connecx(state, action) {
            state.sync2Connex = action.payload;
        },
        setChangeWallet(state, action) {
            state.changeWallet = action.payload;
        },
        setImportModal(state, action) {
            state.importModal = action.payload;
        },
        addImportedNFTtoNFTlist(state, action) {
            state.NFTList = [action.payload, ...state.NFTList];
        },
    },
    setWrappedEGold(state, action) {
        state.wrappedEGold = action.payload;
    },
    setTempleWalletSigner(state, action) {
        state.templeSigner = action.payload;
    },
    setBalance(state, action) {
        state.balance = action.payload;
    },
    setNFTSetToggler(state, action) {
        state.NFTSetToggler = !state.NFTSetToggler;
    },
    setGitLatestCommit(state, action) {
        state.gitLatestCommit = action.payload;
    },
    setEachNFT(state, action) {
        const { nftObj, index } = action.payload;
        state.NFTList = state.NFTList.map((n, i) => {
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
        const {
            status,
            fromHash,
            tokenId,
            toHash,
            initialTokenId,
            nftUri,
            createdAt,
        } = action.payload;
        state.txnHashArr = state.txnHashArr.map((e) => {
            if (e.hash === fromHash) {
                e.status = status;
                e.tokenId = tokenId;
                e.toHash = toHash;
                e.nftUri = nftUri;
                e.trxDate = createdAt;
                e.initialTokenId = initialTokenId;
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
        state.selectedNFTList = [...state.selectedNFTList, action.payload];
    },
    cleanSelectedNFTList(state, action) {
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
    setSearchNFTList(state, action) {
        state.NFTListSearch = action.payload;
    },
    allSelected(state) {
        const nfts = JSON.parse(JSON.stringify(state.NFTList));
        const onlyWhiteListedAndNotHidden = nfts
            .filter((n) => n.whitelisted)
            .filter((n) => isShown(state.NFTListSearch, n));

        state.selectedNFTList = onlyWhiteListedAndNotHidden;
    },
    setNFTsListView(state) {
        state.NFTListView = !state.NFTListView;
    },
    clearApprovedNFTs(state, action) {
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
            state.approvedNFTList = [...state.approvedNFTList, action.payload];
    },
    setApproved(state, action) {
        state.approved = action.payload;
    },
    setReceiver(state, action) {
        state.receiver = action.payload;
    },
    cleanTxnHashArr(state) {
        state.txnHashArr = state.txnHashArr?.initialState
            ? state.txnHashArr?.initialState
            : [];
    },
    setTxnHash(state, action) {
        const { nft, txn } = action.payload;
        const { tokenId, contract, chainId } = nft.native;
        state.txnHashArr = [...state.txnHashArr, action.payload.txn];

        state.selectedNFTList = state.selectedNFTList.map((n) => {
            const { native } = n;
            if (
                native.tokenId === tokenId &&
                native.contract === contract &&
                native.chainId === chainId
            ) {
                n.txn = txn;
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
        state.error = action.payload;
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
    removeFromClaimables(state, action) {
        const { index } = action.payload;
        state.algorandClaimables = state.algorandClaimables.filter(
            (n, i) => i !== index
        );
    },
    setAlgorandWallet(state, action) {
        state.AlgorandWallet = action.payload;
    },
    setMyAlgo(state, action) {
        state.MyAlgo = action.payload;
    },
    setNFTsToWhitelist(state, action) {
        state.nftsToWhitelist = [...state.nftsToWhitelist, action.payload];
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
    updateNFTs(state, action) {
        const { whitelisted, nft } = action.payload;
        const actionContract = nft.native.contract;
        const actionOwner = nft.native.owner;
        const actionTokenId = nft.native.tokenId;
        const nfts = JSON.parse(JSON.stringify(state.NFTList));
        nfts.forEach((n, index) => {
            const { contract, owner, tokenId } = n.native;
            if (
                contract === actionContract &&
                owner === actionOwner &&
                tokenId === actionTokenId
            ) {
                state.NFTList[index].whitelisted = whitelisted;
            }
        });
    },
    setInnerWidth(state, action) {
        state.innerWidth = action.payload;
    },
    setAlgoAccountToClaim(state, action) {
        state.algorandAccountToClaim = action.payload;
    },
    setURLToOptIn(state, action) {
        state.URLToOptIn = action.payload;
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
    setSync2Connecx(state, action) {
        state.sync2Connex = action.payload;
    },
    setChangeWallet(state, action) {
        state.changeWallet = action.payload;
    },
    setImportModal(state, action) {
        state.importModal = action.payload;
    },
    addImportedNFTtoNFTlist(state, action) {
        state.NFTList = [action.payload, ...state.NFTList];
    },
});

export const {
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
    setURLToOptIn,
    setAlgoAccountToClaim,
    setSync2,
    setSync2Connecx,
    removeFromClaimables,
    setEachClaimables,
    setEachNFT,
    setUnsupportedNetwork,
    setPreloadNFTs,
    setAlert,
    setTxnStatus,
    setInnerWidth,
    updateNFTs,
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
    setNFTsToWhitelist,
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
    setAccountWalletModal,
} = generalSlice.actions;

export default generalSlice.reducer;
