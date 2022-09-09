import * as React from 'react';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useInput from '../hooks/useInput';
import { login } from './api-auth';
import { authenticate } from './auth-helper';
const ErrorMsg = ({ error }) => {
  return (
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
  );
};
const Login = () => {
  const [passwordProps, resetPassword] = useInput('');
  const [emailProps, resetEmail] = useInput('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = () => {
    const user = {
      email: emailProps.value,
      password: passwordProps.value,
    };
    login(user).then((data) => {
      if (data && data.error) setError(data.error);
      else if (data) {
        authenticate(data, () => {
          setError('');
          setRedirect(true);
        });
      }
    });
  };
  if (redirect) return <Navigate to={'/'} />;
  return (
    <>
      <Card
        elevation={2}
        sx={{ maxWidth: 400, mx: 'auto', my: 2, textAlign: 'center', p: 1 }}
      >
        <CardContent>
          <Typography variant='h5' component='div' sx={{ mb: 3 }}>
            Login
          </Typography>
          <Box sx={{ mx: 'auto', maxWidth: 600 }}>
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
            {error && <ErrorMsg error={error} />}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button variant='contained' onClick={handleSubmit}>
            Login
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default Login;
