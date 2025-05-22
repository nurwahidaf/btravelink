import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/db';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import PackageCard from './PackageCard';

// komponen untuk menampilkan daftar paket perjalanan
const PackageList = () => {
  // state untuk menyimpan data paket perjalanan dan status loading
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // mengambil data paket perjalanan dari firestore
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tour-packages')); // ambil data dari koleksi 'tour-packages'
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // jika data masih dimuat, tampilkan loading spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Memuat paket perjalanan...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: { xs: '100%', md: '90%'}, mt: 4, mb: 4, mx: 'auto', px: 4 }} >
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        {packages.map(pkg => (
          <Grid key={pkg.id} size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
            <PackageCard data={pkg} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PackageList;
