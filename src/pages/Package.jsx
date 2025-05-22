import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/db';
import { Box, CircularProgress, Typography } from '@mui/material';
import PackageDetail from '../components/PackageDetail';
import Recommendations from '../components/Recommendations';

// komponen untuk menampilkan detail paket perjalanan
const Package = () => {
  // ambil id paket dari URL
  const { packageId } = useParams();

  // state untuk menyimpan detail paket, jadwal, dan loading
  const [detail, setDetail] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // dimuat saat packageId berubah
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // ambil referensi dokumen paket berdasarkan packageId
        const docRef = doc(db, 'tour-packages', packageId);
        const docSnapshot = await getDoc(docRef);
        
        // cek apakah dokumen ada
        // jika ada, ambil data dan simpan ke state
        if (docSnapshot.exists()) {
          const packageData = docSnapshot.data();
          setDetail(packageData);

          // ambil jadwal dari subkoleksi 'schedules'
          const schedulesSnapshot = await getDocs(collection(db, 'tour-packages', packageId, 'schedules'));
          
          // jadwal disimpan dalam array
          const schedulesData = schedulesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedules(schedulesData); // simpan jadwal ke state
        } else {
          console.error('Package not found');
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [packageId]);

  // jika detail belum ada, tampilkan loading spinner
  if (loading) {
    return (
      <Box mt={4} display='flex' flexDirection='column' alignItems='center'>
        <CircularProgress />
        <Typography mt={2}>Memuat detail paket perjalanan...</Typography>
      </Box>
    );
  }

  return (
    <>
      <PackageDetail detail={detail} schedules={schedules} />
      <Recommendations title='Rekomendasi Paket Perjalanan Lainnya' excludeId={packageId} />
    </>
  );
};

export default Package;
