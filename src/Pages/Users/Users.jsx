import React, { useState, useEffect, useContext } from 'react';
import ServiceUtils from '../../Lib/ServiceUtils';
import axios from 'axios';
import ArrowIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionSummary, Button, Typography, Box, AccordionDetails, List, ListItemButton, Divider, Chip, Avatar, ListSubheader, Grid, Tooltip, IconButton, Card, Paper, ButtonGroup, ListItem, LinearProgress, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../../Lib/LoadingContext/LoadingContext';
import { useSnackbar } from 'notistack';
import SearchIcon from '@mui/icons-material/Search';
import ResetIcon from '@mui/icons-material/RestartAlt';
import ClearFilterIcon from '@mui/icons-material/FilterListOff';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import FormikTextField from '../../Components/FormikTextField/FormikTextField';
import FilterIcon from '@mui/icons-material/FilterList';
import Tour from '../../Components/Tour/Tour';
import StarsIcon from '@mui/icons-material/Stars';

const userSearchParams = [
  {
    name: 'admin',
    label: 'Admin',
    variant: 'bool',
    options: [
      {
        label: 'Any',
        value: null
      },
      {
        label: 'Admin',
        value: true
      },
      {
        label: 'User',
        value: false
      }
    ]
  },
  {
    name: 'enabled',
    label: 'Enabled',
    variant: 'bool',
    options: [
      {
        label: 'Any',
        value: null
      },
      {
        label: 'Enabled',
        value: true
      },
      {
        label: 'Disabled',
        value: false
      }
    ]
  },
  {
    name: 'userName',
    label: 'Name',
    variant: 'string'
  },
  {
    name: 'userEmail',
    label: 'Email',
    variant: 'string'
  }
];

const profileSearchParams = [
  {
    name: 'profileName',
    label: 'Name'
  },
  {
    name: 'technology',
    label: 'Technology'
  },
  {
    name: 'bio',
    label: 'Bio'
  },
  {
    name: 'profileEmail',
    label: 'Email'
  },
  {
    name: 'phone',
    label: 'Phone'
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
    label: 'Project'
  },
  {
    name: 'skill',
    label: 'Skill'
  }
]

//used to delay profile load for animation to finish
//==> makes animation smoother lol
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//Map user search params to profile params
const mapParams = (inputParams) => {
  return ({
    name: inputParams.profileName,
    bio: inputParams.bio,
    technology: inputParams.technology,
    email: inputParams.profileEmail,
    phone: inputParams.phone,
    headline: inputParams.headline,
    company: inputParams.company,
    school: inputParams.school,
    project: inputParams.project,
    skill: inputParams.skill
  });
};

const initialValues = {
  admin: null,
  enabled: null,
  userName: null,
  userEmail: null,
  profileName: null,
  bio: null,
  profileEmail: null,
  phone: null,
  headline: null,
  company: null,
  school: null,
  project: null,
  skill: null,
  technology: null
};

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [profilesLoading, setProfileLoading] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validateOnChange: false
  });

  const fetchUsers = async (initial, params) => {
    if(initial) {
      setLoading(true);
    } else {
      setSearchLoading(true);
    }
    try {
      let resp = [];
      if(initial) {
        const { data } = await axios.get(`${ServiceUtils.baseUrl}/users/info`);
        resp = data;
      } else {
        const { data } = await axios.get(`${ServiceUtils.baseUrl}/users/info`, { params });
        resp = data;
      }
      setUsers(resp);
    } catch (err) {
      console.error(err);
      enqueueSnackbar('An error occured while fetching user data.', { variant: 'error' })
    } finally {
      if(initial) {
        setLoading(false);
      } else {
        setSearchLoading(false);
      }
    }
  };

  useEffect(() => {
    setProfiles([]);
    if(selectedUserId) {
      const fetchProfiles = async () => {
        setProfileLoading(true);
        try {
          const params = mapParams(formik.values);
          await sleep(750);
          const { data } = await axios.get(`${ServiceUtils.baseUrl}/users/${selectedUserId}/profiles`, { params })
          setProfiles(data);
        } catch (err) {
          console.error(err);
          enqueueSnackbar('An error occured while fetching profiles.', { variant: 'error' });
        } finally {
          setProfileLoading(false);
        }
      }
      fetchProfiles();
    }
  }, [selectedUserId]);
  
  useEffect(() => {
    fetchUsers(true, null);
  }, [setLoading, enqueueSnackbar]);

  const getColor = (str) => {
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
  };

  const handleApplyFilters = (params) => {
    setSelectedUserId('');
    fetchUsers(false, params);
    setActiveFilters(Object.keys(params).filter(key => params[key] !== null && params[key] !== '').map(key => ({
      name: key,
      value: params[key],
      label: userSearchParams.find(param => param.name === key) ? userSearchParams.find(param => param.name === key).label : profileSearchParams.find(param => param.name === key)?.label,
    })));
  };

  const handleSearchReset = () => {
    setSelectedUserId('');
    formik.setValues(initialValues);
    setActiveFilters([]);
    fetchUsers(false, null);
  };
  
  return(
    <>
    {!loading &&
      <>
        <Grid container mt={5} columnSpacing={2}>
          {activeFilters.length > 0 &&
            <Box display='flex' overflow='auto' justifyContent='left' alignItems='center' mb={1} px={2} width='100%'>
              <Box display='flex' alignItems='center' p={1}>
                <Box mr={1}>
                  <FilterIcon color = 'primary' />
                </Box>
                <Typography sx={{ color: 'disabled' }}>Filters:</Typography>
              </Box>
              {activeFilters.map(filter => (
                <Chip 
                  variant='outlined'
                  color='primary'
                  label={`${filter.label}: ${filter.value}`}
                  sx={{ marginX: 0.5 }}
                />
              ))}
            </Box>
          }
          <Grid item xs={searchOpen ? 9 : 12}>
            {searchLoading && <LinearProgress color='primary' />}
            <Card sx={{ bgcolor: 'elementBackground.main' }} tour-id="header">
              <Grid container>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Typography align='center' variant='h5' my={2}>Users</Typography>
                </Grid>
                <Grid item xs={4} display='flex' justifyContent='right' alignItems='center' pr={1}>
                  {(activeFilters?.length > 0 && !searchOpen) &&
                    <Tooltip title='Clear Filters'>
                      <IconButton 
                        onClick={handleSearchReset}
                      >
                        <ClearFilterIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                  }
                  {!searchOpen &&
                    <Tooltip title='Search'>
                      <IconButton onClick={() => setSearchOpen(true)} tour-id='search'>
                        <SearchIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                  }
                </Grid>
              </Grid>
            </Card>
            {users.filter(user => user.name?.length > 0).map(user => (
              <Accordion 
                sx={{ backgroundColor: 'elementBackground.main' }} 
                key={user.id} expanded={selectedUserId === user.id} 
                onChange={() => {
                  setSelectedUserId(selectedUserId === user.id ? '' : user.id)
                }}
                
              >
                <AccordionSummary expandIcon={<ArrowIcon />}>
                  <Box pr={2}>
                    <Avatar sx={{ bgcolor: getColor(user.name)}}>
                      {user.name.charAt(0)}
                    </Avatar>
                  </Box>
                  <Typography fontWeight='bold' paddingY={1}>{user?.name}</Typography>
                  <Stack direction='row' ml={1} alignItems='center' columnGap={1}>
                    {user.admin && <Chip label='Admin' variant='outlined' color='primary' size='small' />}
                    {user.enabled && <Chip label='Enabled' variant='outlined' color='success' size='small' />}
                    {!user.enabled && <Chip label='Disabled' variant='outlined' color='secondary' size='small' />}
                  </Stack>
                </AccordionSummary>
                {profilesLoading &&
                  <Box display='flex' justifyContent='center' margin={5}>
                    <CircularProgress color='primary' />
                  </Box>
                }
                {profiles?.length > 0 &&
                  <AccordionDetails>
                    <List
                      subheader={
                        <>
                          <ListSubheader sx={{ backgroundColor: 'elementBackground.main', fontSize: '12pt', fontWeight: 'bold' }}>
                            Profiles
                          </ListSubheader>
                          <Divider />
                        </>
                      }
                    >
                      <>
                        {profiles?.filter(profile => profile.name?.length > 0).sort((a, b) => (a.masterProfile === b.masterProfile) ? 0 : a.masterProfile ? -1 : 1).map((profile, index) => (
                          <>
                            <ListItemButton onClick={() => { navigate(`/profiles/${profile.id}`) }}>
                              <Box display='flex' justifyContent='center' alignItems='center'>
                                <Typography>
                                  {profile.name}
                                </Typography>
                                {profile.masterProfile && <StarsIcon color='golden' sx={{ marginLeft: 1 }}/>}
                              </Box>
                            </ListItemButton>
                            {(index !== (profiles?.filter(profile => profile.name?.length > 0).length - 1)) && <Divider />}
                          </>
                        ))}
                      </>
                    </List>
                  </AccordionDetails>
                }
              </Accordion>
            ))}
          </Grid>
          {searchOpen &&
            <Grid item xs={3}>
              <List
                sx={{
                  backgroundColor: 'elementBackground.main'
                }}
                component={Paper}
              >
                <Box display='flex' justifyContent='space-between' alignItems='center' mx={1} mb={1}>
                  <ListSubheader
                    sx={{ backgroundColor: 'elementBackground.main' }}
                    align='center'
                  >
                    Search
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
                <ListItem>
                  <ListSubheader sx={{backgroundColor: 'elementBackground.main', marginRight: 2}}>User Search</ListSubheader>
                </ListItem>
                {userSearchParams.map(param => (
                  <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    {param.variant === 'bool' &&
                      <Box display='flex' justifyContent='center' width='100%'>
                        <ButtonGroup variant='outlined' fullWidth>
                          {param.options.map(option => (
                            <Button 
                              color='primary' 
                              variant={formik.values[param.name] === option.value ? 'contained' : 'outlined'}
                              onClick={() => formik.setFieldValue(param.name, option.value)}
                            >
                              {option.label}
                            </Button>
                          ))}
                        </ButtonGroup>
                        <Tooltip title='Clear Filter' placement='right'>
                          <IconButton
                            sx={{ marginLeft: 1 }}
                            disabled={formik.values[param.name] === null}
                            onClick={() => {
                              formik.setFieldValue(param.name, null)
                              if(activeFilters.find(filter => filter.name === param.name)) {
                                handleApplyFilters({ ...formik.values, [param.name]: null })
                              }
                            }}
                          >
                            <ClearFilterIcon color={ formik.values[param.name] !== null ? 'secondary' : 'disabled' } />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                    {param.variant === 'string' &&
                      <Box display='flex' justifyContent='center' width='100%'>
                        <FormikTextField 
                          name={param.name}
                          label={param.label}
                          formik={formik}
                          InputLabelProps={{ shrink: true }}
                        />
                        <Tooltip title='Clear Filter' placement='right'>
                          <IconButton
                            sx={{ marginLeft: 1 }}
                            disabled={!formik.values[param.name]}
                            onClick={() => {
                              formik.setFieldValue(param.name, null)
                              if(activeFilters.find(filter => filter.name === param.name)) {
                                handleApplyFilters({ ...formik.values, [param.name]: null })
                              }
                            }}
                          >
                            <ClearFilterIcon color={ formik.values[param.name] ? 'secondary' : 'disabled' } />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  </ListItem>
                ))}
                <ListItem>
                  <ListSubheader sx={{backgroundColor: 'elementBackground.main', marginRight: 2}}>Profile Search</ListSubheader>
                </ListItem>
                {profileSearchParams.map(param => (
                  <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box display='flex' justifyContent='center' width='100%'>
                      <FormikTextField 
                        name={param.name}
                        label={param.label}
                        formik={formik}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Tooltip title='Clear Filter' placement='right'>
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          disabled={!formik.values[param.name]}
                          onClick={() => {
                            formik.setFieldValue(param.name, null)
                            if(activeFilters.find(filter => filter.name === param.name)) {
                              handleApplyFilters({ ...formik.values, [param.name]: null })
                            }
                          }}
                        >
                          <ClearFilterIcon color={ formik.values[param.name] ? 'secondary' : 'disabled' } />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
                <Box my={1}>
                  <Divider />
                </Box>
                <ListItem>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={() => handleApplyFilters(formik.values)}
                  >
                    Apply Filters
                  </Button>
                </ListItem>
              </List>
            </Grid>
          }
        </Grid>
        <Tour onStart={() => setSearchOpen(false)} variant='users' />
      </>
      }
    </>
  );
};

export default Users;