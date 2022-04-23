import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Coordinates from './pages/Coordinates';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header'
import {ToastContainer} from 'react-toastify'
import Truck from './pages/Truck';




function App() {
  return (
    <>
    <Router>
    <div >
      <Header/>
      <Routes>
        {/* <Route path='/' element={ <Coordinates/>}  /> */}
        <Route path='/login' element={ <Login/>}  />
        <Route path='/register' element={ <Register/>}  />
        <Route exact path="/truck/*" element={<Truck />} />
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
