import { createSlice } from "@reduxjs/toolkit";
import firstNftImage from '../../assets/img/slider/s3.png'
const initialState = {
    nft:{
        image:  firstNftImage,
        name: "Lorem Ipsum",
        id: "666"
    }
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    
  },
});

export const {
 
} = sliderSlice.actions;

export default sliderSlice.reducer;
