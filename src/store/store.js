import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import generalSlice from "./reducers/generalSlice";

const middleware = [...getDefaultMiddleware()];

export default configureStore({
  reducer: {
    general: generalSlice,
  },
  middleware,
});
