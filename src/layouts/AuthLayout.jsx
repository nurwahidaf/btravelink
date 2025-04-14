import { Box } from '@mui/material';
import AuthImage from './../assets/images/authImage.svg';
import { Link, Outlet } from 'react-router-dom';
import LogoImage from './../assets/images/logoImage.png';

const AuthLayout = () => {
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          // overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <Link to='/'>
          <Box 
            component='img'
            src={LogoImage}
            alt='Logo'
            sx={{
              width: '180px',
              p: 2,
              cursor: 'pointer',
            }}
          />
        </Link>

        {/* Auth Content Layout */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: {
              xs: "column",
              md: "row",
            }
          }}
          >
          {/* Left - Image Section */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${AuthImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundOrigin: "content-box",
              height: "100%",
              px: {
                xs: 3,
                sm: 5,
                md: 8,
              },
            }}
            />

          {/* Right - Form Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              px: {
                xs: 3,
                sm: 5,
                md: 8,
              },
            }}
            >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
