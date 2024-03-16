import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';


const BackButtonChanges = ({onLeave, onCancel}) => {

    return(
        <Dialog open fullWidth>
            <DialogContent>
                <Box>
                    <Typography>Are you sure you want leave with Unsaved Changes?</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={onLeave}>Leave</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BackButtonChanges;
