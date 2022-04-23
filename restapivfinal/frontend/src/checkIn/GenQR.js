import React, {useEffect, useState} from 'react';
import QRCode from "react-qr-code";
import {Grid} from "@material-ui/core";

// shows QR code that directs to /truck/details URL
function QR() {
    const [src, setSrc] = useState('');
    const text = "http://localhost:3000/truck/details";
    
  return (
    <div style={{
      justifyContent:  'center',
      alignItems:'center',
      textAlign: 'center'
    }} >
         <div>
          
           <h1>Please show QR Code Upon Arriving</h1>
          <QRCode value={text}/>
          
          
         </div>
      </div>
  )
}

export default QR