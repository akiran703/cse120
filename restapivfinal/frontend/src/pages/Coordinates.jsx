import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Coordform from '../components/Coordform'
import { reset } from '../features/coord/coordSlice'
import { getTime } from '../features/Timeauth/timeSlice'




function Coordinates() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector((state) => state.auth)
  const { time, isLoading, isError, message } = useSelector(
    (state) => state.time
  )


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getTime())
    return () =>{
      dispatch(reset())
    }
  }, [user, navigate,isError,message,dispatch])

  

  return (
    <div>
      <Coordform const value ={time.length}/>
    </div>
  )
}

export default Coordinates
