import { Grid, TextField, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Paper} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {createDriver, deleteDriver, getDrivers, reset, updateDriver} from '../features/check/checkSlice'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        textAlign: "center"
    }, 
    root: {
        '& .MuiFormControl-root' : {
            width: '80%',
            margin:theme.spacing(1)
        }
    }
}))



function DetailsForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();

    const { user } = useSelector((state) => state.auth)
    const { drivers, isLoading, isError, message } = useSelector(
      (state) => state.driver
    )

    useEffect(() => {
        if (!user) {
          navigate('/login')
        }
        dispatch(getDrivers())
        return () =>{
          dispatch(reset())
        }
      }, [user, navigate,isError,message,dispatch])

    const [input, setInput] = useState({
        fullName: '',
        licenseNo: '',
        phoneNo: '',
        plateNo: '',
        apptNo: '',
        startLoc: '',
        typeOfTruck: 'Inbound'
    })

    const { fullName, licenseNo, phoneNo, plateNo, apptNo, startLoc, typeOfTruck } = input

    function handleInputChange(e) {

        setInput(prevInput => {
            return {
                ...prevInput,
                [e.target.name] : e.target.value,
            }
        })
    }

    function handleClick(event) {
        event.preventDefault()
        const driverData = {
            fullName, licenseNo, phoneNo, plateNo, apptNo, startLoc, typeOfTruck
        }
        if (input.typeOfTruck==='Outbound') {
            navigate("/truck/outbound");
        }  else {
            navigate("/truck/po");
        }  
        if (drivers.length == 0) {
            dispatch(createDriver(driverData))
        } else {
            {drivers.map((driver) => (dispatch(deleteDriver(driver._id))))}
            dispatch(createDriver(driverData))
        }

    }
    return (
        
        <form className={classes.root} autoComplete = "off">
            <h1 align="center">Truck Driver Check-In Form</h1> 

            <Paper className={classes.pageContent}>

                <h2 align="left">Driver's Information</h2>
                <Grid container spacing={1} justifyContent='center'>
                    
                    <Grid item xs = {12} md={4}>
                        <TextField 
                            variant = "outlined"
                            label = "Full Name"
                            name = "fullName"
                            value = {fullName}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={4}>
                        <TextField 
                            variant = "outlined"
                            label = "License Number / Employee ID"
                            name = "licenseNo"
                            value = {licenseNo}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={4}>
                        <TextField 
                            variant = "outlined"
                            label = "Phone Number"
                            name = "phoneNo"
                            value = {phoneNo}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    </Grid>
                    <br></br>
                    <h2 align="left">Truck's Information</h2>
                    <Grid container spacing={1} justifyContent="center">
                    <Grid item xs = {12} md={3}>
                        <TextField 
                            variant = "outlined"
                            label = "Plate Number"
                            name = "plateNo"
                            value = {plateNo}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={3}>
                        <TextField 
                            variant = "outlined"
                            label = "Appointment Number"
                            name = "apptNo"
                            value = {apptNo}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12} md={3}>
                        <TextField 
                            variant = "outlined"
                            label = "Where are you coming from?"
                            name = "startLoc"
                            value = {startLoc}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid inputMode='' xs = {12} md={3}>
                        <FormControl>
                            <FormLabel>Type of Truck</FormLabel>
                            <RadioGroup row
                            name = "typeOfTruck"
                            value = {typeOfTruck}
                            onChange = {handleInputChange}>
                                <FormControlLabel value="Inbound" control={<Radio />} label = "Inbound" />
                                <FormControlLabel value="Outbound" control={<Radio />} label = "Outbound" />
                            </RadioGroup>
                        </FormControl>


                    </Grid>
                </Grid>
                <br></br>
                <Grid container justifyContent="center">
                    <Button color="primary" size="large" type="button" variant="contained" onClick={handleClick}>
                        Check In
                    </Button>
                </Grid>

                </Paper>

            </form>
    )
}

export default DetailsForm