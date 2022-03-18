import React from 'react';
import { Button, Backdrop, Box, Modal, Fade, Typography, Tab } from '@mui/material';
import Colour from '../../lib/color';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Login from './Login';
import Signup from './Signup';
import { Chip } from '@material-ui/core';

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

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Chip
        label="Login"
        style={{
          marginLeft: 15,
          color: 'gold',
          borderColor: 'gold',
        }}
        variant="outlined"
        onClick={handleOpen}
        clickable
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="fullWidth">
                  <Tab label="Login" value="1" />
                  <Tab label="Sign Up" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Login handleClose={handleClose} />
              </TabPanel>
              <TabPanel value="2">
                <Signup handleClose={handleClose} />
              </TabPanel>
            </TabContext>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
