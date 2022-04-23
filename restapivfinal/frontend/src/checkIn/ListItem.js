import React, {useEffect, useState} from 'react'
import {Select, MenuItem, Grid, Typography, Paper, makeStyles, Link} from '@material-ui/core';
import { getLists , reset} from '../features/list/listSlice'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
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


// gets the List of Purchase / Order Number that the user has inputted
function ListItem() {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector((state) => state.auth)

  const { lists, isLoading, isError, message } = useSelector(
    (state) => state.list
  )


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getLists())
    return () =>{
      dispatch(reset())
    }
  }, [user, navigate,isError,message,dispatch])

  return (
    <div>
            <h1 align="center">List of Purchase / Order Number</h1> 
            <Paper className={classes.pageContent}>
            {lists.length > 0 ? (
                <div>
                {lists.map((list) => (
                <div>
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
            </div>
            ))}
          </div>
        ) : (
          <h3>List of Purchase / Order Number NOT COMPLETED</h3>
        )}
            </Paper>
              
        </div>
  )
}

export default ListItem