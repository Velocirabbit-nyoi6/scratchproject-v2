import Modal from './Modal.js'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResultRow = (props) => {
    const [savedPlace, setSavedPlace] = useState('');

    const { place_name, category, address, neighborhood } = props.result
    const username = props.username

    const savePlaceFunc = async () => {
        try {
            //query userRouter/tried with username in body
            const response = await axios.post('/api/savePlace', { placeName: place_name, username: username });
            //server should return an array of objects
            if (response.status === 200) {
            //check if it's in response.data!
                console.log('Saved Place!')
            }
        } catch (err) {
            console.error(err);
        }
          
    };
    //create state for place location
    //on save click send a post request to back end containing place name and username

    //on back end get place name, query sql database for name and get back place id
    //add place id to user document saved array
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
            <button onClick={savePlaceFunc}>Save</button>
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
