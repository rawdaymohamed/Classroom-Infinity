import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth-helper';
import { read } from './api-user';
import {
  Divider,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import ErrorIcon from '@mui/icons-material/Error';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = React.useState({ following: [], followers: [] });

  const [redirectToSignin, setRedirectToSignin] = React.useState(false);
  const [error, setError] = React.useState(null);
  const photoUrl = `/api/users/${userId}/photo`;
  const jwt = isAuthenticated();
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(userId, jwt, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else if (data) {
        setUser(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [userId, jwt]);

  if (redirectToSignin) return <Navigate to='/login' />;

  return (
    <>
      {user && (
        <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', padding: 3 }}>
          <Typography variant='h5'>Profile</Typography>
          <List dense>
            <ListItem sx={{ mb: 2 }}>
              <ListItemAvatar>
                <Avatar
                  alt={`${user.name} profile`}
                  src={photoUrl}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {isAuthenticated().user &&
                isAuthenticated().user._id == user._id && (
                  <ListItemSecondaryAction>
                    {
                      <IconButton
                        to={`/users/${user._id}/profile/edit`}
                        component={RouterLink}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                    {
                      <IconButton
                        to={`/users/${user._id}/profile/delete`}
                        component={RouterLink}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  </ListItemSecondaryAction>
                )}
            </ListItem>

            <Divider />
            {user.about && (
              <ListItem>
                <ListItemText primary={user.about} />
              </ListItem>
            )}
            <ListItem>
              <ListItemText
                primary={'Joined: ' + new Date(user.created).toDateString()}
              />
            </ListItem>
          </List>

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
        </Paper>
      )}
    </>
  );
};
export default Profile;
