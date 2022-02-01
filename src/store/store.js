import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import generalSlice from "./reducers/generalSlice";

const middleware = [...getDefaultMiddleware({
  serializableCheck: false
})];

export default configureStore({
  reducer: {
    general: generalSlice,
  },
  middleware,
});



