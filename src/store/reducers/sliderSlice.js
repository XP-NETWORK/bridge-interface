import { createSlice } from "@reduxjs/toolkit";
import firstNftImage from '../../assets/img/slider/s3.png'
const initialState = {
    nft:{
        image:  firstNftImage,
        name: "Lorem Ipsum",
        id: "666",
        description: "Lorem Ipsum "
    },
    step: 1,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setStep(state, action){
      state.step = action.payload
    }
  },
});

export const {
 setStep
} = sliderSlice.actions;

export default sliderSlice.reducer;
