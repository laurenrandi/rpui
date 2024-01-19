import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TableIcon from '@mui/icons-material/TableView';
import LogoutIcon from '@mui/icons-material/Logout';
import EmployeesIcon from '@mui/icons-material/GroupWork';

const adminLinks = [
  {
    label: 'Home',
    icon: <HomeIcon />
  },
  {
    label: 'My Profile',
    icon: <PersonIcon />
  },
  {
    label: 'Modified Profiles',
    icon: <GroupsIcon />
  },
  {
    label: 'Employee Profiles',
    icon: <EmployeesIcon />
  },
  {
    label: 'Saved Printouts',
    icon: <TableIcon />
  }
];

const userLinks = [
  {
    label: 'Home',
    icon: <HomeIcon />
  },
  {
    label: 'My Profile',
    icon: <PersonIcon />
  },
  {
    label: 'Modified Profiles',
    icon: <GroupsIcon />
  },
  {
    label: 'Saved Printouts',
    icon: <TableIcon />
  }
];

const Nav = (props) => {
  let navlinks = props?.isAdmin === true ? adminLinks : userLinks;

  return(
    <Drawer
      variant='permanent'
    >
      <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{height: '100%'}}>
        <List disablePadding>
          {
            navlinks.map((link, index) => (
              <ListItem key={index} disablePadding disableGutters>
                <ListItemButton>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
        <List disablePadding>
          <ListItem>
            <Box display='flex' justifyContent='center'>

            </Box>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer> 
  );
};

export default Nav;