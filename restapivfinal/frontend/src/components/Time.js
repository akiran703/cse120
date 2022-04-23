import React from 'react'

function Time({temp}) {
    // const bounds = new google.maps.LatLngBounds();
    //  // initialize services
    // const geocoder = new google.maps.Geocoder();
    // const service = new google.maps.DistanceMatrixService();

 
    const templng = temp.geoObj.lng
    const templat = temp.geoObj.lat
    console.log(templat)
    console.log(templng)
}

export default Time
