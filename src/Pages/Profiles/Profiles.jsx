import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { Grid, Typography, Box, TableContainer, Paper, TableHead, TableRow, TableCell, Table, IconButton, Tooltip, TableBody, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import StarsIcon from '@mui/icons-material/Stars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      if(user?.id) {
        setLoading(true);
        try {
          await axios.get(`http://localhost:8080/users/${user.id}/profiles`)
          .then(res => {
            const { data } = res;
            setProfiles(data);
          });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProfiles();
  }, [user]);


  return(
    <>
      <Grid container justifyContent='center' width={'100%'} mt={5}>
        <Box width='70%' sx={{ userSelect: 'none' }}>
          {loading && 
            <LinearProgress
              color='primary'
            />
          }
          <TableContainer component={Paper}>
            <Table sx={{backgroundColor: 'elementBackground.main', userSelect: 'none'}}>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    <Box my={1}>
                      <Typography variant='h5' sx={{ userSelect: 'none' }}>
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
                        onClick={() => navigate('/profiles/master')}
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
                    <Typography fontWeight='bold' sx={{ userSelect: 'none' }}>Profile Name</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography fontWeight='bold' sx={{ userSelect: 'none' }}>Created</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(profile => (
                  <TableRow 
                    key={profile.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/profiles/${profile.id}`)}
                  >
                    <TableCell sx={{ userSelect: 'none' }}>{profile.name}</TableCell>
                    <TableCell align='right' sx={{ userSelect: 'none' }}>n/a</TableCell>
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