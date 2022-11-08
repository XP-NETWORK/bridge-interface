import {
    // setAccount,
    setAlgoSigner,
    setAptosAccount,
    setConnectedWallet,
} from "../../../store/reducers/generalSlice";
import store from "../../../store/store";

export const connectMartian = async () => {
    let martian;
    try {
        const isMartianWalletInstalled = window.martian;
        !isMartianWalletInstalled
            ? window.open("https://www.martianwallet.xyz/", "_blank")
            : (martian = await window.martian.connect());
        if (martian) {
            // store.dispatch(setAccount(martian.address));
            store.dispatch(setAptosAccount(martian.address));
            store.dispatch(setConnectedWallet("Martian"));
            store.dispatch(setAlgoSigner(martian.address));
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const connectPetra = async () => {
    const isPetraInstalled = window.petra;
    let petra;
    !isPetraInstalled
        ? window.open("https://petra.app/", "_blank")
        : await window.petra.connect();
    console.log(petra.address);
};

export const connectPontem = async () => {
    const isPontemInstalled = window.pontem;
    let pontem;
    !isPontemInstalled
        ? window.open("https://pontem.network/", "_blank")
        : (pontem = await window.pontem.connect());
    console.log(pontem.address);
};
