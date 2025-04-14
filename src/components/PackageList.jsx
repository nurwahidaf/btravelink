import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/db";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import PackageCard from "./PackageCard";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tour-packages"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <CircularProgress />
        <Typography mt={2}>Memuat paket perjalanan...</Typography>
      </Box>
    );
  }

  return (
    <Box mt={4} mb={4} mx='auto' sx={{ width: '100%', px: 4 }}>
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
