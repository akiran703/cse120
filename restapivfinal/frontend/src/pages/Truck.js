import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailsForm from '../checkIn/DetailsForm';
import ListPO from '../checkIn/ListPO';
import FileUpload from '../checkIn/FileUpload';
import Coordinates from './Coordinates';
import DriverDetails from '../checkIn/DriverDetails'
import UploadItem from '../checkIn/UploadItem';
import ListItem from '../checkIn/ListItem';
import GenQR from '../checkIn/GenQR';
import Outbound from '../checkIn/Outbound';

function Truck() {
  return (
    <>
     <Routes>
          <Route exact path="/" element={<DetailsForm />} />
          <Route exact path="/po" element={<ListPO />} />
          <Route exact path="/coord" element={<Coordinates />} />
          <Route exact path="/bol" element={<FileUpload />} />
          <Route exact path="/details" element={<DriverDetails />} />
          <Route exact path="/details/image" element={<UploadItem />} />
          <Route exact path="/details/listOfPO" element={<ListItem />} />
          <Route exact path="/genQR" element={<GenQR />} />
          <Route exact path="/outbound" element={<Outbound />} />
        </Routes>
 

    </>
  );
}

export default Truck;