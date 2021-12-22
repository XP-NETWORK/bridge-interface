import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Widget.css"
export default function Widget() {
    const reg = new RegExp(/^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/ig)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)


    const changeFontSize = (element, fontSize) => {
        switch (fontSize) {
            case 'sm':
                element.style.fontSize = '14px'
                break;
            case 'l':
                element.style.fontSize = '18px'
                break;
            case 'xl':
                element.style.fontSize = '22px'
                break;
            default:
                break;
        }
    }

    const changeBG = (element, bgColor) => {

        if(reg.test(bgColor)){
            element.style.backgroundColor = `#${bgColor}`
        }
        else{
            return
        }
    }

    const changeFontColor = (element, color) => {
        const all = element.getElementsByTagName("*")
        switch (color) {
            case "white":
                Array.prototype.forEach.call(all, (el) => {
                    el.classList.add("widgetWhite")
                })
                break;
            case "black":
            Array.prototype.forEach.call(all, (el) => {
                el.classList.add("widgetBlack")
            })
                break;
            default:
                break;
        }
    }

    const changeButtonColor = color => {
        document.body.classList.add(`body-btns-${color}`)
    }

    
    useEffect(() => {
        // debugger
        const p = new URLSearchParams(window.location.search)
        const widget = p.get('widget') === 'true'
        const body = document.querySelector(".bridgeBody")
        const nftContainer = document.querySelector(".nftContainer")
        const nftSelectBox = document.querySelector(".nftSelectBox")
        const themeButton = document.body.querySelector(".themBtn")

        nftSelectBox.style.background = "unset"
        
        if(widget) {
            const backgroundColor = p.get('background')
            const fontColor = p.get('color')
            const fontSize = p.get('fontsize')
            const btnColor = p.get("button")
            fontSize && changeFontSize(nftContainer, fontSize) 
            backgroundColor && changeBG(body, backgroundColor)
            fontColor && changeFontColor(nftSelectBox, fontColor)
            btnColor && changeButtonColor(btnColor)
            onlyBridge()
        }
    },[from, to])

    const onlyBridge = () => {
        document.getElementById('collecSlideCont')?.remove()
        document.getElementById('footer')?.remove()
        document.getElementById('aboutnft')?.remove()
        document.getElementById('tttt')?.remove()
        document.getElementById('Header')?.remove()
        document.getElementById('alertb')?.remove()
        document.body.classList.add('widget')
    }
    return <>
    
    </>
}