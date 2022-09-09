import * as React from 'react';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Avatar from '@mui/material/Avatar';
import { read, update } from './api-user';
import { isAuthenticated } from '../auth/auth-helper';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const EditProfile = () => {
  const { userId } = useParams();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [about, setAbout] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const [redirectToProfile, setRedirectToProfile] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState('');

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setPhotoUrl(`/api/users/${userId}/photo`);
    const abortController = new AbortController();
    const signal = abortController.signal;

    const jwt = isAuthenticated();
    if (!jwt) {
      setRedirectToLogin(true);
    } else {
      read(userId, jwt, signal).then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else if (data) {
          setName(data.name);
          setEmail(data.email);
          data.about && setAbout(data.about);
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);
  const handleSubmit = () => {
    let userData = new FormData();
    name && userData.append('name', name);
    email && userData.append('email', email);
    password && userData.append('password', password);
    about && userData.append('about', about);
    photo && userData.append('photo', photo);

    const jwt = isAuthenticated();
    if (!jwt) {
      setRedirectToLogin(true);
    } else {
      update(userId, jwt, userData).then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else if (data) {
          setError('');
          setRedirectToProfile(true);
        }
      });
    }
  };
  if (redirectToLogin) return <Navigate to='/signin' />;
  if (redirectToProfile) return <Navigate to={`/users/${userId}/profile`} />;
  return (
    <>
      <Card
        sx={{ maxWidth: 600, mx: 'auto', my: 2, textAlign: 'center', p: 1 }}
      >
        <CardContent>
          <Typography variant='h6' component='div' sx={{ mb: 1 }}>
            Edit Profile
          </Typography>
          <Box sx={{ mx: 'auto', maxWidth: 600 }}>
            <div>
              <Avatar
                alt={`${name} avatar`}
                src={photoUrl}
                sx={{ mx: 'auto', mb: 2, width: 60, height: 60 }}
              />
              <Button
                variant='outlined'
                size='small'
                sx={{ mb: 2 }}
                component='label'
              >
                Upload <FileUploadIcon />
                <input
                  hidden
                  accept='image/*'
                  onChange={(e) => setPhoto(e.target.files[0])}
                  type='file'
                />
              </Button>
              <span>{photo ? photo.name : ''}</span>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '266px' }} variant='outlined'>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <OutlinedInput
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  position='end'
                  label='Name'
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '266px' }} variant='outlined'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  position='end'
                  label='Email'
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '266px' }} variant='outlined'>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <OutlinedInput
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <FormControl sx={{ m: 1, width: '266px' }} variant='outlined'>
              <TextField
                id='about'
                label='about'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                multiline
                rows={4}
                variant='outlined'
              />
            </FormControl>
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
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default EditProfile;
