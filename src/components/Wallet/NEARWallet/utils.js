export const adaptToWalletSelector = (signer, provider) => {
    signer.viewFunction = async function(callArgs) {
        const { methodName, contractId, args } = callArgs;

        let res = await provider.connection.provider.query({
            request_type: "call_function",
            account_id: contractId,
            method_name: methodName,
            args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
            finality: "optimistic",
        });
        return JSON.parse(Buffer.from(res.result).toString());
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

        return x;
    };
    signer.account = signer.account || signer.getAccounts;
    return signer;
};

export const nearWalletsIds = {
    ["my-near-wallet"]: "My Near Wallet",
    ["meteor-wallet"]: "Meteor",
    ["near-wallet"]: "Near Wallet",
    ["here-wallet"]: "Here Wallet",
    ["sender"]: "sender",
};
