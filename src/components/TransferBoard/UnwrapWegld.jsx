import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWrappedEGold } from "../../store/reducers/generalSlice";
import { getFactory } from "../../wallet/helpers";
import { chainsConfig } from "../values";
import { ExtensionProvider } from "@elrondnetwork/erdjs";

export default function UnwrapWegld() {
    const wrappedEGold = useSelector((state) => state.general.wrappedEGold);
    const from = useSelector((state) => state.general.from);
    const maiarProvider = useSelector((state) => state.general.maiarProvider);
    const [unwrapping, setUnwrapping] = useState("");
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const [dots, setDots] = useState("");
    console.log(
        "🚀 ~ file: UnwrapWegld.jsx ~ line 15 ~ UnwrapWegld ~ dots",
        dots
    );

    const dispatch = useDispatch();
    const unwrapWegld = async () => {
        setUnwrapping(true);
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
            if (unwrapped) {
                dispatch(setWrappedEGold(""));
                setUnwrapping(false);
            }
        } catch (error) {
            setUnwrapping(false);

            console.error(error);
        }
    };

    const handleClick = () => {
        unwrapWegld();
    };

    useEffect(() => {
        let interval;
        if (unwrapping) {
            interval = setInterval(() => {
                if (dots?.length !== 3) {
                    setDots(dots + ".");
                } else if (dots?.length === 3) {
                    setDots("");
                }
            }, 500);
        }
        if (!unwrapping) clearInterval(interval);
        return () => clearInterval(interval);
    });

    return wrappedEGold ? (
        <div
            style={unwrapping ? OFF : {}}
            onClick={handleClick}
            className="unwrapWegld"
        >
            {!unwrapping ? (
                <div>Unwrap eGold</div>
            ) : (
                <div style={{ width: "100px" }}>{`Unwrapping${dots}`}</div>
            )}
        </div>
    ) : (
        ""
    );
}
