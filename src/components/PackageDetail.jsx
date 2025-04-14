import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const PackageDetail = ({ detail, schedules }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { packageId } = useParams();
  const handleClick = () => {
    navigate(`/packages/${packageId}/reservation`);
  };

  return (
    <Box sx={{ width: {xs: '100%', sm: '90%'}, mx: 'auto' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ px: 4, pt: 6 }}>
        <Grid size={{xs: 12, sm: 5}}>
          <img src={detail.imageUrl} alt="Package" style={{ width: '100%', borderRadius: '15px' }} />
        </Grid>
        <Grid size={{xs: 12, sm: 7}}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {detail.packageName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
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
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {schedules.map((item) => (
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
            </Stack>

            {selected && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 8 }}
                onClick={handleClick}
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
