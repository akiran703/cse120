import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {register,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Box from '@mui/material/Box';
import '../pages/Register.css'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
      })
    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const confirming = () => {
      window.location.assign("http://localhost:3000/login");
  }

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )


    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
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

        if (password !== password2) {
            toast.error('Passwords do not match')
          } else {
            const userData = {
              name,
              email,
              password,
            }
      
            dispatch(register(userData))
          }
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
            height: '34rem',
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
    <section>
        <h1>

        </h1>
        <h3 style = {mystyle}>
            Please Register Your Account
        </h3>
    </section>

    <section>
        <form onSubmit={onSubmit}>
        <div>
        <input
              type='Regname'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
        </div>
        <p>
        </p>
        <div>
        <input
              type='Regemail'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
        </div>
        <p>
        </p>
        <div>
        <input
              type='Regpassword'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
        </div>
        <p>
        </p>
        <div>
        <input
              type='Reenterpassword'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
        </div>
        <p>
        </p>
        <div>
        <button className='block' onClick = {confirming}
                    type='submit'>Register</button>
        </div>

        </form>
    </section>
    </Box>
    </div>
  )
}


export default Register