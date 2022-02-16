import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import generalSlice from "./reducers/generalSlice";
import settingSlice from "./reducers/settingsSlice";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

export default configureStore({
  reducer: {
    general: generalSlice,
    settings: settingSlice,
  },
  middleware,
});
