import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import discountSlice from "./reducers/discountSlice";
import generalSlice from "./reducers/generalSlice";
import paginationSlice from "./reducers/paginationSlice";
import settingSlice from "./reducers/settingsSlice";
import signersSlice from "./reducers/signersSlice";
import sliderSlice from "./reducers/sliderSlice";
import transferResultsSlice from "./reducers/transferResultsSlice";
import tonStore from "../components/Wallet/TONWallet/tonStore";
import eventSlice from "./reducers/eventSlice";

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: false,
    }),
];

export default configureStore({
    reducer: {
        tonStore: tonStore,
        general: generalSlice,
        discount: discountSlice,
        settings: settingSlice,
        slider: sliderSlice,
        signers: signersSlice,
        events: eventSlice,
        pagination: paginationSlice,
        transferResults: transferResultsSlice,
    },
    middleware,
});
