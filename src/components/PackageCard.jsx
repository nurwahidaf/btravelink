import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// komponen untuk menampilkan kartu paket perjalanan
const PackageCard = ({ data }) => {
  // destructuring data dari props
  const { imageUrl, packageName, packageType, price } = data;

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 1
      }}
    >
      <Link to={`/packages/${data.id}`}>
        <CardMedia
          component='img'
          image={imageUrl}
          title={packageName}
          alt={packageName}
          sx={{
            width: '100%',
            objectFit: 'cover',
            height: { xs: 150, sm: 175, md: 200, lg: 'auto' },
          }}
        />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography component='div' variant='h5' gutterBottom sx={{ fontSize:'1rem', fontWeight: 'bold' }}>
            {packageName}
          </Typography>
          <Typography variant='body2' sx={{ mb: 1, fontStyle: 'italic' }}>
            {packageType}
          </Typography>
          <Typography variant='h5' color='accent.highlight' sx={{ fontSize:'1rem', fontWeight: 'bold', mt: 1 }}>
            Rp{price?.toLocaleString('id-ID')}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PackageCard;
