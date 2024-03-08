import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { Grid, Typography, Box, TableContainer, Paper, TableHead, TableRow, TableCell, Table, IconButton, Tooltip, TableBody, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import StarsIcon from '@mui/icons-material/Stars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ServiceUtils from '../../Lib/ServiceUtils';
import dayjs from 'dayjs';
import ProfileDeleteDialog from '../Profiles/ProfileDeleteDialog';
import LoadingContext from '../../Lib/LoadingContext/LoadingContext';

const Profiles = ( formik ) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [ profileLoading, setProfileLoading ] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      if(user?.id) {
        setLoading(true);
        try {
          await axios.get(`${ServiceUtils.baseUrl}/users/${user.id}/profiles`)
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
  }, [user, setLoading]);

  const handleAddProfile = async () => {
    setProfileLoading(true);
    try {
      await axios.post(`${ServiceUtils.baseUrl}/users/${user.id}/profiles/master/clone`)
      .then(res => {
        const { data } = res;
        navigate(`/profiles/${data}`);
      })
    } catch (err) {
      console.error(err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleDialogCancel = () => {
    setDeleteDialogOpen(false);
  }

  const handleDialogDelete = async (profileId) => {
    try {
      await axios.delete(`${ServiceUtils.baseUrl}/profiles/${profileId}`);
    }
    catch (err) {
      console.error(err);
    }
  }

  return(
    <>
      <Grid container justifyContent='center' width={'100%'} mt={5}>
        <Box width='90%'>
          <TableContainer component={Paper}>
            <Table sx={{backgroundColor: 'elementBackground.main'}}>
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
                    {!profileLoading ?
                      <Tooltip
                        title='Add Profile'
                      >
                        <IconButton
                          onClick={handleAddProfile}
                          color='primary'
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    :
                    <IconButton disabled>
                      <CircularProgress color='primary' size={20}/>
                    </IconButton>
                    }
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
                <TableRow
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/profiles/master`)}
                >
                  <TableCell fontWeight='bold'>Master Profile</TableCell>
                  <TableCell align='right'>
                    {dayjs(formik?.values?.createdDate).isValid() ? dayjs(formik?.values?.createdDate).format('MM/DD/YYYY') : 'N/A'}
                    <IconButton
                      color='golden'
                    >
                      <StarsIcon />
                    </IconButton>
                    <IconButton
                      color='primary'
                    >
                      <DeleteIcon color='secondary'/>
                    </IconButton>
                  </TableCell>
                </TableRow>
                {profiles.map(profile => (
                  <TableRow 
                    key={profile.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/profiles/${profile.id}`)}
                  >
                    <TableCell>{profile.name}</TableCell>
                    <TableCell align='right'>
                      {dayjs(profile.createdDate).isValid() ? dayjs(profile.createdDate).format('MM/DD/YYYY') : 'N/A'}
                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedProfileId(profile.id);
                          setDeleteDialogOpen(true);
                        }}
                        color='secondary'
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Grid item xs={12} maxWidth={1000}>
        </Grid>
      </Grid>
      {deleteDialogOpen &&
        <ProfileDeleteDialog
          profileId={selectedProfileId}
          onDelete={handleDialogDelete}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default Profiles;