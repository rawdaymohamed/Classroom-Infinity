import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { isAuthenticated, clearJWT } from '../auth/auth-helper';
import { remove } from './api-user';
import { Navigate, useParams } from 'react-router-dom';

const DeleteUser = () => {
  const [open, setOpen] = React.useState(false);
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const jwt = isAuthenticated();
  const { userId } = useParams();
  const deleteAccount = () => {
    remove(userId, jwt).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        clearJWT(() => console.log('deleted'));
        setRedirectToLogin(true);
      }
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (redirectToLogin) return <Navigate to='/' />;
  return (
    <div>
      <Typography component='h6'>Delete Account</Typography>
      <IconButton variant='outlined' onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure you want to delete your account?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            This action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={deleteAccount}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
