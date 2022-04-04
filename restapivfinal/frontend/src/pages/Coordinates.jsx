import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Coordform from '../components/Coordform'


function Coordinates() {
  const navigate = useNavigate()


  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])



  return (
    <div>
      <Coordform />
    </div>
  )
}

export default Coordinates
