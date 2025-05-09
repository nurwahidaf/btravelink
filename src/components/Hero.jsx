import { Box, Button, Container, Typography } from "@mui/material";
import HeroImage from './../assets/images/heroImage.jpg';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClickHero = () => {
    if (user) {
      navigate('/packages');
    } else {
      navigate('/auth');
    }
  };

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
            sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' } }}
          >
            bTravelink
          </Typography>
          <Typography
            variant="h6"
            mb={4}
            color='text.light'
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.25rem' } }}
          >
            Enjoy the moment with us! <br/>
            Temukan pengalaman perjalanan yang tak terlupakan dengan bTravelink. 
            Bergabunglah dengan kami untuk menjelajahi keindahan dunia.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            sx={{ borderRadius: '30px' }}
            onClick={handleClickHero}
          >
            Mulai Perjalananmu
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
