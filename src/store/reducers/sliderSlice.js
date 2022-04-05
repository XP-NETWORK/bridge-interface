import { createSlice } from "@reduxjs/toolkit";
import image01 from '../../assets/img/slider/s1.png'
import image02 from '../../assets/img/slider/s2.png'
import image03 from '../../assets/img/slider/s3.png'
import image04 from '../../assets/img/slider/s4.png'
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
        image:  image01,
        name: "Lorem Ipsum",
        id: "666",
        description: "Lorem Ipsum ",
        progWidth: 0,
        action: false
    },
    {
      image:  image02,
      name: "Lorem Ipsum",
      id: "667",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false

    },
    {
      image:  image03,
      name: "Lorem Ipsum",
      id: "668",
      description: "Lorem Ipsum ",
      progWidth: 0,
      action: false
    },
    {
      image:  image04,
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
    }
  ],
    step: 0,
    position: 0
};

initialState.progWidth = initialState.nfts.map(n => 0)

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
      state.progWidth[state.step] = state.progWidth[state.step] + 1
    },
    setPosition(state){
      state.position = state.position - 78
    },
    moveForward(state, action){
     state.position = state.position - (action.payload * 78)
    },
    moveBack(state, action){
      state.position = state.position - (action.payload * 78)
    },
    fill(state, action){
      state.nfts = state.nfts.map((nft, index) => {
        if(index < action.payload){
          nft.progWidth = 100
          nft.action = false
        }
        else if(index > action.payload){
          nft.progWidth = 0
          nft.action = false
        }
        return nft
      })
    },
    fillAfter(state, action){
      state.nfts = state.nfts.map((nft, index) => {

        return nft
      })
    }
  },
});

export const {
 setProgWidth,
 setActionOn,
 setActionOff,
 setStep,
 setPosition,
 moveForward,
 moveBack,
 fill,
 fillAfter
} = sliderSlice.actions;

export default sliderSlice.reducer;
