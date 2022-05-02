import {useSelector,useDispatch} from 'react-redux'
import { getAllBOLs, reset } from '../features/allBOL/allBOLSlice'
import React, {useEffect} from 'react'
import {Grid, Paper, makeStyles} from '@material-ui/core';
import { getalldriversplease } from '../features/getallDriversAuth/getdriversSlice'

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

function AllBOL() {

    const dispatch = useDispatch()
    const classes = useStyles();


    const { allbols, isError, message } = useSelector(
    (state) => state.allbol
    )
    const { alldrivers } = useSelector(
        (state) => state.alldriver
        )

    useEffect(() => {
        dispatch(getAllBOLs())
        dispatch(getalldriversplease())

        return () =>{
        dispatch(reset())
        }
    }, [isError,message,dispatch])
    console.log(allbols.length)
  return (
    <div>
                {allbols.map((upload) => (
                    <div>
                    {alldrivers.map((drivers) => (
                        <div>
                        {drivers.user === upload.user && drivers.typeOfTruck === "Inbound" &&
                            <Paper className={classes.pageContent}>
                            <h1 align="center">{drivers.fullName}'s Bill of Lading </h1> 

                            <Grid container>
                            <Grid item xs = {4}>
                            <img src = {upload.image}></img>
                            </Grid>
                            </Grid>
                            </Paper>
                        }
                        </div>
                    ))}
                    </div>
                ))}
    </div>
  )
}

export default AllBOL