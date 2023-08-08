
import '/Users/jamesboswell/scratchproject-v2/css/modal.css';
import React from 'react';
import PlaceDetails from './PlaceDetails.jsx';

// Modal component takes the row data as a prop and retrives image and reviews from the places API. Pass the row object as a prop to then use in async calling

const Modal = ({ handleClose, show, rowObj }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <PlaceDetails name = {rowObj.place_name}></PlaceDetails>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal