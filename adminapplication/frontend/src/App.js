import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header'
import {ToastContainer} from 'react-toastify'
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import AllDrivers from './admin/AllDrivers';
import AllPO from './admin/AllPO';
import AllBOL from './admin/AllBOL';


function App() {
  return (
    <>
    <Router>
    <div >
      <Header/>
      <Navbar>
      <Route exact path = "/admin" element = {<Home />} />
      <Route exact path = "/app" element = {<Appointment />} />
      <Route exact path = "/detail" element = {<AllDrivers/>} />
      </Navbar>
      <Routes>
        <Route path='/login' element={ <Login/>}  />
        <Route path='/register' element={ <Register/>}  />
        <Route exact path = "/admin" element = {<Home />} />
        <Route exact path = "/truck/all/po" element = {<AllPO />} />
        <Route exact path = "/truck/all/bol" element = {<AllBOL />} />
        <Route path = "/detail" element = {<AllDrivers/>} />
        <Route path = "/app" element = {<Appointment />} />
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;