import {
  ContractId,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  AccountId,
  TokenAssociateTransaction,
} from "@hashgraph/sdk";
import { hashConnect } from "../../../../components/Wallet/HederaWallet/hederaConnections";
import axios from "axios";

export const hederaContracId = (address) => {
  return ContractId.fromString(address);
};

export const contractSign = async (provider, address) => {
  const hederaProvider = hashConnect.getProvider(
    provider.network,
    provider.topicId,
    provider.accountToSign
  );
  const signer = hashConnect.getSigner(hederaProvider);
  const signerEVMAddress = AccountId.fromString(
    provider.accountToSign
  ).toSolidityAddress();

  const isAlreadyAssociated = (
    await axios.get(
      `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${signer.getAccountId()}/tokens`
    )
  ).data.tokens;

  const index = isAlreadyAssociated.findIndex(
    (x) => x.token_id === "0.0.6290997"
  );
  isAlreadyAssociated[index];
  if (index < 0) {
    const transaction = await new TokenAssociateTransaction()
      .setAccountId(signer.getAccountId())
      .setTokenIds(["0.0.6290997"])
      .freezeWithSigner(signer);

    await transaction.executeWithSigner(signer);
  }
  // Associate a token to an account and freeze the unsigned transaction for signing

  const sendHbarTx = await new ContractExecuteTransaction()
    .setContractId(hederaContracId(address))
    .setGas(1_500_000)
    .setFunction(
      "mint",
      new ContractFunctionParameters()
        .addAddress(signerEVMAddress)
        .addUint256("0")
        .addBytes([])
    )
    .freezeWithSigner(signer);

  const response = await sendHbarTx.executeWithSigner(signer);

  return { hash: response.transactionHash };
};
