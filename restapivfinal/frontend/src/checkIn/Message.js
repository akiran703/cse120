import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@mui/material';

// message to show if the user has uploaded a file or not when upload button is clicked
const Message = ({ msg }) => {
    return (
    <Alert variant="standard" color="info" icon={false}>{msg}</Alert>
    );
  };
  
  Message.propTypes = {
    msg: PropTypes.string.isRequired
  };

export default Message
