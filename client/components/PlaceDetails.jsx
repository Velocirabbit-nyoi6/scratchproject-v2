import React, { useEffect, useState } from "react";
import axios from "axios";



const PlaceDetails = (props) => {
    const [photosArr, setPhotosArr] = useState([]);

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
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
        <h2>Place details for {props.name}</h2>
        <h2>Address is {props.address}</h2>
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
        </div>
    );
};

export default PlaceDetails;
