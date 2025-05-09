import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/db";
import { Box, Button, Grid, Typography } from "@mui/material";
import PackageCard from "./PackageCard";

const Recommendations = ({ title, showButton, excludeId}) => {
  // State untuk menyimpan data rekomendasi
  const [recommendations, setRecommendations] = useState([]);

  // Mengambil data rekomendasi dari Firestore
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tour-packages"));
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter data supaya tidak termasuk package yang sedang ditampilkan
        if (excludeId) {
          data = data.filter((pkg) => pkg.id !== excludeId);
        }

        // Acak data rekomendasi
        const shuffledData = data.sort(() => Math.random() - 0.5);
        // Limit ke 4 data
        const limitedData = shuffledData.slice(0, 4);
        // Set data rekomendasi ke state
        setRecommendations(limitedData);
      } catch (error) {
        console.error("Error fetching recommendation packages:", error);
      }
    };
    fetchRecommendations();
  }, [excludeId]);  

  return (
    <>
      <Box component="section">
        <Box component="header" sx={{ m: 2 }}>
          <Typography
            variant="h5"
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
              variant="contained"
              color="secondary"
              size="medium"
              sx={{ borderRadius: '30px' }}
              href='/packages'
            >
              Lihat Semua Paket Perjalanan
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Recommendations;
