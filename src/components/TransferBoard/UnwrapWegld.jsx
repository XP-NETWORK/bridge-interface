import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWrappedEGold } from "../../store/reducers/generalSlice";
import { getFactory } from "../../wallet/helpers";
import { chainsConfig } from "../values";
import { ExtensionProvider } from "@elrondnetwork/erdjs";

export default function UnwrapWegld() {
    const wrappedEGold = useSelector((state) => state.general.wrappedEGold);
    const from = useSelector((state) => state.general.from);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const maiarProvider = useSelector((state) => state.general.maiarProvider);

    const dispatch = useDispatch();
    const unwrapWegld = async () => {
        try {
            const signer = maiarProvider || ExtensionProvider.getInstance();
            const factory = await getFactory();
            const elronfFactory = await factory.inner(
                chainsConfig[from.text].Chain
            );
            const unwrapped = await elronfFactory.unwrapWegld(
                signer,
                wrappedEGold
            );
            console.log(
                "🚀 ~ file: UnwrapWegld.jsx ~ line 22 ~ unwrapWegld ~ unwrapped",
                unwrapped
            );
            if (unwrapped) dispatch(setWrappedEGold(""));
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = () => {
        unwrapWegld();
    };

    return wrappedEGold ? (
        <div onClick={handleClick} className="unwrapWegld">
            Unwrap eGold
        </div>
    ) : (
        ""
    );
}
