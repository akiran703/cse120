import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getDrivers, reset } from '../features/check/checkSlice'
import { getUploads} from '../features/upload/uploadSlice'
import React, {useEffect, useState} from 'react'
import {Select, MenuItem, Grid, Typography, Paper, makeStyles, Link} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  }, 
  root: {
      '& .MuiFormControl-root' : {
          width: '80%',
          margin:theme.spacing(1)
      }
  }
}))


// shows what the driver inputted on DetailsForm with links to UploadItem and ListItem
function DriverDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles();


  const { user } = useSelector((state) => state.auth)
  const { drivers, isLoading, isError, message } = useSelector(
    (state) => state.driver
  )
  const { uploads, isLoading1, isError1, message1 } = useSelector(
    (state) => state.upload
  )


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getDrivers())
    dispatch(getUploads())
    return () =>{
      dispatch(reset())
    }
  }, [user, navigate,isError,message,dispatch])

  

  return (
    <>
        <Typography>
            <h1 align="center">Truck Driver Details</h1> 
            <Paper className={classes.pageContent}>
            {drivers.length > 0 ? (
          <div>
            {drivers.map((driver) => (
              <div>
            <h1>Driver's Information</h1>
            <Grid container>
                <Grid item xs = {4}>
                    <h4>Name</h4>
                    <h2>{driver.fullName}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>License Number / Employee ID</h4>
                    <h2>{driver.licenseNo}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Phone Number</h4>
                    <h2>{driver.phoneNo}</h2>
                </Grid>
            </Grid>
            <br></br>
            <h1>Truck's Information</h1>
            <Grid container>
                <Grid item xs = {4}>
                    <h4>Plate Number</h4>
                    <h2>{driver.plateNo}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Appointment Number</h4>
                    <h2>{driver.apptNo}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Starting Location</h4>
                    <h2>{driver.startLoc}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Type of Truck</h4>
                    <h2>{driver.typeOfTruck}</h2>
                </Grid>
                {driver.typeOfTruck == 'Inbound' && 
                  <Grid item xs = {4}>
                  <Link href="/truck/details/listOfPO">List of Purchase / Order Number</Link>
                  <br></br>
                  <Link href="/truck/details/image">View Bill of Lading </Link>
                </Grid>
                }
                
              </Grid>
              
        </div>
            ))}
          </div>
        ) : (
          <h3>You did not complete the Check In Form</h3>
        )}

        
            </Paper>

            </Typography>
    </>
  )
}

export default DriverDetails
