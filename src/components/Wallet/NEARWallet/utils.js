//import BigNumber from "bignumber.js";

export const adaptToWalletSelector = (signer) => {
  signer.viewFunction = async function(callArgs) {
    const { methodName, contractId, args, walletCallbackUrl } = callArgs;
    console.log(callArgs);

    const res = await signer.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName,
            args,
            gas: "3000000000000",
            ...(walletCallbackUrl ? { walletCallbackUrl } : {}),
          },
        },
      ],
    });
    console.log(res, "res");
    return res.status.SuccessValue === "dHJ1ZQ=="; //means true
  };
  signer.functionCall = async function(callArgs) {
    const {
      methodName,
      contractId,
      attachedDeposit,
      args,
      gas,
      walletCallbackUrl,
    } = callArgs;
    console.log(callArgs);

    const res = await signer.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName,
            contractId,
            args,
            gas: gas?.toString() || "30000000000000",
            deposit: attachedDeposit.toString(), //new BigNumber(attachedDeposit.toString()).div(3).toString(), //attachedDeposit.toString(),
            ...(walletCallbackUrl ? { walletCallbackUrl } : {}),
          },
        },
      ],
    });

    const x = Array.isArray(res)
      ? res.find((item) => typeof item === "object" && item.transaction)
      : res;
    x.hash = x.transaction.hash;
    console.log(x);
    return x;
  };
  signer.account = signer.account || signer.getAccounts;
  return signer;
};
