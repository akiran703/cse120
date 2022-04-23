import React, { Fragment, useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import {createUpload, deleteUpload, getUploads, reset} from '../features/upload/uploadSlice'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message';
import { Button } from '@material-ui/core';

// user uploads bill of lading
function FileUpload() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { uploads, isLoading, isError, message1 } = useSelector(
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
      }, [user, navigate,isError,message1,dispatch])

    const [input, setInput] = useState({image: '' });
    const [message, setMessage] = useState('');
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = React.useState(
      false)
  const [items, setItems] = useState({})

  const {image} = input

  function handleClick(event) {
    event.preventDefault()

    try {
      if (image === "") {
        setMessage('No File Uploaded');
      }
      else {
        const uploadData = {image}
        if (uploads.length == 0) {
          dispatch(createUpload(uploadData))
      } else {
          {uploads.map((upload) => (dispatch(deleteUpload(upload._id))))}
          dispatch(createUpload(uploadData))
      }
        setMessage('File Uploaded');
        setIsSuccessfullySubmitted(true);
      }

    } catch(err) {
        if(err.response.status === 500) {
            setMessage('There was a problem with the server');
        } else {
            setMessage(err.response.data.msg);
        }
    }
  

  }

  
  return (
    <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      Upload Bill of Lading
    </h4>
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={handleClick}>
        <div className='custom-file mb-4'>
        <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setInput({ ...input, image: base64 })}/>
        </div>
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
        
        
      </form>

        {input ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <img style={{ width: '100%' }} src={input.image} alt='' />
          </div>
        </div>
      ) : null}

      {isSuccessfullySubmitted && (
              <Button fullWidth color="primary" size="large" type="button" variant="contained" onClick={() => {navigate("/truck/coord")}}>
              Confirm
            </Button>
        )}

    </Fragment>
    </div>
    );
  }
  
export default FileUpload;
