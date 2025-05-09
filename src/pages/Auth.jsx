import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from './../assets/images/LogoImage.png';
import AuthImage from './../assets/images/AuthImage.svg';
import AuthHeader from './../components/AuthHeader';
import AuthForm from './../components/AuthForm';

// Halaman autentikasi untuk menampilkan gambar dan form login
const Auth = () => {
  return (
    <Box>
      <Link to='/'>
        <Box 
          component='img' src={LogoImage} alt='Logo bTravelink'
          sx={{ width: '180px', p: 2, cursor: 'pointer' }}
        />
      </Link>
      <Box sx={{ pt: 2, pb: 4, px: 4 }}>
        <Grid
          container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: { xs: 2} }}>
            <Box 
              component='img' src={AuthImage} alt='Authentication Image'
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxWidth: { xs: '75%', sm: '55%', md: '95%' },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AuthHeader
              textAuthTitle={`Welcome Traveler, \nEnjoy The Moment with Us!`}
              textAuthSubtitle='Login to continue your journey'
            />
            <AuthForm />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Auth;
