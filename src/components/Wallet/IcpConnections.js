export const connectPlugWallet = async (chainWrapper) => {
  try {
    const provider = window.ic?.plug; // Assuming Plug wallet is used for ICP
    if (!provider) {
      window.open("https://plugwallet.ooo/", "_blank");
      return;
    }
    await provider.requestConnect({
      host: "https://tools.xp.network/",
      whitelist: [
        "ryjl3-tyaaa-aaaaa-aaaba-cai",
        chainWrapper.chain.getParams().bridgeContract.toText(),
      ],
      timeout: 6e4,
    });

    const signer = window.ic?.plug?.agent;
    return signer;
  } catch (error) {
    console.error("Error connecting to Plug wallet:", error);
    throw error;
  }
};