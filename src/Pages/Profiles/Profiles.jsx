import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { Divider, Grid, Typography, Box, TableContainer, Paper, TableHead, TableRow, TableCell, Table, IconButton, Tooltip, TableBody } from '@mui/material';
import AddIcon from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import StarsIcon from '@mui/icons-material/Stars';
import axios from 'axios';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      if(user?.id) {
        try {
          await axios.get(`http://localhost:8080/users/${user.id}/profiles`)
          .then(res => {
            const { data } = res;
            setProfiles(data);
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchProfiles();
  }, [user]);


  return(
    <>
      <Grid container justifyContent='center' width={'100%'} minWidth='1200px' mt={5}>
        <Box width='70%'>
          <TableContainer component={Paper}>
            <Table sx={{backgroundColor: 'elementBackground.main'}}>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    <Box my={1}>
                      <Typography variant='h5'>
                        {user?.name ? `${user.name}'s Profiles` : 'Profiles'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='right'>
                    <Tooltip
                      title='Search'
                    >
                      <IconButton
                        color='primary'
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title='View Master Profile'
                    >
                      <IconButton
                        color='primary'
                      >
                        <StarsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title='Add Profile'
                    >
                      <IconButton
                        color='primary'
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight='bold'>Profile Name</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography fontWeight='bold'>Created</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(profile => (
                  <TableRow 
                    key={profile.id}
                    hover
                    sx={{ cursor: 'pointer' }}  
                  >
                    <TableCell>{profile.name}</TableCell>
                    <TableCell align='right'>n/a</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
        <Grid item xs={12} maxWidth={1000}>
        </Grid>
      </Grid>
    </>
  );
};

export default Profiles;