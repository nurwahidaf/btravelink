import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from './BackButton';

const PackageDetail = ({ detail, schedules }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { packageId } = useParams();
  
  const handleReservationClick = () => {
    navigate(`/packages/${packageId}/reservation`, {
      state: {
        packageId: packageId,
        packageName: detail.packageName,
        departureDate: schedules.find((schedule) => schedule.id === selected)?.departure.toDate().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        packagePrice: detail.price?.toLocaleString('id-ID'),
      }
    });
  };

  return (
    <Box sx={{ width: {xs: '100%', sm: '90%'}, mx: 'auto' }}>
      <BackButton />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ px: 4, pt: 2 }}>
        <Grid size={{xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={detail.imageUrl} alt="Package" style={{ width: '80%', borderRadius: '15px' }} />
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {detail.packageName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
            {detail.packageType}, {detail.tourCategory}, {detail.regionCategory}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {detail.description}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Harga mulai dari
            <Typography component='span' color='accent.highlight' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}> Rp{detail.price?.toLocaleString('id-ID')}</Typography>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Kursi yang Tersedia: 
            <Typography component="span" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
              {detail.availableSeats}
            </Typography>
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1">Pilih Jadwal Keberangkatan:</Typography>
            <Grid container spacing={2}>
              {schedules
                .slice()
                .sort((a, b) => a.departure.toDate() - b.departure.toDate())
                .map((item) => (
                <Button
                  key={item.id}
                  variant={selected === item.id ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setSelected(item.id)}
                  sx={{ borderRadius: 8, minWidth: 100, mb: 1 }}
                >
                  {item.departure.toDate().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </Button>
              ))}
            </Grid>

            {selected && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 8 }}
                onClick={handleReservationClick}
              >
                Lanjut ke Reservasi
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PackageDetail;
