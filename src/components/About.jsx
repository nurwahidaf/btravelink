import { Box, Typography } from '@mui/material';
import InfoCard from './InfoCard';
import benefits from './../utils/constants/benefits';
import services from './../utils/constants/services';
import payments from './../utils/constants/payments';

// komponen untuk menampilkan informasi tentang perusahaan
const About = () => {
  return (
    <Box 
      component='section' 
      sx={{ textAlign: 'center', margin: '0 auto', p: 6, width: {xs: '100%', md: '80%'} }}
    >
      <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 600, my: 2, mx: 'auto' }}>
        bTravelink adalah penyedia jasa tour & travel internasional yang menawarkan 
        perjalanan ibadah, open trip, hingga layanan MICE. Dengan pengalaman dan layanan 
        profesional, kami siap menemani perjalanan Anda ke berbagai destinasi dunia.
      </Typography>

      {/* benefits section */}
      <Typography 
        variant='h4' 
        sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 6, mb: 3 }}
      >
        Kenapa Memilih Kami?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        {benefits.map((benefit, index) => (
          <InfoCard key={index} data={benefit} />
        ))}
      </Box>

      {/* services section */}
      <Typography 
        variant='h4' 
        sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 6, mb: 3 }}
      >
        Layanan Kami
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        {services.map((service, index) => (
          <InfoCard key={index} data={service} />
        ))}
      </Box>

      {/* payments section */}
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 6, mb: 3 }}
      >
        Informasi Pembayaran
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        {payments.map((payment, index) => (
          <InfoCard key={index} data={payment} />
        ))}
      </Box>
    </Box>
  );
};

export default About;
