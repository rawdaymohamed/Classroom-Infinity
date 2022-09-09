import * as React from 'react';
import useInput from '../hooks/useInput';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
import { Divider, Icon } from '@mui/material';
import { create } from './api-user';
const Signup = () => {
  const [nameProps, resetName] = useInput('');
  const [passwordProps, resetPassword] = useInput('');
  const [confirmPasswordProps, resetConfirmPassword] = useInput('');
  const [emailProps, resetEmail] = useInput('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (passwordProps.value !== confirmPasswordProps.value)
      setError("Password doesn't match");
    else {
      const user = {
        name: nameProps.value,
        email: emailProps.value,
        password: passwordProps.value,
      };

      create(user).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError('');
          setOpen(true);
          handleClickOpen();
        }
      });
    }
  };
  return (
    <>
      <Card
        elevation={2}
        sx={{ maxWidth: 400, mx: 'auto', my: 2, textAlign: 'center', p: 1 }}
      >
        <CardContent>
          <Typography variant='h5' component='div' sx={{ mb: 3 }}>
            Sign Up
          </Typography>
          <Box sx={{ mx: 'auto', maxWidth: 600 }}>
            <div>
              <FormControl sx={{ m: 1, width: '242px' }} variant='outlined'>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <OutlinedInput
                  id='name'
                  type='text'
                  {...nameProps}
                  position='end'
                  label='Name'
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '242px' }} variant='outlined'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  id='email'
                  type='email'
                  {...emailProps}
                  position='end'
                  label='Email'
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1 }} variant='outlined'>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <OutlinedInput
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...passwordProps}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1 }} variant='outlined'>
                <InputLabel htmlFor='confirm-password'>
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id='confirm-password'
                  type={showPassword ? 'text' : 'password'}
                  {...confirmPasswordProps}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Confirm Password'
                />
              </FormControl>
            </div>
            <br />
            {error && (
              <Typography
                component='p'
                color='error'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ErrorIcon color='error' sx={{ mr: '3px' }}>
                  error
                </ErrorIcon>
                {error}
              </Typography>
            )}
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button variant='contained' onClick={handleSubmit}>
            Sign Up
          </Button>
        </CardActions>
        <div>
          <Dialog open={open} disableBackdropClick={true} onClose={handleClose}>
            <DialogTitle>Account Created Successfully</DialogTitle>
            <DialogContent>
              <DialogContentText>Please Login</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' component={RouterLink} to='/login'>
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    </>
  );
};
export default Signup;
