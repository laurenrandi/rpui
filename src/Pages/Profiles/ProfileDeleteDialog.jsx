import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Divider, TextField, IconButton } from '@mui/material';


const ProfileDeleteDialog = ({ profileId, onDelete, onCancel}) => {

    return(
        <Dialog open fullWidth>
            <DialogContent>
                <Box>
                    <Typography>Are you sure you want to delete this Profile?</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={() => {onDelete(profileId)}}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileDeleteDialog;
