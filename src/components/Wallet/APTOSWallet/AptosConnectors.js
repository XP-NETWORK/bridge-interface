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
    // eslint-disable-next-line no-debugger
    // debugger;
    const isPetraInstalled = window.petra;
    let petra;
    if (!isPetraInstalled) {
        window.open("https://petra.app/", "_blank");
    } else petra = await window.petra.connect();
    return petra;
};

export const connectPontem = async () => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const isPontemInstalled = await window.pontem;
    let pontem;
    if (!isPontemInstalled) {
        window.open("https://pontem.network/", "_blank");
    } else pontem = await window.pontem.connect();
    return pontem;
};
