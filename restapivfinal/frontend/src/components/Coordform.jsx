/* global google */
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCoord} from '../features/coord/coordSlice'
import { createTime,deleteTime } from '../features/Timeauth/timeSlice'
import {getalltimesplease} from '../features/alltimeAuth/allSlice'
import { deleteCoord } from '../features/coord/coordSlice'
import { updatetheTime } from '../features/Timeauth/timeSlice'
import { updateCoord } from '../features/coord/coordSlice'
import { useGeolocation } from "rooks";
import Time from './Time';
import { Promise } from 'mongoose';
import { Button, Grid} from '@material-ui/core';
import { reset } from '../features/coord/coordSlice'
import { getTime } from '../features/Timeauth/timeSlice'
import { getCoord } from '../features/coord/coordSlice'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const googleMapScript = document.createElement('script')
            googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHxDxv8mSSSyg6zmbeKDHeHuYTziolRNs";
            googleMapScript.setAttribute('async','');
            window.document.body.appendChild(googleMapScript)




function Coordform() {
  const [when, setWhen] = useState(false);


  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector((state) => state.auth)
 
  const { time, isLoading, isError, message } = useSelector(
    (state) => state.time
  )

  const { locations } = useSelector(
    (state) => state.coord
  )
  const { alltimes } = useSelector(
    (state) => state.alltime
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getCoord())

    dispatch(getalltimesplease())

    dispatch(getTime())
    return () =>{
      dispatch(reset())
    }
  }, [user, navigate,isError,message,dispatch])

 

  const geoObj = useGeolocation({
    when,
  });

  return (
    <div>
      <Grid container justify="center">
      <Button
        onClick={() => {
          if(geoObj != null)
          {
            console.log(alltimes[0])
            const templng = geoObj.lng
            const templat = geoObj.lat
            const value = locations.length
            const valuetwo = time.length
            if(value== 0)
            {
              
              dispatch(createCoord({geoObj}))
              

            }
            else
            {
              (locations.map((location) => (dispatch(deleteCoord(location._id)))))
              dispatch(createCoord({geoObj}))
            }
            
        
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
              if(valuetwo == 0)
              {
                
                dispatch(createTime({temp1}))
              }
              else
              {
                
                (time.map((newtime) => (dispatch(deleteTime(newtime._id)))))
                dispatch(createTime({temp1}))
              }
              
            })
            
                      

          };
          setWhen(true);
          
        }}
        color="primary" size="large" type="submit" variant="contained">
        Get Geolocation
      </Button>
      {/* <p >Response</p>
      <p id="response"></p> */}
      </Grid>
 
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      {geoObj && 
        <p textAlign>
          Latitude: {geoObj.lat}
          <br></br>
          Longitude: {geoObj.lng}
        </p>}
      </div>



    </div>
  );
}



export default Coordform
