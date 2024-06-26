/* eslint-disable no-unused-vars*/
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { switchNetwork } from "../../../../services/chains/evm/evmService";
import {
  setWalletsModal,
  setApproveLoader,
  setError,
  setFrom,
} from "../../../../store/reducers/generalSlice";
import { setTotal, setSuccess } from "../../../../store/reducers/eventSlice";
import { useDispatch } from "react-redux";
import xpnetClaimAbi from "../../../assets/abi/mintAbi.json";
import campaignMintAbi from "../../../assets/abi/campaignMintAbi.json";
import { useWeb3React } from "@web3-react/core";
import { REST_API } from "../utils";
import { chains as allChains } from "../../../../components/values";

export const MintNft = ({
  choosenChain,
  bridge,
  account,
  chains,
  useContractVariable,
}) => {
  const MAX_MINT = 5;
  const [countMint, setCountMint] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const { chainId: x } = useWeb3React();

  const [mintLimits, setMintLimit] = useState(
    chains.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.chainNonce]: MAX_MINT,
      };
    }, {})
  );

  useEffect(() => {
    (async () => {
      const [total] = await Promise.all([
        (await fetch(`${REST_API}/get-claims`)).json(),
      ]);

      dispatch(
        setTotal(
          total
            ? Object.keys(total).reduce((acc, cur) => acc + total[cur].total, 0)
            : 0
        )
      );
    })();
  }, []);

  useEffect(() => {
    const chain = chains[choosenChain];
    dispatch(
      setFrom(allChains.find((i) => String(i.nonce) === chain.chainNonce))
    );
  }, [choosenChain]);

  useEffect(() => {
    (async () => {
      const chain = chains[choosenChain];
      if (account && chain.evm && x) {
        const { chainId, chainNonce } = chain;
        dispatch(setApproveLoader(true));
        try {
          if (String(x) !== chain.chainId) {
            try {
              await switchNetwork({ chainId: Number(chainId) });
            } catch {
              dispatch(setApproveLoader(false));
              return;
            }
            throw new Error("Chain does not match");
          }

          if (useContractVariable) {
            const { contract: address } = chain;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const mintContract = new ethers.Contract(
              address,
              campaignMintAbi,
              provider
            );

            let accounts = await provider.send("eth_requestAccounts", []);
            let account = accounts[0];

            const userMinted = await mintContract.functions.userMinted(account);

            dispatch(setTotal(Number(userMinted)));
            setMintLimit({
              ...mintLimits,
              [chainNonce]: MAX_MINT - Number(userMinted || 0),
            });
          }
          const [claims] = await Promise.all([
            (
              await fetch(
                `${REST_API}/get-chain-claims/${chainNonce}/${account}`
              )
            ).json(),
          ]);

          setMintLimit({
            ...mintLimits,
            [chainNonce]: MAX_MINT - Number(claims?.claimed || 0),
          });

          dispatch(setApproveLoader(false));
        } catch (e) {
          console.log(e, "e");
          if (e.message === "Chain does not match") {
            return;
          }
        }
        dispatch(setApproveLoader(false));
      }
    })();
  }, [account, choosenChain, x, refresh]);

  const increase = () => {
    if (countMint < mintLimits[chains[choosenChain].chainNonce])
      setCountMint((countMint) => countMint + 1);
  };
  const decrease = () => {
    if (countMint > 1) setCountMint((countMint) => countMint - 1);
  };

  const mintNft = async () => {
    try {
      dispatch(setApproveLoader(true));
      const chain = chains[choosenChain];
      const { chainNonce, contract: address } = chain;

      let chainWrapper = await bridge.getChain(Number(chainNonce));

      const contract = new ethers.Contract(
        address,
        xpnetClaimAbi,
        chainWrapper.signer
      );

      if (!contract) {
        throw Error("Contract instance is not created");
      }

      const results = [];
      for (let i = 0; i < countMint; i++) {
        const res = await contract["claim"]();
        await res.wait();
        results.push(res);
      }
      const singleSuccess = results.find((x) => x.hash);

      if (singleSuccess.hash) {
        dispatch(setSuccess(true));
        // setCountMint(Math.max(countMint - results.length, 1));
        setMintLimit({
          ...mintLimits,
          [chainNonce]: Math.max(mintLimits[chainNonce] - results.length, 0),
        });
      }
    } catch (e) {
      console.error(e);
      dispatch(setError({ message: e.message }));
    }
    dispatch(setApproveLoader(false));
    setRefresh(!refresh);
  };
  const dispatch = useDispatch();

  const button = account ? (
    <button
      style={account ? {} : { opacity: 0.6, pointerEvents: "none" }}
      onClick={mintNft}
    >
      Mint on {chains[choosenChain].name}
    </button>
  ) : (
    <button
      onClick={() => {
        dispatch(setWalletsModal(true));
      }}
    >
      Connect Wallet
    </button>
  );

  return (
    <>
      <div
        style={
          mintLimits[chains[choosenChain].chainNonce] !== 0
            ? {}
            : { opacity: 0.6, pointerEvents: "none" }
        }
        className="mint-nft-container line-down-margin-24"
      >
        <div
          className="amount-mint-nft"
          style={account ? {} : { opacity: 0.6, pointerEvents: "none" }}
        >
          <span onClick={decrease}>-</span>
          <div>{countMint}</div>
          <span onClick={increase}>+</span>
        </div>
        {button}
      </div>
    </>
  );
};
