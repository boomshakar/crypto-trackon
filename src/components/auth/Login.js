import React, { useState } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { signInWithEmailAndPassword } from '@firebase/auth';
import Colour from '../../lib/color';
import { notification } from '../../lib/helpers';
import { auth } from '../../firebase';
import styled from 'styled-components';
import { ModalState } from '../../context/ModalContext';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoginLoad, setLocalLoginLoad] = useState(false);

  const { modalHandleClose } = ModalState();
  const handleSubmit = async (e) => {
    setLocalLoginLoad(true);
    if (!email || !password) {
      notification(`Please fill all fields`, 'warn');
      setLocalLoginLoad(false);
      return;
    }
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      notification(`Login successful. Welcome ${result.user.email}`, 'success');
      setLocalLoginLoad(false);
      modalHandleClose();
    } catch (error) {
      notification(`Oops! Something went wrong 😒`, 'error');
      notification(error.message, 'error');
      setLocalLoginLoad(false);
      console.log(error);
    }
  };
  return (
    <>
      <Box p={3} style={{ color: Colour.LightrayWriteBold, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          variant="outlined"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ background: Colour.LightrayWrite }}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          style={{ background: Colour.LightrayWrite }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          style={{ background: 'gold', color: Colour.DarkGrayBG }}
        >
          {localLoginLoad && <CircularProgress size={18} style={{ marginRight: '15px' }} />}Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
