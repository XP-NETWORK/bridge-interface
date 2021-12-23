import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Widget.css"
import "./WidgetNight.css"
import "./WidgetLight.css"
export default function Widget() {
    const reg = new RegExp(/^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/ig)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const step = useSelector(state => state.general.step)


    const changePalette = palette => {
        document.body.classList.add(`${palette}-palette`)
    }
    
    const changeFontSize = (fontSize) => {
        document.body.classList.add(`font-size-${fontSize}`)
    }
    
    useEffect(() => {
        // debugger
        const p = new URLSearchParams(window.location.search)
        const widget = p.get('widget') === 'true'
        const body = document.getElementsByTagName("body")
        const nftContainer = document.querySelector(".nftContainer")
        // const nftSelectBox = document.querySelector(".nftSelectBox")
        
        if(widget) {
            const fontSize = p.get('fontsize')
            const palette = p.get('palette')

            palette && changePalette(palette);
            fontSize && changeFontSize(fontSize);
            onlyBridge()
        }
    },[])

    const onlyBridge = () => {
        // document.getElementById('collecSlideCont')?.remove()//!Collection in the bottom
        // document.getElementById('footer')?.remove()
        // document.getElementById('aboutnft')?.remove()
        // document.getElementById('tttt')?.remove()//! Tittle
        // document.getElementById('Header')?.remove() //! Navbar
        // document.getElementById('alertb')?.remove() //!Alert
        document.body.classList.add('widget')
    }
    return <>
    
    </>
}