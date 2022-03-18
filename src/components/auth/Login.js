import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { signInWithEmailAndPassword } from '@firebase/auth';
import Colour from '../../lib/color';
import { notification } from '../../lib/helpers';
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    if (!email || !password) {
      notification(`Please fill all fields`, 'warn');
      return;
    }
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      notification(`Login successful. Welcome ${result.user.email}`, 'success');
    } catch (error) {
      notification(`Oops! Something went wrong 😒`, 'error');
      notification(error.message, 'error');
      console.log(error);
    }
  };
  return (
    <Box p={3} style={{ color: Colour.LightrayWriteBold, display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ background: 'gold', color: Colour.DarkGrayBG }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
