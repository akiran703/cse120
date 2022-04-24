import React, {useEffect, useState} from 'react'
import {Select, MenuItem, Grid, Typography, Paper, makeStyles, Link} from '@material-ui/core';
import { getUploads , reset} from '../features/upload/uploadSlice'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'


// gets the image that the user has uploaded
function UploadItem() { 
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector((state) => state.auth)

  const { uploads, isLoading, isError, message } = useSelector(
    (state) => state.upload
  )


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getUploads())
    return () =>{
      dispatch(reset())
    }
  }, [user, navigate,isError,message,dispatch])

  return (
    <div>
        {uploads.length > 0 ? (
          <div>
            {uploads.map((upload) => (
              <div>
                <Grid container>
                <Grid item xs = {4}>
                  <img src = {upload.image}></img>
                </Grid>
              </Grid>
              </div>

              ))}
          </div>
        ) : (
          <h3>No image uploaded</h3>
        )}
              
        </div>
  )
}

export default UploadItem