import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/db';
import { Box, Button, Grid, Typography } from '@mui/material';
import PackageCard from './PackageCard';

// komponen untuk menampilkan rekomendasi paket perjalanan
const Recommendations = ({ title, showButton, excludeId }) => {
  // state untuk menyimpan data rekomendasi
  const [recommendations, setRecommendations] = useState([]);

  // mengambil data rekomendasi dari firestore
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tour-packages')); // ambil data dari koleksi 'tour-packages'
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // filter data supaya tidak termasuk package yang sedang ditampilkan
        if (excludeId) {
          data = data.filter((pkg) => pkg.id !== excludeId);
        }

        const shuffledData = data.sort(() => Math.random() - 0.5); // acak data rekomendasi
        const limitedData = shuffledData.slice(0, 4); // limit 4 data
        setRecommendations(limitedData); // set data rekomendasi ke state
      } catch (error) {
        console.error('Error fetching recommendation packages:', error);
      }
    };

    fetchRecommendations();
  }, [excludeId]);  

  return (
    <Box component='section'>
      <Box component='header' sx={{ m: 2 }}>
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 'bold',
            textAlign: 'center',
            m: 4
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: '90%', my: 4, mx: 'auto' }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          {recommendations.map(pkg => (
            <Grid key={pkg.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
              <PackageCard data={pkg} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {showButton && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button
            variant='contained'
            color='secondary'
            size='medium'
            href='/packages'
            sx={{ borderRadius: '30px' }}
          >
            Lihat Semua Paket Perjalanan
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Recommendations;
