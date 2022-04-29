import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout,reset} from '../features/auth/authSlice'
import '../components/Header.css'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth) 

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  return (
   <header>
       <nav class="navbar">
      <h1> US Cold Storage </h1>
         {user ? (
             <button className='LogoutNav' onClick={onLogout}>
                 Logout
             </button>
         ) : (
           <>
           <div class="flex-parent jc-center">
            <Link to="/login">
               <button className="LoginNav">
                   Login
               </button> 
             </Link>
               <Link to='/register'>
                 <button className = "RegisterNav">
                   Register
                 </button>
               </Link>
             </div>
          </>
        )}
      </nav>
   </header>
  )
}

export default Header