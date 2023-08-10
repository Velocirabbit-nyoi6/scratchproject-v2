const db = require('../../models/placesModel')
const axios = require('axios')
const OpenAI = require("openai-api")
// const configuration = new Configuration({
//     organization: "org-T1ohjGvniteRFZ7FjEO9c7YN",
//     apiKey: process.env.OPENAIKEY,
// });
const openai = new OpenAI(process.env.OPENAIKEY);

require('dotenv').config()

const placesController = {};

//populate search results
placesController.getResults = async (req, res, next) => {
    try{
        const { categories, neighborhoods } = req.body

        function format(array) {
            const joined = array.map(value => `'${value}'`).join(', ');
            const formatted = '(' + joined + ')';
            return formatted;
        }

        const formattedCategories = format(categories)
        const formattedNeighborhoods = format(neighborhoods)

        const selectResults = `SELECT place_name, category, address, neighborhood FROM places WHERE category IN ${formattedCategories} AND neighborhood IN ${formattedNeighborhoods}`

        const results = await db.query(selectResults);
        res.locals.searchResults = results.rows;
        return next();
    }
    catch(err) {
        err = {
            log: 'There was an error in the placesController.getResults middleware' + err,
            status: 500,
            message: { err: 'There was an unknown server error'}
        }
        return next(err)
    }

}

// this controller goes from the address provided to a google place ID and sets it to res.locals. Once this is in, we move to the next middleware to retrieve images and reviews
placesController.getGoogleInfo = async (req , res, next) =>{

    var getPlaceIDConfig = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + req.query.name+req.query.address + '&inputtype=textquery&fields=place_id%2Cformatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=' + process.env.PLACESAPIKEY,
            headers: {
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      };
      
      axios(getPlaceIDConfig)
      .then(function (response) {
        console.log("testing the env variable " + process.env.PLACESAPIKEY)
        res.locals.placeId = response.data.candidates[0].place_id
        console.log("successfully set the place id into res. Place_id is: " + res.locals.placeId)
        next()
      })
      .catch(function (error) {
        console.log(error);
        next(error)
      });
    // var getPhotosConfig = {
    //     method: 'get',
    //     url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=`,
    //     headers: {"Access-Control-Allow-Origin" : "*" }
    //   };
      
    //   axios(getPhotosConfig)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    // console.log(error);
    };

    // 
    placesController.getPlaceDetails = async (req, res, next) =>{
        console.log("reached get placed details")
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${res.locals.placeId}&key=${process.env.PLACESAPIKEY}`,
            headers: { }
          };

          try {const placesData = await axios(config)
          res.locals.googlePlaceDetails = placesData.data.result
          console.log("the place details are:" + res.locals.googlePlaceDetails)
          next()
          }
          catch (error){
            console.log("error in the place details MW")
            next(error)
          }
    }

    // DEPRICATED AS OF 6:09 on Weds
    placesController.getGoogleImages = async (req, res, next) => {
      
        const photosArr = res.locals.googlePlaceDetails.photos
        console.log(photosArr + " is the photos arr")
        let testReference;
        if (photosArr != null) testReference = photosArr[0].photo_reference
        console.log(testReference)
        try{
            var config = {
                method: 'get',
                // url: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${testReference}&key=AIzaSyCI7cjiE2dyrdhXsaesUcdY-DONsuVXvD0`,
                url : 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AUacShgdmBOHDHfCVK-jCCcB7a8kEmGgFWgZctCfS0t60TIUN7sN3RyYtkVxxXO0v4D8F9hONGaCtQV0ER1ZyM59w_z2zCihJsBESXbLnydVNRDDVI6gy4_99p22iS32Wf30Oa8dZ_y8Jwl5oes_ZRXggYyW_Oh_XLU1MNmsy2cdgNctY9TQ&key=AIzaSyCI7cjiE2dyrdhXsaesUcdY-DONsuVXvD0',
                headers: {}
              };
              axios(config).then((response)=>{
                if (response.headers['content-type'] === 'image/jpeg') console.log("CORRECT TYPE FROM API")
                res.locals.photo = response.data
                next()
              })
        }
        catch (error){
            console.log(error.message + " is the error")
            next("disaster in google images thing")
        }
    }


    placesController.getOpenAIDescription = async (req,res,next) =>{

        const gptResponse = await openai.complete({
            engine: 'davinci',
            prompt: 'Use the summaries provided to summarize the vibe of the place. The first review: ' + res.locals.googlePlaceDetails.reviews[0] + " \n the second review : " + res.locals.googlePlaceDetails.reviews[1],
            maxTokens: 200,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false
                  });
                  console.log(res.locals.googlePlaceDetails.reviews[0] + " checking the review string")
                  console.log(gptResponse.data);
                  res.locals.openAIText = gptResponse.data.text
                  next()
  }
module.exports = placesController;