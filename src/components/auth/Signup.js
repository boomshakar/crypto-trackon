import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import Colour from '../../lib/color';
import { toast } from 'react-toastify';
import { notification } from '../../lib/helpers';
import { auth } from '../../firebase';

const Signup = ({ handleClose }) => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notification(`Password doesn't match`, 'error');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      notification(`Signup successful. Welcome ${result.user.email}`, 'success');
    } catch (error) {
      notification(`Oops! Something went wrong 😒`, 'error');
      // notification(error.message, 'error');
      // console.log(error);
    }
  };
  return (
    <Box p={3} style={{ color: Colour.LightrayWriteBold, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* <TextField
        variant="outlined"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      /> */}
      <TextField
        variant="outlined"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={(e) => handleSubmit(e)}
        style={{ background: 'gold', color: Colour.DarkGrayBG }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
