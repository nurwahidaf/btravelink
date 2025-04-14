import { Box, Button, Container, Typography } from "@mui/material";
import HeroImage from './../assets/images/heroImage.jpg';

const Hero = () => {
  return (
    <>
      <Box
        color='text.light'
        sx={{ 
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
         }}
      >
        <Container maxWidth='md'>
          <Typography
            variant="h2"
            fontWeight='bold'
            color='text.light'
            mb={2}
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
          >
            bTravelink
          </Typography>
          <Typography
            variant="h6"
            mb={4}
            color='text.light'
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
          >
            Enjoy the moment with us!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            sx={{ borderRadius: '30px' }}
            href='/packages'
          >
            Lihat Paket Perjalanan
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
