/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import { TempleWallet } from "@temple-wallet/dapp";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export const withTezos = (Wrapped) =>
  function CBU(props) {
    const connectionCallback = async (bridge) => {
      const chainWrapper = await bridge.getChain(Chain.TEZOS);
      console.log("TEZOS Chainwrapper", chainWrapper);

      const available = await TempleWallet.isAvailable();
      if (!available) {
        throw new Error("Temple Wallet not installed");
      }
      const Tezos = new TezosToolkit("https://ghostnet.ecadinfra.com");

      // const wallet = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
      // await wallet.connect("ghostnet");
      // const tezos = wallet.toTezos();

      const wallet = new BeaconWallet({
        name: "XP.NETWORK Cross-Chain NFT Bridge",
      });
      await wallet.requestPermissions({
        network: {
          type: "ghostnet",
        },
      });

      Tezos.setWalletProvider(wallet);
      const address = await wallet.getPKH();
      // const accountPkh = await tezos.wallet.pkh();
      console.log({
        wallet,
        signer: Tezos.signer,
        TezosBalance: Tezos.wallet.pkh(),
        balance: Number(await Tezos.tz.getBalance(address)),
        address,
      });
      // account.signer = wallet;
      // account.address = accountPkh;

      chainWrapper.setSigner(wallet);
      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.TEZOS]: {
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
