import React, { useState } from 'react';
import { Edit, Add, Delete } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton, Menu, Tooltip } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ArcElement, Tooltip as ttip , Legend, Chart, Colors, CategoryScale, LinearScale, BarElement } from 'chart.js';
import SkillsEditor from '../SkillsEditor/SkillsEditor';

Chart.register(ArcElement, ttip, Legend, Colors, CategoryScale, LinearScale, BarElement);

const SkillsViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMenuAnchor, setEditMenuAnchor] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const formatProficiencyData = (skills) => {
    if(skills) {
      const groupedData = Object.groupBy(formik.values?.skills, ({ type }) => type);
      const sets = [];
      for(let i = 0; i < Object.keys(groupedData).length; i++) {
        const currentSet = groupedData[Object.keys(groupedData)[i]];
        sets[i] = {
          title: Object.keys(groupedData)[i],
          menuList: currentSet.map(skill => ({ id: skill.id, name: skill.name })),
          chartData: {
            labels: currentSet.map(skill => skill.name),
            datasets: [{
              data: currentSet.map(skill => skill.proficiency),
              label: 'Proficiency',
              hoverOffset: 4,
              borderWidth: 1
            }]
          }
        }
      };
      return sets;
    }
    return null;
  };

  const formatExperienceData = (skills) => {
    if(skills) {
      const groupedData = Object.groupBy(skills, ({ type }) => type);
      return({
        labels: Object.keys(groupedData),
        datasets: [{
          label: 'Months of Experience',
          data: Object.keys(groupedData).map(type => (
            groupedData[type].map(skill => skill.months).reduce((sum, val) => sum + val, 0)
          )),
          hoverOffset: 4,
          borderWidth: 1
        }]
      })
    }
    return null;
  }

  const handleEditMenuClick = (event, menuList) => {
    setEditMenuAnchor(event.currentTarget);
    setMenuList(menuList);
  };

  const handleEditMenuClose = () => {
    setEditMenuAnchor(null);
  }

  const handleEdit = (id) => {
    setSelectedSkill(formik.values.skills.find(skill => skill.id === id));
    setDialogOpen(true);
    handleEditMenuClose();
  };

  const handleDialogSave = (skill) => {
    if(!skill.proficiency) {
      skill.proficiency = 1
    }
    if(skill.id) {
      const index = formik.values.skills.findIndex(s => s.id === skill.id);
      formik.setFieldValue(`skills[${index}]`, skill);
    } else {
      formik.setFieldValue('skills', [...formik.values?.skills, { ...skill, id: `id${Math.random().toString(16)}` }]);
    }
    setDialogOpen(false);
    setSelectedSkill(null);
  };

  const handleDelete = (id) => {
    formik.setFieldValue('skills', formik.values.skills.filter(skill => skill.id !== id ))
    setMenuList(menuList.filter(skill => skill.id !== id));
    if(menuList?.length === 0) {
      handleEditMenuClose();
    }
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setSelectedSkill(null);
  }

  return(
    <>
      <Card
        sx={{ width: '100%', backgroundColor: 'elementBackground.main' }}
      >
        <CardContent>
          <Box mb={2}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>SKILLS & INDUSTRY EQUIVALENCY</Typography>
              <Tooltip title='Add Skill'>
                <IconButton color='primary' onClick={() => setDialogOpen(true)}>
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider/>
          </Box>
          {formik.values?.skills?.length > 0 && 
            <Box my={2}>
              <Typography variant='h6' align='center'>Proficiencies</Typography>
            </Box>
          }
          <Box display='flex' justifyContent='center'>
            {formatProficiencyData(formik.values.skills) &&
              formatProficiencyData(formik.values.skills)?.map(({ chartData, title, menuList }, index) => (
                <Box key={index} display='flex' flexDirection='column'>
                  <Box display='flex' justifyContent='center' flexWrap='wrap' overflow='auto'>
                    <Typography mr={1} mt={0.75}>{title}</Typography>
                    <IconButton
                      onClick={e => handleEditMenuClick(e, menuList)}
                      size='small'
                   >
                      <Edit color='primary' />
                   </IconButton>
                 </Box>
                 <Doughnut
                    data={chartData} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: true,
                      plugins: {
                        colors: {
                          enabled: true,
                          forceOverride: true
                        }
                      }
                    }}
                  />
                </Box>
              ))
            }
          </Box>
          {formik.values?.skills?.length > 0 && 
            <Box my={2}>
              <Typography variant='h6' align='center'>{'Months of Experience (Cumulative)'}</Typography>
            </Box>
          }
          {formik.values?.skills?.length > 0 &&
            <Box display='flex' justifyContent='center'>
              <Box width='70%' height='70%'>
                <Bar 
                  data={formatExperienceData(formik.values.skills)}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      colors: {
                        enabled: true,
                        forceOverride: true
                      },
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </Box>
            </Box>
          }
        </CardContent>
      </Card>
      <Menu
        anchorEl={editMenuAnchor}
        open={Boolean(editMenuAnchor)}
        onClose={handleEditMenuClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'elementBackground.main'
            }
          }
        }}
      >
        {
          menuList?.map(listitem => (
            <Box display='flex' justifyContent='space-between'>
              <Box p={1} ml={1}>
                <Typography>{listitem.name}</Typography>
              </Box>
              <Box display='flex' mx={1}>
                <Box>
                  <IconButton
                    onClick={() => handleEdit(listitem.id)}
                  >
                    <Edit color='primary' />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => handleDelete(listitem.id)}
                  >
                    <Delete color='secondary' />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Menu>
      {dialogOpen &&
        <SkillsEditor 
          skill={selectedSkill || {}}
          onSave={handleDialogSave}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default SkillsViewer;