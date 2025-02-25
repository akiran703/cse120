import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {register,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
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

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
    const confirming = () => {
        window.location.assign("http://localhost:3000/truck");
    }

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/truck')
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

  return (
    <>
    <section>
        <h1>

        </h1>
        <h3>
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
    </>
  )
}


export default Register