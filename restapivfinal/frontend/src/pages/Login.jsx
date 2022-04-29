import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {login,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import '../pages/Login.css'

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
        const userData = {
          email,password,
        }
        dispatch(login(userData))
    }
  
    if(isLoading)
    {
        return <Spinner/>
    }



  return (
    <div>
          <form onSubmit={onSubmit}>
              <h3>Please Sign In</h3>
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
      </div>
  )
}


export default Login