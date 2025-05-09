import { useParams } from "react-router-dom";
import PackageDetail from "../components/PackageDetail";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/db";
import { Box, CircularProgress, Typography } from "@mui/material";

const Package = () => {
  const { packageId } = useParams();
  const [detail, setDetail] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, 'tour-packages', packageId);
        const docSnapshot = await getDoc(docRef);
        // Check if the document exists
        if (docSnapshot.exists()) {
          const packageData = docSnapshot.data();
          setDetail(packageData);

          const schedulesSnapshot = await getDocs(collection(db, 'tour-packages', packageId, 'schedules'));
          const schedulesData = schedulesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedules(schedulesData);
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

  if (loading) {
    return (
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <CircularProgress />
        <Typography mt={2}>Memuat paket perjalanan...</Typography>
      </Box>
    );
  }

  return (
    <>
      <PackageDetail detail={detail} schedules={schedules} />
    </>
  );
};

export default Package;