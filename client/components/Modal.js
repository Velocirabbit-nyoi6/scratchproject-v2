
import '../../css/modal.css';
import React from 'react';
import PlaceDetails from './PlaceDetails.jsx';

// Modal component takes the row data as a prop and retrives image and reviews from the places API. Pass the row object as a prop to then use in async calling

const Modal = ({ handleClose, show, rowObj }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div
    className={showHideClassName}
    style={{
      position: 'fixed',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '20px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '80%', // Set a maximum height for the modal
      overflowY: 'auto', // Enable vertical scrolling when content exceeds max-height
    }}
  >
      <section className="modal-main" >
        <PlaceDetails name = {rowObj.place_name} category = {rowObj.category} address = {rowObj.address} show = {show}></PlaceDetails>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal