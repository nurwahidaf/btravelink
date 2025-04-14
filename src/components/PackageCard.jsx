import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PackageCard = ({ data }) => {
  const { imageUrl, packageName, packageType, price } = data;

  return (
    <>
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
          <CardMedia
            component="img"
            image={imageUrl}
            title={packageName}
            alt={packageName}
            sx={{
              objectFit: 'cover',
              width: '100%',
              height: { xs: 150, sm: 175, md: 200, lg: 'auto' },
            }}
          />
          <Link to={`/packages/${data.id}`}>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontSize:'1rem', fontWeight: 'bold' }}>
                {packageName}
              </Typography>
              <Typography variant="body2" color="text.dark" mb={1} sx={{ fontStyle: 'italic'}}>
                {packageType}
              </Typography>
              <Typography variant="h5" color="cta" mt={1} sx={{ fontSize:'1rem', fontWeight: 'bold' }}>
                Rp{price?.toLocaleString('id-ID')}
              </Typography>
            </CardContent>
          </Link>
        </Card>
    </>
  );
};

export default PackageCard;
