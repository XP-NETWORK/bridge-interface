import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Widget.css"
import "./WidgetNight.css"
import "./WidgetLight.css"
import { setWidget } from '../../store/reducers/generalSlice'
export default function Widget() {
    const reg = new RegExp(/^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/ig)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const step = useSelector(state => state.general.step)
    const dispatch = useDispatch()

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
        dispatch(setWidget(true))
        // if(step === 1)document.getElementById('collecSlideCont')?.remove()//!Collection in the bottom
        if(document.getElementById('footer'))document.getElementById('footer')?.remove()
        if(document.getElementById('aboutnft'))document.getElementById('aboutnft')?.remove()
        // if(document.getElementById('tttt'))document.getElementById('tttt')?.remove()//! Tittle
        // if(document.getElementById('Header'))document.getElementById('Header')?.remove() //! Navbar
        // if(document.getElementById('alertb'))document.getElementById('alertb')?.remove() //!Alert
        document.body.classList.add('widget')
    }
    return <>
    
    </>
}