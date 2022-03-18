import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';
import { Avatar, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import styled from 'styled-components';
import Colour from '../../lib/color';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';
import { notification } from '../../lib/helpers';

const AvatarContain = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
  },
}));

const UserProfile = () => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);
  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };

  const classes = useStyles();

  const logout = () => {
    signOut(auth);
    setOpenedPopover(false);
    notification('Logout Successful', 'success');
  };
  return (
    <>
      <AvatarContain
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        <Chip
          avatar={<Avatar style={{ color: 'green' }} src="/broken-image.jpg" />}
          label="Avatar"
          sx={{ color: 'red', borderColor: 'gold' }}
          variant="outlined"
          clickable
        />
      </AvatarContain>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 300,
            color: Colour.DarkGrayBG,
            // bgcolor: Colour.DarkGrayBG,
            // color: Colour.LightrayWriteBold,
            // borderColor: 'green',
          }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItem button divider sx={{ height: '25px' }} onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default UserProfile;
