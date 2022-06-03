import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import generalSlice from "./reducers/generalSlice";
import settingSlice from "./reducers/settingsSlice";
import sliderSlice from "./reducers/sliderSlice";
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
    transferResults: transferResultsSlice,
  },
  middleware,
});
