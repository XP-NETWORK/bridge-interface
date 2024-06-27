import { ContractId, ContractExecuteTransaction } from "@hashgraph/sdk";
import { hashConnect } from "../../../../components/Wallet/HederaWallet/hederaConnections";

export const hederaContracId = (address) => {
  return ContractId.fromString(address);
};

export const contractSign = async (provider, address) => {
  console.log({ "HASHPACK FILE": provider, address });
  const hederaProvider = hashConnect.getProvider(
    provider.network,
    provider.topicId,
    provider.accountToSign
  );
  const signer = hashConnect.getSigner(hederaProvider);
  const sendHbarTx = await new ContractExecuteTransaction()
    .setContractId(hederaContracId(address))
    .setGas(1000000000)
    .setFunction("claim")
    .freezeWithSigner(signer);

  const res = await sendHbarTx.executeWithSigner(signer);
  console.log({ res });
};
