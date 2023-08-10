import Modal from './Modal.js'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ResultRow = (props) => {
    const [savedPlace, setSavedPlace] = useState('');

    const [show, setShow] = useState({show : false})
    const detailsClickHandle = () =>{

        showModal()
    }

    const showModal = () => {
        setShow({show : true})
    }

    const hideModal = () => {
        setShow({show : false})
    }

    const { place_name, category, address, neighborhood } = props.result

    return (
        <tr>
            <td>{place_name}</td>
            <td>{address}</td>
            <td>
            <button>Rate</button>
            <button >Save</button>
            <button id = "setModal" onClick = {detailsClickHandle}>Details</button>
            </td>
            {show && (
                <Modal show={show.show} handleClose={hideModal} rowObj={props.result} />
            )}
        </tr>
    );
}
//             <Modal show = {show.show} handleClose = {hideModal} rowObj = {props.result}></Modal>

export default ResultRow;
