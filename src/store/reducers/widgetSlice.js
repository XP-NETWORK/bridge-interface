import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setWidget(state, action) {
      state.widget = action.payload;
    },
    setWid(state, action) {
      state.wid = action.payload;
    },
    setWSettings(state, action) {
      state.wsettings = action.payload;
    },
    setWConnect(state, action) {
      state.wconnect = action.payload;
    },
  },
});

export const {
  setWidget,
  setWid,
  setWSettings,
  setWConnect,
} = widgetSlice.actions;

export default widgetSlice.reducer;
