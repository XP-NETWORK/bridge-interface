import { createSlice } from "@reduxjs/toolkit";
import firstNftImage from '../../assets/img/slider/s3.png'
import secondNftImage from '../../assets/img/slider/s2.png'
import thirdImage from '../../assets/img/slider/s4.png'

const initialState = {
    nfts:[{
        image:  firstNftImage,
        name: "Lorem Ipsum",
        id: "666",
        description: "Lorem Ipsum "
    },
    {
      image:  secondNftImage,
      name: "Lorem Ipsum",
      id: "667",
      description: "Lorem Ipsum "
    },
    {
      image:  thirdImage,
      name: "Lorem Ipsum",
      id: "667",
      description: "Lorem Ipsum "
    }],
    step: 0,
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
