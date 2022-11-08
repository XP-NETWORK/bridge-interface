export const connectMartian = async () => {
    let martian;
    try {
        const isMartianWalletInstalled = window.martian;
        !isMartianWalletInstalled
            ? window.open("https://www.martianwallet.xyz/", "_blank")
            : (martian = await window.martian.connect());
        if (martian) {
            return martian;
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
    return petra;
};

export const connectPontem = async () => {
    const isPontemInstalled = window.pontem;
    let pontem;
    !isPontemInstalled
        ? window.open("https://pontem.network/", "_blank")
        : (pontem = await window.pontem.connect());
    return pontem;
};
