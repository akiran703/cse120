import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { reset } from '../features/coord/coordSlice'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import AnimatedModal from '../components/animated-modal.component';
import {getalltimesplease} from '../features/alltimeAuth/allSlice'
import {getalldriversplease} from '../features/getallDriversAuth/getdriversSlice'


const columns = [
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'appointment_num', headerName: 'Appointment Number', width: 180,},
  { field: 'typeofBound', headerName: 'Bound', width: 180},
];


const Appointment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const{user} = useSelector((state)=>state.auth)

  const { alltimes } = useSelector(
    (state) => state.alltime
  )
  
  const { alldrivers } = useSelector(
    (state) => state.alldriver
  )

  const rows = [];

for (let i = 0; i < alldrivers.length; i++) 
{
  rows.push({id: i,Name :alldrivers[i].fullName, appointment_num:alldrivers[i].apptNo ,typeofBound:alldrivers[i].typeOfTruck}) 
}

  useEffect(() => {
    if(String(user._id) !== 'place new object id of admin here '){
      navigate('/truck')
    }
    dispatch(getalltimesplease())
    dispatch(getalldriversplease())
    return () =>{
    dispatch(reset())
  }
}, [user, navigate,dispatch])
  return (
    <div className='home'>
      <h2>Appointments</h2>
      <Box
        sx={{
          boxShadow: 3,
          width: '55rem',
          height: '32rem',
          justifyContent: 'center',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'left',
          fontSize: '2rem',
          fontWeight: '700',
        }}
      > 
        <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div> 
        </Box>
    </div>
  );
}
  
export default Appointment;
