export const onPhantom = async () => {
  try {
    let account = {};
    // const chainWrapper = await bridge.getChain(Chain.SOLANA);
    //check if phantom present
    const provider = window.phantom?.solana;
    account.signer = provider;
    if (!provider?.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    //connect
    const connection = await provider.connect();
    account.address = connection.publicKey.toString();
    // chainWrapper.setSigner(account.signer);
    // bridge.setCurrentType(chainWrapper);
    return account;
  } catch (e) {
    console.log(e);
  }
};

export const onSolflare = async () => {
  // eslint-disable-next-line no-debugger
  try {
    let account = {};
    const provider = window.solflare;
    console.log({ provider });
    account.signer = provider;
    const isSolflare = provider?.isSolflare;
    if (!isSolflare) {
      window.open("https://solflare.com", "_blank");
      return;
    }
    await provider.connect();
    account.address = provider.publicKey.toString();
    return account;
  } catch (error) {
    console.log(error);
  }
};
