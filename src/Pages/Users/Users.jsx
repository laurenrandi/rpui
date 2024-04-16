import React, { useState, useEffect, useContext } from 'react';
import ServiceUtils from '../../Lib/ServiceUtils';
import axios from 'axios';
import ArrowIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionSummary, Typography, Box, AccordionDetails, List, ListItemButton, Divider, Chip, Avatar, ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../../Lib/LoadingContext/LoadingContext';
import { useSnackbar } from 'notistack';


const Users = () => {
  const [users, setUsers] = useState([]); 
  const { setLoading } = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${ServiceUtils.baseUrl}/users/info`);
        setUsers(data);
      } catch (err) {
        console.error(err);
        enqueueSnackbar('An error occured while fetching user data.', { variant: 'error' })
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [setLoading]);

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
    console.log(color);
    return color;
  };
  
  return(
    <Box margin={5}>
      {users.filter(user => user.name?.length > 0).map(user => (
        <Accordion sx={{ backgroundColor: 'elementBackground.main' }}>
          <AccordionSummary expandIcon={<ArrowIcon />}>
            <Box pr={2}>
              <Avatar sx={{ bgcolor: getColor(user.name)}}>
                {user.name.charAt(0)}
              </Avatar>
            </Box>
            <Typography fontWeight='bold' paddingY={1}>{user?.name}</Typography>
            {user.admin &&
            <Box display='flex' justifyContent='center' alignItems='center' ml={1}>
              <Chip label='Admin' variant='outlined' color='primary' size='small' />
            </Box>
            }
          </AccordionSummary>
          {user?.profiles?.length > 0 &&
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
                {user.profiles.filter(profile => profile.name?.length > 0).map((profile, index) => (
                  <>
                    <ListItemButton onClick={() => { navigate(`/profiles/${profile.id}`) }}>
                      <Typography>
                        {profile.name}
                      </Typography>
                    </ListItemButton>
                    {(index !== (user.profiles.filter(profile => profile.name?.length > 0).length - 1)) && <Divider />}
                  </>
                ))}
              </List>
            </AccordionDetails>
          }
        </Accordion>
      ))}
    </Box>
  );
};

export default Users;