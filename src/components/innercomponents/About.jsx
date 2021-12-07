import React from 'react'
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'

export default function About() {
    const dispatch = useDispatch()
    const show = useSelector(state => state.general.about)
    return (
        <Modal show={show}>
            
        </Modal>
    )
}
