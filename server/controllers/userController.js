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

      namedList = [];
      for await (let place of savedList) {
        const storedPlace = await db.query(`SELECT place_name FROM places where place_id = ${place}`)
        const name = storedPlace.rows[0].place_name
        namedList.push(name)
      }
    
      res.locals.savedList = namedList;
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

      //get beenList from user, is array of objects that ha
      const { beenList } = user;
      const namedList = [];

      for await (let place of beenList) {
        const storedPlace = await db.query(`SELECT place_name FROM places where place_id = ${place.locationID}`)
        const name = storedPlace.rows[0].place_name
        const { score, tags } = place;
        namedList.push({name: name, score: score, tags: tags})
      }
      res.locals.beenList = namedList;
      return next();

    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  savePlace: async (req, res, next) => {
    try {
      const { username, placeName } = req.body;
      console.log('reqbody: ', req.body)
      const storedPlaceID = await db.query(`SELECT place_id FROM places where place_name = '${placeName}'`)

      // console.log('storedPlaceID.rows[0].place_id: ', storedPlaceID.rows[0].place_id)
      const user = await User.findOne({ username: username });
    
      if (!user) {
        const err = new Error('Error in UserController.savedPlace: User not found');
        return next(err);
      }
      const update = await User.findOneAndUpdate({
        username: `${username}`},
        {$addToSet: {"savedList": `${storedPlaceID.rows[0].place_id}`}}
        );

      console.log('update: ', update)
      //get beenList from user, is array of objects that ha
      // const { beenList } = user;
      // const namedList = [];

      // for await (let place of beenList) {
      //   const storedPlace = await db.query(`SELECT place_name FROM places where place_id = ${place.locationID}`)
      //   const name = storedPlace.rows[0].place_name
      //   const { score, tags } = place;
      //   namedList.push({name: name, score: score, tags: tags})
      // }
      // res.locals.beenList = namedList;
      return next();

    } catch (error) {
      const err = new Error('Error in UserController.savePlace: ' + error.message);
      return next(err);
    }
  }
};


module.exports = UserController;
