import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import generalSlice from "./reducers/generalSlice";
import paginationSlice from "./reducers/paginationSlice";
import settingSlice from "./reducers/settingsSlice";
import signersSlice from "./reducers/signersSlice";
import sliderSlice from "./reducers/sliderSlice";
import widgetSlice from "./reducers/widgetSlice";
import transferResultsSlice from "./reducers/transferResultsSlice";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

export default configureStore({
  reducer: {
    general: generalSlice,
    settings: settingSlice,
    slider: sliderSlice,
    signers: signersSlice,
    pagination: paginationSlice,
    transferResults: transferResultsSlice,
    widget: widgetSlice,
  },
  middleware,
});
