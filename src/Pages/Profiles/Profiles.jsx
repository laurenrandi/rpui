import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { Grid, Typography, Box, TableContainer, Paper, TableHead, TableRow, TableCell, Table, IconButton, Tooltip, TableBody, CircularProgress, LinearProgress, List, ListSubheader, ListItem, Button, Divider, Chip } from '@mui/material';
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
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import FormikTextField from '../../Components/FormikTextField/FormikTextField';
import ResetIcon from '@mui/icons-material/RestartAlt';
import FilterIcon from '@mui/icons-material/FilterList';

const searchParams = [
  {
    name: 'name',
    label: 'Profile Name'
  },
  {
    name: 'bio',
    label: 'Bio'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'phone',
    label: 'Phone Number'
  },
  {
    name: 'headline',
    label: 'Headline'
  },
  {
    name: 'company',
    label: 'Company'
  },
  {
    name: 'school',
    label: 'School'
  },
  {
    name: 'project',
    label: 'Project Name'
  },
  {
    name: 'skill',
    label: 'Skill'
  }
];

const initialValues = {
  name: null,
  bio: null,
  email: null,
  phone: null,
  headline: null,
  company: null,
  school: null,
  project: null,
  skill: null
}

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [ profileLoading, setProfileLoading ] = useState(false);
  const [ tableLoading, setTableLoading ] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [ searchOpen, setSearchOpen ] = useState(false);
  const [ activeFilters, setActiveFilters ] = useState([]);
  const [ selectDisabledIndex, setSelectDisabledIndex ] = useState(-1);
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  });

  const fetchProfiles = async (variant, params) => {
    if(user?.id) {
      if(variant === 'initial') {
        setLoading(true);
      } else {
        setTableLoading(true);
      }
      try {
        await axios.get(`${ServiceUtils.baseUrl}/users/${user.id}/profiles`, { params })
        .then(res => {
          const { data } = res;
          setProfiles(data);
        });
      } catch (err) {
        console.error(err);
      } finally {
        if(variant === 'initial') {
          setLoading(false);
        } else {
          setTableLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    fetchProfiles('initial', null);
  //only need to do this on mount, can't add it to the dep array or it infinite rerenders
  //and we need to declare it outside so we can refresh table on filter/delete
  //eslint-disable-next-line
  }, []);

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
      enqueueSnackbar(`Profile successfully deleted.`, { variant: 'success' });
      setDeleteDialogOpen(false);
      fetchProfiles();
    }
    catch (err) {
      console.error(err);
      enqueueSnackbar(`An error occurred while deleting the profile.`, { variant: 'error' });
    }
  }

  const handleSearchReset = () => {
    formik.setValues(initialValues);
    setActiveFilters([]);
    fetchProfiles(null, null);
  };

  const handleApplyFilters = () => {
    fetchProfiles(null, formik.values);
    setActiveFilters(Object.keys(formik.values).filter(key => formik.values[key]).map(key => ({
        name: key,
        label: searchParams.find(param => param.name === key).label,
        value: formik.values[key]
    })));
  };

  const handleChipDelete = (filter) => {
    formik.setFieldValue(filter.name, null);
    setActiveFilters(activeFilters.filter(param => param.name !== filter.name));
    fetchProfiles(null, filtersToParams(formik.values));
  };

  const filtersToParams = (array) => {
    let obj = {};
    for(let i = 0; i < array.length; ++i) {
      obj[array[i].name] = array[i].value
    };
    return obj;
  };

  return(
    <>
    {!loading &&
      <Grid container justifyContent='center' width={'100%'} mt={5} columnSpacing={2} mb={5}>
        {activeFilters.length > 0 &&
          <Box display='flex' overflow='auto' justifyContent='left' alignItems='center' mb={1} px={2} width='100%'>
            <Box display='flex' alignItems='center' p={1}>
              <Box mr={1}>
                <FilterIcon color='primary'/>
              </Box>
              <Typography sx={{ color: 'disabled' }}>Filters:</Typography>
            </Box>
            {activeFilters.map(filter => (
              <Chip 
                variant='outlined' 
                color='primary' 
                label={`${filter.label}: ${filter.value}`}
                onDelete={() => handleChipDelete(filter)}
                sx={{ marginX: 0.5 }}
              />
            ))}
          </Box>
        }
        <Grid item xs={searchOpen ? 10 : 12}>
          <TableContainer component={Paper}>
            {tableLoading && <LinearProgress color='primary' />} 
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
                    {!searchOpen &&
                      <Tooltip
                        title='Search'
                      >
                        <IconButton
                          onClick={() => setSearchOpen(true)}
                          color='primary'
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    }
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
                  <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                    Created
                    <IconButton disabled sx={{ marginLeft: 2 }}>
                      <DeleteIcon sx={{ color: 'elementBackground.main' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/profiles/master`)}
                >
                  <TableCell sx={{ fontWeight: 'bold' }}>Master Profile</TableCell>
                  <TableCell align='right'>
                    <StarsIcon color='golden' sx={{ marginRight: 1 }}/>
                  </TableCell>
                </TableRow>
                {profiles.map((profile, index) => (
                  <TableRow 
                    key={profile.id}
                    hover={selectDisabledIndex !== index}
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
                        onMouseEnter={() => setSelectDisabledIndex(index)}
                        onMouseLeave={() => setSelectDisabledIndex(-1)}
                        sx={{ marginLeft: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {searchOpen &&
          <Grid item xs={2}>
            <List 
              sx={{
                backgroundColor: 'elementBackground.main',
                borderRadius: 1
              }}
            >
              <Box display='flex' justifyContent='space-between' alignItems='center' mx={1} mb={1}>
                <ListSubheader 
                  sx={{backgroundColor: 'elementBackground.main'}} 
                  align='center'
                >
                  Search Filters
                </ListSubheader>
                <Box>
                  <Tooltip title='Reset Filters'>
                    <IconButton onClick={handleSearchReset}>
                      <ResetIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Close'>
                    <IconButton onClick={() => setSearchOpen(false)}>
                      <CloseIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Divider />
              {searchParams.map(param => (
                <ListItem sx={{ marginY: 1 }}>
                  <FormikTextField 
                    formik={formik}
                    name={param.name}
                    label={param.label}
                    InputLabelProps={{ shrink: true }}
                  />
                </ListItem>
              ))}
              <Box mb={1}>
                <Divider />
              </Box>
              <ListItem>
                  <Button 
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </Button>
              </ListItem>
            </List>
          </Grid>
        }
      </Grid>
    }
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