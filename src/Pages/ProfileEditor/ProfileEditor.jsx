import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import emptyProfile from '../../Lib/emptyProfile.json';
import axios from 'axios';

//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PdfIcon from '@mui/icons-material/CollectionsBookmark';
import EditIcon from '@mui/icons-material/Edit';
import ContactViewer from '../../Components/ContactViewer/ContactViewer';
import SkillsViewer from '../../Components/SkillsViewer/SkillsViewer';

const ProfileEditor = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { profileId } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: emptyProfile,
    enableReinitialize: true
  });
  
  useEffect(() => {
    const fetchProfile = async () => {
      if(profileId === 'master' && user?.id) {
        setLoading(true);
        try {
          await axios.get(`http://localhost:8080/users/${user?.id}/profiles/master`)
          .then(res => {
            const { data } = res;
            formik.setValues(data);
          });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        if(profileId !== 'master' && !loading) {
          setLoading(true);
          try {
            await axios.get(`http://localhost:8080/profiles/${profileId}`)
            .then(res => {
              const { data } = res;
              formik.setValues(data);
            });
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }
      }
    };
    fetchProfile();
  }, [profileId, user]);

  const handleBack = () => {
    navigate('/profiles')
  };

  const handleExport = () => {
    //todo
  };

  const handleSave = () => {

  };

  return(
    <>
      {!loading &&
        <Grid container>
          <Grid item xs={12} marginY={3}>
            <Box display='flex' justifyContent='space-between'>
              <Tooltip title='Back'>
                <IconButton 
                  onClick={handleBack}
                  disabled={loading}
                >
                  <ArrowBackIcon color='primary' />
                </IconButton>
              </Tooltip>
              <Box display='flex'>
                <Typography variant='h5' sx={{marginTop: 0.5, marginRight: 1}}>{profileId !== 'master' ? formik?.values?.name : 'Master Profile'}</Typography>
                <IconButton
                  //add profile name editing
                  disabled={profileId === 'master' || loading}
                >
                  <EditIcon color = 'primary'/>
                </IconButton>
              </Box>
              <Box>
                <Tooltip title='Save Profile'>
                  <IconButton
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <SaveIcon color='primary' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Save to PDFs'>
                  <IconButton
                    onClick={handleExport}
                    disabled={loading}
                  >
                    <PdfIcon color='primary' />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactViewer formik={formik} />
            {/* education section */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* about section */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* work history */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* project history */}
          </Grid>
          <Grid item xs={12}>
            <SkillsViewer formik={formik} />
          </Grid>
        </Grid>
      }
    </>
  );
};

export default ProfileEditor;