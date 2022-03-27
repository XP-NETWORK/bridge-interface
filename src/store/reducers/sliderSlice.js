import { createSlice } from "@reduxjs/toolkit";
import image1 from '../../assets/img/nfts/nft_1.png'
import image2 from '../../assets/img/nfts/nft_2.png'
import image3 from '../../assets/img/nfts/nft_3.png'
import image4 from '../../assets/img/nfts/nft_4.png'
import image5 from '../../assets/img/nfts/nft_5.png'
import image6 from '../../assets/img/nfts/nft_6.png'
import image7 from '../../assets/img/nfts/nft_7.png'
import image8 from '../../assets/img/nfts/nft_8.png'
import image9 from '../../assets/img/nfts/nft_9.png'

const initialState = {
    nfts:[
    {
        image:  image1,
        name: "Lorem Ipsum",
        id: "666",
        description: "Lorem Ipsum ",
        progWidth: 0,
        action: false
    },
    {
      image:  image2,
      name: "Lorem Ipsum",
      id: "667",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false

    },
    {
      image:  image3,
      name: "Lorem Ipsum",
      id: "668",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image4,
      name: "Lorem Ipsum",
      id: "669",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image5,
      name: "Lorem Ipsum",
      id: "669",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image6,
      name: "Lorem Ipsum",
      id: "669",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image7,
      name: "Lorem Ipsum",
      id: "669",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image8,
      name: "Lorem Ipsum",
      id: "669",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image9,
      name: "Lorem Ipsum",
      id: "669",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    }
  ],
    step: 0,
    position: 0
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setStep(state, action){
      state.step = action.payload
    },
    setActionOff(state){
      state.nfts[state.step].action = false
    },
    setActionOn(state){
      state.nfts[state.step].action = true
    },
    setProgWidth(state){
      state.nfts[state.step].progWidth = state.nfts[state.step].progWidth + 1
    },
    setPosition(state){
      state.position = state.position - 78
    }
  },
});

export const {
 setProgWidth,
 setActionOn,
 setActionOff,
 setStep,
 setPosition
} = sliderSlice.actions;

export default sliderSlice.reducer;
