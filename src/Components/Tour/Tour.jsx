import React, { useEffect, useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useTour } from '@reactour/tour';
import { steps as profileSteps } from './Steps/Profiles';
import { steps as editorSteps } from './Steps/ProfileEditor';
import { steps as userSteps } from './Steps/Users';

const Tour = ({ onStart, variant }) => {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  useEffect(() => {
    switch (variant) {
      case 'profiles':
        setSteps(profileSteps);
        break;
      case 'profileEditor':
        setSteps(editorSteps);
        break;
      case 'users':
        setSteps(userSteps);
        break;
      default:
        setSteps([]);
        break;
    }
  }, [variant]);

  const handleStart = () => {
    if(onStart) {
      onStart();
    }
    setCurrentStep(0);
    setIsOpen(true);
  };

  return(
    <Tooltip title='Feature tour'>
      <Fab 
        color='primary'
        size='small'
        sx={{
          margin: 0,
          top: 'auto',
          left: 'auto',
          bottom: 20,
          right: 20,
          position: 'fixed',
        }}
        onClick={handleStart}
      >
        <QuestionMarkIcon />
      </Fab>
    </Tooltip>
  );
};

export default Tour;