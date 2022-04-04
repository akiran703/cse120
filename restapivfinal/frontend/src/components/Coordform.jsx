/* global google */
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCoord} from '../features/coord/coordSlice'
import { createTime } from '../features/Timeauth/timeSlice'
import { useGeolocation } from "rooks";
import Time from './Time';
import { Promise } from 'mongoose';

const googleMapScript = document.createElement('script')
            googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHxDxv8mSSSyg6zmbeKDHeHuYTziolRNs";
            googleMapScript.setAttribute('async','');
            window.document.body.appendChild(googleMapScript)


function Coordform() {
  const [when, setWhen] = useState(false);
  
  let someshit = 0
  
  const dispatch = useDispatch()

  const geoObj = useGeolocation({
    when,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => {
          if(geoObj != null && someshit < 1)
          {
            const templng = geoObj.lng
            const templat = geoObj.lat
            someshit++
            dispatch(createCoord({geoObj}))
            
            
            const service = new google.maps.DistanceMatrixService();
            const geocoder = new google.maps.Geocoder();
            // build request
            const origin1 = { lat: templat, lng: templng };
            const origin2 = "Current, Location";
            const destinationA = "Turlock, US";
            const destinationB = { lat: 39.9467655, lng: -75.1312118 };
            const request = {
              origins: [origin1, origin2],
              destinations: [destinationA, destinationB],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false,
            };
            service.getDistanceMatrix(request).then((response) => {
              // put response
              const temp1 = response.rows[0].elements[0].duration
              dispatch(createTime({temp1}))
            
              
              // document.getElementById("response").innerText = JSON.stringify(
              //   response,
              //   null,
              //   2
              // );
            })
         
    
                      

          };
          setWhen(true);
          
        }}
      >
        Get Geolocation
      </button>
      <p>{geoObj && JSON.stringify(geoObj)}</p>
      {/* <p >Response</p>
      <p id="response"></p> */}
    </div>
  );
}

export default Coordform
