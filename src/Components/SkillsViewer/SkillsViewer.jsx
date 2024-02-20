import React, { useState, useEffect } from 'react';
import { Edit, Add, Delete } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Tooltip as ttip , Legend, Chart, Colors } from 'chart.js';
import SkillsEditor from '../SkillsEditor/SkillsEditor';

Chart.register(ArcElement, ttip, Legend, Colors);

const equivalencyColors = [
  '#FFC9B5',
  '#F7B1AB',
  '#D8AA96',
  '#807182',
  '#C7D3BF'
];

const SkillsViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMenuAnchor, setEditMenuAnchor] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSave = (skills) => {
    formik.setFieldValue('skills', skills);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const formatData = (skills) => {
    if(skills) {
      const groupedData = Object.groupBy(formik.values?.skills, ({ type }) => type);
      const sets = [];
      for(let i = 0; i < Object.keys(groupedData).length; i++) {
        const currentSet = groupedData[Object.keys(groupedData)[i]];
        sets[i] = {};
        sets[i].chartData = {};
        sets[i].chartData.labels = currentSet.map(skill => skill.name);
        sets[i].chartData.datasets = [{}];
        sets[i].chartData.datasets[0].data = currentSet.map(skill => skill.proficiency);
        sets[i].chartData.datasets[0].label = 'Proficiency'
        sets[i].chartData.datasets[0].hoverOffset = 4;
        sets[i].chartData.datasets[0].borderWidth = 1;
        sets[i].title = Object.keys(groupedData)[i];
        sets[i].menuList = currentSet.map(skill => ({ id: skill.id, name: skill.name }));
      };
      return sets;
    }
    return null;
  };

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
          {formatData(formik.values.skills) &&
            formatData(formik.values.skills)?.map((data, index) => (
              <Box key={index} display='flex' flexDirection='column'>
                <Box display='flex' justifyContent='center' flexWrap='wrap' overflow='auto'>
                  <Typography mr={1} mt={0.75}>{data.title}</Typography>
                  <IconButton
                    onClick={e => handleEditMenuClick(e, data.menuList)}
                    size='small'
                  >
                    <Edit color='primary' />
                  </IconButton>
                </Box>
                <Doughnut
                  data={data.chartData} 
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
          {/* {formik.values?.skills?.length > 0 &&
            <>
              <Box mt={4} mb={2}>
                <Typography variant='h6' align='center'>Industry Equivalencies</Typography>
                <Box display='flex' justifyContent='center'>
                  <Typography variant='caption' align='center'><i>(in Months)</i></Typography>
                </Box>
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center'flexWrap='wrap'>
                {formik.values.skills.sort((a,b) => b.months - a.months).map((skill, index) => (
                  <Box display='flex' flexDirection='column' key={index}>
                    <Box
                      display='flex' 
                      justifyContent='center' 
                      alignItems='center'
                      borderRadius='50%'
                      mx={5}
                      sx={{border: `3px solid ${equivalencyColors[index % equivalencyColors.length]}`}}
                    >
                      <Box 
                        p={1} 
                        minWidth={skill.months > 25 ? 100 : 75 + skill.months} 
                        minHeight={skill.months > 25 ? 100 : 75 + skill.months}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <Typography>{skill.months}</Typography>
                      </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                      <Typography variant='caption'>{skill.name}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          } */}
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