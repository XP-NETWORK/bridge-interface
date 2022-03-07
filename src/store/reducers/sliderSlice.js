import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nft:{
        image:  '../../assets/img/slider/s3.png',
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
