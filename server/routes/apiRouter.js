const express = require('express');
const router = express.Router();

//controllers
const userController = require('../controllers/userController.js');
const placesController = require('../controllers/placesController');

// signup route handler
router.post('/signup', userController.signup, (req, res, next) => {
  res.status(201).json({ message: 'User created!', user: res.locals.user });
});

// login route handler
router.post('/login', userController.login, (req, res, next) => {
  res
    .status(200)
    .json({ message: 'Logged in successfully!', user: res.locals.user });
});

// populate beenList handler, add middleware for querying mongo for beenList and SQL for location names
router.post('/beenList', userController.beenList, (req, res) => {

  res.status(200).json({beenList: res.locals.beenList})
});

router.post('/savedList', userController.savedList, (req, res) => {
  res.status(200).json({savedList: res.locals.savedList})
})

//populate results from user initiated search
router.post('/placeSearch', placesController.getResults, (req, res) => {
  res.status(200).send(res.locals.searchResults)
})

//populate user's saveList
router.post('/savePlace', userController.savePlace, (req, res) => {
  res.status(200).send(res.locals.savedPlace)
})
router.get('/placeinfo' , placesController.getGoogleInfo, placesController.getPlaceDetails, (req, res) =>{
  console.log('successful google retrieval')
  res.status(200).send(res.locals.googlePlaceDetails)
})

//populate tags for searchList
// router.get('/searchTags')
router.post('/deletedSavedPlace', userController.deleteSavedPlaced, (req, res) => {
  res.status(200).send('Deleted Saved Place!')
})

// to add global error handler in server.js later

module.exports = router;