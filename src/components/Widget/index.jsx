import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Widget() {
    
    useEffect(() => {
        const p = new URLSearchParams(window.location.search)
        const widget = p.get('widget') === 'true'
        if(widget) {
            onlyBridge()
        }
    },[])

    const onlyBridge = () => {
        document.getElementById('collecSlideCont')?.remove()
        document.getElementById('footer')?.remove()
        document.getElementById('aboutnft')?.remove()
        document.getElementById('tttt')?.remove()
        document.getElementById('Header')?.remove()
        document.body.classList.add('widget')
    }
    return <>
    
    </>
}