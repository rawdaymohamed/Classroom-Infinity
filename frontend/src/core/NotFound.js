import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Button, Container, Typography } from '@mui/material';
const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h6'>
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant='contained' component={RouterLink} to='/'>
              Back Home
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img
              src='https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg'
              alt=''
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default NotFound;
