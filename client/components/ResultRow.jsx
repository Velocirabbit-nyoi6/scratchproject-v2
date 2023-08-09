import React from 'react';
import Modal from './Modal.js'
import { useState } from 'react';
const ResultRow = (props) => {
    const { place_name, category, address, neighborhood } = props.result

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

    return (
        <tr>
            <td>{place_name}</td>
            <td>{address}</td>
            <td>
            <button>Rate</button>
            <button>Save</button>
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
