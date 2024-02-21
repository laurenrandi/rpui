import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider, Stack, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import LinkIcon from '@mui/icons-material/Link';
import ProjectEditor from '../ProjectEditor/ProjectEditor';
// import projectsEditor from '../projectsEditor/projectsEditor';

const ProjectViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEdit = (id) => {
    setSelectedProject(formik.values.projects.find(job => job.id === id));
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    formik.setFieldValue('projects', formik.values.projects.filter(job => job.id !== id));
  };

  const handleDialogSave = (job) => {
    if(job.id) {
      const index = formik.values.projects.findIndex(j => j.id === job.id);
      formik.setFieldValue(`projects[${index}]`, job);
    } else {
      formik.setFieldValue('projects', [ ...formik.values.projects, { ...job, id: `id${Math.random().toString(16)}` } ]);
    }
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  return(
    <>
      <Card
        sx={{ width: '100%', backgroundColor: 'elementBackground.main', height: '100%' }}
      >
        <CardContent>
          <Box mb={1}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>PROJECTS</Typography>
              <IconButton onClick={handleAdd}>
                <AddIcon color='primary' />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          {formik.values?.projects?.length > 0 &&
            formik.values.projects.toSorted((a,b) => dayjs(b.startDate).isAfter(dayjs(a.startDate)) ? 1 : -1).map(project => (
              <Box display='flex' justifyContent='space-between'>
                <Box width='100%'>  
                  <Box display='flex' justifyContent='space-between' mt={0.5}>
                    <Box>
                      <Typography variant='body1'><b>{`${project.name ? project.name : 'Project'}`}</b></Typography>
                      {project?.link &&
                        <Box ml={1}>
                          <IconButton href={project.link} target='_blank'>
                            <LinkIcon color='primary' />
                          </IconButton>
                        </Box>
                      }
                    </Box>
                    {dayjs(project?.startDate).isValid() && <Typography variant='body1'>{`${dayjs(project?.startDate).format('MM/YYYY')} - ${project.endDate ? dayjs(project?.endDate).format('MM/YYYY') : ''}`}</Typography>}
                  </Box>
                  <Box display='flex'>
                    <Typography variant='body1'><i>{project?.type}</i></Typography>
                  </Box>
                  <Box my={1}>
                    <Typography variant='body1' flexWrap='wrap'>{project?.description || ''}</Typography>
                  </Box>
                  {project.technologies?.length > 0 &&
                    <Stack direction='row' columnGap={1} flexWrap='wrap' rowGap={1}>
                      {project.technologies.map(tech => (
                        <Chip label={tech.text} variant='outlined' color='primary' />
                      ))}
                    </Stack>
                  }
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' my={1} ml={1}>
                  <IconButton
                    onClick={() => handleEdit(project.id)}
                  >
                    <EditIcon color='primary' />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(project.id)}
                  >
                    <DeleteIcon color='secondary' />
                  </IconButton>
                </Box>
              </Box>
            ))
          }
        </CardContent>
      </Card>
      {dialogOpen &&
        <ProjectEditor
          project={selectedProject}
          onSave={handleDialogSave}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default ProjectViewer;

