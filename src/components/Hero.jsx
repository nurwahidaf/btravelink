import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Button, Container, Typography } from '@mui/material';
import HeroImage from './../assets/images/heroImage.jpg';

// komponen untuk menampilkan hero section
const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // fungsi untuk menangani klik pada tombol hero
  const handleClickHero = () => {
    if (user) {
      navigate('/packages'); // jika user sudah login, arahkan ke halaman paket
    } else {
      navigate('/auth'); // jika user belum login, arahkan ke halaman auth
    }
  };

  return (
    <Box
      color='text.light'
      sx={{ 
        minHeight: '100vh',
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h2'
          fontWeight='bold'
          color='text.light'
          sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }, mb: 2 }}
        >
          bTravelink
        </Typography>
        <Typography
          variant='h6'
          color='text.light'
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.25rem' }, mb: 4 }}
        >
          Enjoy the moment with us! <br/>
          Temukan pengalaman perjalanan yang tak terlupakan dengan bTravelink. 
          Bergabunglah dengan kami untuk menjelajahi keindahan dunia.
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          size='medium'
          onClick={handleClickHero}
          sx={{ borderRadius: '30px' }}
        >
          Mulai Perjalananmu
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
