
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../store/reducers/generalSlice'
import { setNFTS } from '../../wallet/helpers'
import Approval from '../TransferBoard/Approval'
import ButtonToTransfer from './ButtonToTransfer'
import SelectedNFT from '../innercomponents/SelectedNFT'
import SendFees from './SendFees'

export default function MobileTransferBoard() {

    const dispatch = useDispatch()
    const from = useSelector((state) => state.general.from.key);
    const type = useSelector((state) => state.general.from.type);
    const algorandAccount = useSelector((s) => s.general.algorandAccount);
    const tronWallet = useSelector((state) => state.general.tronWallet);
    const account = useSelector((state) => state.general.account);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);

    async function getNFTsList() {
        const useHardcoded = false;
        const hard = "0x6449b68cc5675f6011e8DB681B142773A3157cb9";
        try {
          const w = useHardcoded
            ? hard
            : type === "EVM"
            ? account
            : type === "Tezos"
            ? tezosAccount
            : type === "Algorand"
            ? algorandAccount
            : type === "Elrond"
            ? elrondAccount
            : type === "Tron"
            ? tronWallet
            : undefined;
          await setNFTS(w, from);
        } catch (error) {
          dispatch(setError(error.data ? error.data.message : error.message));
        }
      }

  return (
    <div className="mobileOnly">
    <SelectedNFT />
    <Approval getNft={getNFTsList} />
    <div className="nftSendBtn disenable">
      <SendFees />
      <ButtonToTransfer />
    </div>
  </div>
  )
}
