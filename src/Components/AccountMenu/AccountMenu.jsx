import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import AccountSettings from '../AccountSettings/AccountSettings';
import { useContext  } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { useDarkMode } from '../../Lib/DarkModeContext/DarkModeContext';
import {Switch} from "@mui/material";



export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const openSettings = (event) => {
    setDialogOpen(event.currentTarget);
  } 

  const handleSClose = () => {
    setDialogOpen(null);
  }

  const handleSSave = () => {
    setDialogOpen(null);
  }

  const { darkMode, toggleDarkMode } = useDarkMode();

  const { user } = useContext(UserContext);
  
  const getColor = (str) => {
    if(str) {
      let hash = 0;
      str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
      })
      let color = '#'
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += value.toString(16).padStart(2, '0')
      }
      return color;
    }
    return '';
  };


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 , bgcolor: getColor(user?.name)}}>{user?.name?.charAt(0)}</Avatar> 
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="primary"
            name="darkModeToggle"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
          <p>Toggle Dark Mode</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={openSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Account Settings
        </MenuItem>
      </Menu>

      {dialogOpen &&
        <AccountSettings
          onCancel={handleSClose}
          onSave={handleSSave}
        />
      }
    </React.Fragment>
  );
}