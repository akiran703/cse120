import {useSelector,useDispatch} from 'react-redux'
import { getalldriversplease, reset } from '../features/getallDriversAuth/getdriversSlice'
import React, {useEffect} from 'react'
import {Button, Grid, Paper, makeStyles} from '@material-ui/core';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        border: "1px solid black"
    }, 
    root: {
        '& .MuiFormControl-root' : {
            width: '80%',
            margin:theme.spacing(1)
        }
    }
  }))

function AllDrivers() {
    const dispatch = useDispatch()
    const classes = useStyles();


    const { alldrivers, isError, message } = useSelector(
    (state) => state.alldriver
    )

    useEffect(() => {
        dispatch(getalldriversplease())
        return () =>{
        dispatch(reset())
        }
    }, [isError,message,dispatch])


  return (
    <div>
    <h1 align="center">Truck Driver Details</h1> 
    <Stack justifyContent="center" spacing={2} direction="row">
    <Button color="primary" type="button" variant="contained" href="/truck/all/po">List of Purchase / Order Number</Button>
    <Button color="primary" type="button" variant="contained" href="/truck/all/bol">View Bill of Lading </Button>
    </Stack>
    {alldrivers.map(input =>

            <Paper className={classes.pageContent}>



            <h1>Driver's Information</h1>
            <Grid container>
                <Grid item xs = {4}>
                    <h4>Name</h4>
                    <h2>{input.fullName}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>License Number / Employee ID</h4>
                    <h2>{input.licenseNo}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Phone Number</h4>
                    <h2>{input.phoneNo}</h2>
                </Grid>
            </Grid>
            <br></br>
            <h1>Truck's Information</h1>
            <Grid container>
                <Grid item xs = {4}>
                    <h4>Plate Number</h4>
                    <h2>{input.plateNo}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Appointment Number</h4>
                    <h2>{input.apptNo}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Starting Location</h4>
                    <h2>{input.startLoc}</h2>
                </Grid>
                <Grid item xs = {4}>
                    <h4>Type of Truck</h4>
                    <h2>{input.typeOfTruck}</h2>
                </Grid>
                
            </Grid>
            </Paper>              
        
        )}
    </div>
  )
}

export default AllDrivers