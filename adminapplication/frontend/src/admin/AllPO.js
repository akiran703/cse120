import {useSelector,useDispatch} from 'react-redux'
import { getAllPOs, reset } from '../features/allPO/allPOSlice'
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

function AllPO() {

    const dispatch = useDispatch()
    const classes = useStyles();


    const { allpos, isError, message } = useSelector(
    (state) => state.allpo
    )
    const { alldrivers } = useSelector(
        (state) => state.alldriver
        )

    useEffect(() => {
        dispatch(getAllPOs())
        dispatch(getalldriversplease())

        return () =>{
        dispatch(reset())
        }
    }, [isError,message,dispatch])

  return (
    <div>
                {allpos.map((list) => (
                    <div>
                    {alldrivers.map((drivers) => (
                        <div>
                        {drivers.user === list.user && drivers.typeOfTruck === "Inbound" &&
                            <Paper className={classes.pageContent}>
                            <h1 align="center">List of Purchase / Order Number of {drivers.fullName}</h1> 

                            <Grid container spacing={1} >

                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 1</h4>
                                <h2>{list.po1}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 2</h4>
                                <h2>{list.po2}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 3</h4>
                                <h2>{list.po3}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 4</h4>
                                <h2>{list.po4}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 5</h4>
                                <h2>{list.po5}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 6</h4>
                                <h2>{list.po6}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 7</h4>
                                <h2>{list.po7}</h2>
                            </Grid>
                            <Grid item xs = {12} md={6}>
                                <h4>Purchase / Order Number 8</h4>
                                <h2>{list.po8}</h2>
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

export default AllPO