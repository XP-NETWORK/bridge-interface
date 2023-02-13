export const connectMartian = async () => {
    let martian;
    let account;
    try {
        const isMartianWalletInstalled = window.martian;
        !isMartianWalletInstalled
            ? window.open("https://www.martianwallet.xyz/", "_blank")
            : (martian = await window.martian.connect());
        if (martian) {
            account = await window.martian.account();
            return account;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const connectPetra = async () => {
    // eslint-disable-next-line no-debugger
    const isPetraInstalled = window.petra;

    let account;

    if (!isPetraInstalled) {
        window.open("https://petra.app/", "_blank");
    } else {
        await window.petra.connect();
        account = await window.petra.account();
    }
    return account;
};

export const connectPontem = async () => {
    // eslint-disable-next-line no-debugger
    let account;
    const isPontemInstalled = await window.pontem;
    if (!isPontemInstalled) {
        window.open("https://pontem.network/", "_blank");
    } else {
        await window.pontem.connect();
        account = await window.pontem.account();
    }
    return account;
};
