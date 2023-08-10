import React, { useEffect, useState } from "react";
import axios from "axios";



const PlaceDetails = (props) => {

    // add a function def for the pill component:
    function insertTags(tagsArray) {
        const tagContainer = document.getElementById('tagContainer');
      
        tagsArray.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.classList.add('tag');
          tagElement.textContent = tag;
          tagContainer.appendChild(tagElement);
        });
      }
      
      // Call the function with your tags array
    const [photosArr, setPhotosArr] = useState([]);

    const [googleInfo, setGoogleInfo] = useState({})
    useEffect(() => {
        if (props.show) {
            const getStatsConfig = {
                method: "get",
                url: `/api/placeinfo?address=${props.address}&name=${props.name}`,
                headers: {},
            };

            axios(getStatsConfig)
                .then((res) => {
                    const fetchedPhotosArr = res.data.photos.map((result) => result.photo_reference);
                    console.log('array of fetched photos' + fetchedPhotosArr)
                    setPhotosArr(fetchedPhotosArr);
                    const {serves_beer, serves_brunch, reviews, rating, opening_hours, user_ratings_total, types} = res.data
                    const open_now = opening_hours.open_now
                    const reviewAuthor = reviews[0].author_name
                    const reviewText = reviews[0].text
                    console.log(Object.keys(res.data))
                    setGoogleInfo({
                        serves_beer: serves_beer,
                        serves_brunch: serves_brunch,
                        reviewAuthor : reviewAuthor,
                        rating : rating,
                        open_now : open_now,
                        reviewText : reviewText,
                        user_ratings_total: user_ratings_total
                    })

                    insertTags(types)
                })
                .catch((error) => {
                    console.error("Error fetching place info:", error);
                });

        }
    }, [props.show, props.address, props.name]);

    return (
        <div id="imageContainer" style = {{
          display: 'flex',
          flexDirection : 'column'
        }} >
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 , color: 'black'}}>
        <h2>Place details for {props.name}</h2>
        <p>{props.name} has a star rating of <bold>{googleInfo.rating}</bold> on {googleInfo.user_ratings_total} reviews, with {googleInfo.reviewAuthor} giving a good review. {googleInfo.open_now
        ? "They are open right now! "
        : "They are closed right now. "}
        
        {googleInfo.serves_beer
        ? "They do serve beer "
        : "They do not serve beer "
    } and they {googleInfo.serves_brunch
    ? "are known to be a good brunch spot. "
    : "but aren't known to be a good brunch spot. "}
    <br></br> <br></br>
    Here is top reviewer {googleInfo.reviewAuthor}'s take on {props.name}: <br></br>  <br></br>{googleInfo.reviewText}
    
    </p>
    </div>
    <div style={{ paddingTop: '50px' }}>
            {photosArr.length > 0 &&
                photosArr.slice(0,3).map((el, index) => (
                    <img
                        key={index}
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxHeight=600&photo_reference=${el}&key=${process.env.PLACESAPIKEY}`}
                        alt={`Photo ${index}`}
                        width = {400}
                        height = {290}
                        style= {{
                          marginRight : "8px"
                        }}
                    />
                ))}
                </div>
            <div id= "tagContainer" style = {{
                height: "100px",
                margin: "5px",
                backgroundColor : "lightGrey"
            }}>
            </div>
        </div>
    );
};

export default PlaceDetails;
