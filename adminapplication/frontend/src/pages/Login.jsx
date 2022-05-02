import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {login,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Box from '@mui/material/Box';
import '../pages/Login.css'
import { textAlign } from '@mui/system'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

      })
    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
          (state) => state.auth
        )
        useEffect(() => {
          if (isError) {
            toast.error(message)
          }
      
          if (isSuccess || user) {
            if(String(user._id) !== '6259b5090949950f79bc7a9f'){
              navigate('/truck')
            }
            navigate('/Admin')
          }
      
          dispatch(reset())
        }, [user, isError, isSuccess, message, navigate, dispatch])
  





      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
          email,password,
        }
        dispatch(login(userData))
    }
  
    if(isLoading)
    {
        return <Spinner/>
    }
    const mystyle = {
      color: "black",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    };


  return (
    <div className='home'>
      <Box
          sx={{
            boxShadow: 3,
            width: '50rem',
            height: '28rem',
            justifyContent: 'center',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: 'left',
            fontSize: '2rem',
            fontWeight: '800',
          }}
          > 
          <form onSubmit={onSubmit}>
              <h2 style = {mystyle}>Please Sign In</h2>
              <label htmlFor="email" className="sr-only"> </label>
              <input type="email" 
                     name="email" 
                     onChange={onChange} 
                     className="form-control" 
                     placeholder="Enter Email"/>
                    <p>
                    </p>
              <label htmlFor="password" className="sr-only"> </label>
              <input type="password" 
                     name="password" 
                     onChange={onChange} 
                     className="form-control" 
                     placeholder="Enter Password"/>
                    <p>
                    </p>

              <button variant="contained" className="block" 
                      type="submit">Log In </button>
          </form>
          </Box>
      </div>
  )
}


export default Login