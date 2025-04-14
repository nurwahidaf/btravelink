import { Box, Typography } from "@mui/material";
import InfoCard from "./InfoCard";
import benefits from './../utils/constants/benefits';
import services from './../utils/constants/services';

const About = () => {
  return (
    <>
      <Box component="section" sx={{ textAlign: 'center', p: 6, width: '80%', margin: '0 auto' }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            my: 2,
            mx: 'auto'
          }}
        >
          bTravelink adalah penyedia jasa tour & travel internasional yang menawarkan 
          perjalanan ibadah, open trip, hingga layanan MICE. Dengan pengalaman dan layanan 
          profesional, kami siap menemani perjalanan Anda ke berbagai destinasi dunia.
        </Typography>

        {/* Benefits Section */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mt: 6,
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Kenapa Memilih Kami?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          {benefits.map((benefit, index) => (
            <InfoCard key={index} data={benefit} />
          ))}
        </Box>

        {/* Services Section */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mt: 6,
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Layanan Kami
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          {services.map((service, index) => (
            <InfoCard key={index} data={service} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default About;
