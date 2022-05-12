import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { reset } from '../features/coord/coordSlice'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import AnimatedModal from "../components/animated-modal.component";
import {getalltimesplease} from '../features/alltimeAuth/allSlice'
import {getalldriversplease} from '../features/getallDriversAuth/getdriversSlice'


//Add ETA column from Database
const columns = [
  { field: 'truckername', headerName: 'Name', width: 130 },
  { field: 'appointmentNum', headerName: 'Appointment Number',width: 180},
  { field: 'eta', headerName: 'ETA', width: 180},
];

const columnsoutBound = [
  { field: 'truckername', headerName: 'Name', width: 130 },
  { field: 'appointmentNum', headerName: 'Appointment Number',width: 180},
];


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const{user} = useSelector((state)=>state.auth)

  const { alltimes } = useSelector(
    (state) => state.alltime
  )

  const { alldrivers } = useSelector(
    (state) => state.alldriver
  )

  //verifies that an admin is accessing the dashboard
  useEffect(() => {
    if(String(user._id) !== 'Place the new id here'){
      navigate('/truck')
    }
    
    dispatch(getalltimesplease())
    dispatch(getalldriversplease())

      return () =>{
      dispatch(reset())
      }
    }, [user, navigate,dispatch])

    //console.log(user._id)
    
    const rowsOutbound = [];
    const rowsInbound = [];
    const rows = []
    

    for (let i = 0; i < alldrivers.length; i++) 
    {
      for (let j = 0; j < alltimes.length; j++)
      {
        if(alldrivers[i].user === alltimes[j].user)
        {
          if(alldrivers[i].typeOfTruck === 'Inbound')
          {
            rowsInbound.push({id: i,truckername :alldrivers[i].fullName, appointmentNum:alldrivers[i].apptNo ,eta:alltimes[j].temp1.text}) 

          }

        }
      }
     
    }

    for (let i = 0; i < alldrivers.length; i++) 
    {
          if(alldrivers[i].typeOfTruck === 'Outbound')
          {
            rowsOutbound.push({id: i,truckername :alldrivers[i].fullName, appointmentNum:alldrivers[i].apptNo }) 

          }
    }
    const mystyle = {
      color: "black",
      padding: "10px",
      fontSize: "64px",
      fontFamily: "Arial",
      textAlign: "center"
    };

    const secondstyle ={
      color: "black",
      padding: "10px",
      fontSize: "42px",
      fontFamily: "Arial",
      textAlign: "center"
    };

  
      
  return (
    <div className='home'>
      <header style = {mystyle}>Dashboard</header>
        <header2 style = {secondstyle}>Inbound</header2>
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
        <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rowsInbound}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div> 
                
        </Box>
      
      
      <header2 style = {secondstyle}>Outbound</header2>

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
          fontWeight: '700',
          gridArea: 'header',
        }}
      >

            <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rowsOutbound}
                    columns={columnsoutBound}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div>       
        </Box>
      
    </div>
  );
}


export default Home;
