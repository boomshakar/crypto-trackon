import React, { useEffect, useState } from 'react';
import { Button, Backdrop, Box, Modal, Fade, Typography, Tab } from '@mui/material';
import Colour from '../../lib/color';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Chip, CircularProgress } from '@material-ui/core';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import TextContent from '../textContent';
import { auth } from '../../firebase';
import { notification } from '../../lib/helpers';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { ModalState } from '../../context/ModalContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'transparent',
  // border: '2px solid #000',
  background: 'rgba(40, 40, 40, 0.05)',
  boxShadow: '0px  6px 10px rgba(70, 70, 50, 0.5)',
  backdropFilter: 'blur(8px)',
  // -webkitBackdrop-filter: 'blur(5px)',
  border: '1px solid rgba(40, 40, 40, 0.27)',
  borderRadius: '15px',
  // boxShadow: 24,
  color: Colour.DarkGrayWrite,
  p: 1,
  typography: 'body1',
};

export default function AuthModalComp() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState('1');
  const [googleLoginLoad, setGoogleLoginLoad] = useState(false);

  const { modalOpen, modalHandleClose, modalHandleOpen } = ModalState();
  // useEffect(() => {
  //   modalHandleOpen && setOpen(true);
  // }, [modalHandleOpen]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const googleAuthProvider = new GoogleAuthProvider();
  const handleGoogleSubmit = async (e) => {
    setGoogleLoginLoad(true);
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        console.log(res);
        notification(`SignIn Successfull. Welcome ${res.user.name}`, 'success');
        modalHandleClose();
      })
      .catch((err) => {
        notification(`Oops! Something went wrong 😒`, 'error');
        notification(err.message, 'error');
        return;
      })
      .finally((e) => {
        console.log(e);
        setGoogleLoginLoad(false);
      });
  };
  return (
    <div>
      {/* <Chip
        label="Login"
        style={{
          marginLeft: 15,
          color: 'gold',
          borderColor: 'gold',
        }}
        variant="outlined"
        onClick={handleOpen}
        clickable
      /> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={modalHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="fullWidth">
                  <Tab label="Login" value="1" />
                  <Tab label="Sign Up" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Login handleClose={modalHandleClose} googleAuthProvider={googleAuthProvider} />
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div>-OR-</div>
                  <Button size="large" onClick={handleGoogleSubmit} variant="outlined">
                    {googleLoginLoad ? (
                      <CircularProgress size={18} style={{ marginRight: '15px' }} />
                    ) : (
                      <img
                        alt="google_signin"
                        src="data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z' fill='%234285F4'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z' fill='%2334A853'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.96409 10.71C3.78409 10.17 3.68182 9.59319 3.68182 9.00001C3.68182 8.40683 3.78409 7.83001 3.96409 7.29001V4.95819H0.957273C0.347727 6.17319 0 7.54774 0 9.00001C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z' fill='%23FBBC05'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z' fill='%23EA4335'/%3e%3c/svg%3e "
                        style={{ marginRight: '15px' }}
                      />
                    )}
                    <TextContent fontSize={13}>Sign in with Google</TextContent>
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Signup handleClose={modalHandleClose} googleAuthProvider={googleAuthProvider} />
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div>-OR-</div>
                  <Button size="large" onClick={handleGoogleSubmit} variant="outlined">
                    {googleLoginLoad ? (
                      <CircularProgress size={18} style={{ marginRight: '15px' }} />
                    ) : (
                      <img
                        alt="google_signin"
                        src="data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z' fill='%234285F4'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z' fill='%2334A853'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.96409 10.71C3.78409 10.17 3.68182 9.59319 3.68182 9.00001C3.68182 8.40683 3.78409 7.83001 3.96409 7.29001V4.95819H0.957273C0.347727 6.17319 0 7.54774 0 9.00001C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z' fill='%23FBBC05'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z' fill='%23EA4335'/%3e%3c/svg%3e "
                        style={{ marginRight: '15px' }}
                      />
                    )}
                    <TextContent fontSize={13}>Sign in with Google</TextContent>
                  </Button>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
