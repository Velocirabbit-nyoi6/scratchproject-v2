import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import SavedRow from './SavedRow.jsx'
import TriedRow from './TriedRow.jsx'


const UserPage = ({ username }) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [savedList, setSavedList] = useState([]);
  const [triedList, setTriedList] = useState([]);
  const getSaved = async () => {
    try {
      //query userRouters/saved with username in body
      const response = await axios.post('/api/savedList', { username });
      //server should return an array of saved places already queried for name
      if (response.status === 200) {
        //check if it's in response.data!!
        setSavedList(response.data.savedList);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getTrys = async () => {
    try {
      //query userRouter/tried with username in body
      const response = await axios.post('/api/beenList', { username });
      //server should return an array of objects
      if (response.status === 200) {
        //check if it's in response.data!
        setTriedList(response.data.beenList);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getSaved();
    getTrys();
  }, []);
  //generate rows for saved list
  const savedRows = savedList.map((savedPlace) => {
    return (
      <SavedRow name={savedPlace}/>
    );
  });
  // //generate rows for tried list
 
  const triedRows = triedList.map((place) => {
    return (
      <TriedRow place={place}/>
    );
  });
 
  return (
    <div className="container">
      <div className="bg-dark">
        {/* add a button to navigate to the search page */}
        <div className='lists'>
          <table className="table table-striped table-dark table-hover">
            <thead>
              <tr>
                <h4>Saved Spots!</h4>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {savedRows}
            </tbody>
          </table>
          <table className="table table-striped table-dark table-hover">
            <thead>
              <tr>
                <th><h4>Where You've Been</h4></th>
                <th><h4>Rating</h4></th>
                <th><h4>Tags</h4></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {triedRows}
            </tbody>
          </table>
        </div>
        <div className='searchButton'>
          <button className='btn btn-light' onClick={() => navigate('/search')}>Go to Search Page</button>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
