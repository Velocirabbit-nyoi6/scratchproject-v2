const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const db = require('../../models/placesModel');

const UserController = {
  // create a new user in the database
  // their information will be sent in the request body
  signup: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
      });
      res.locals.user = newUser;
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.signup: ' + error.message);
      return next(err);
    }
  },

  // authenticate user login
  // user credentials will be sent in the request body
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        const err = new Error('Error in UserController.login: User not found');
        return next(err);
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        const err = new Error('Error in UserController.login: Wrong password');
        return next(err);
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  //getting saved list from mongo
  savedList: async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username: username });
      
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }

      //get savedList from user, should be an array of IDs
      const { savedList } = user;

      const namedSavedList = await savedList.map(placeObj => {const name = db.query(`SELECT name FROM places`);
      return {
        name: name,
        score: placeObj.score,
        tags: placeObj.tags
      }
      
    });
      
      res.locals.savedList = namedSavedList;

      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  beenList: async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username: username });
      
      if (!user) {
        const err = new Error('Error in UserController.savedList: User not found');
        return next(err);
      }

      //get beenList from user, should be an array of IDs
      const { beenList } = user;

      const namedList = await savedList.map(placeID => db.query(`SELECT name FROM places`));
      
      res.locals.beenList = namedList;

      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  }
};


module.exports = UserController;
