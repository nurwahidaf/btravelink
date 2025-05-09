import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "./../hooks/useAuth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./../firebase/db";
import CancellationModal from "./modals/CancellationModal";

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // State untuk menangani modal
  const [openCancellationModal, setOpenCancellationModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchReservations = async () => {
        try {
          const response = query(
            collection(db, "reservations"),
            where("userId", "==", user.uid),
            orderBy('createdAt', 'desc'),
          );

          const querySnapshot = await getDocs(response);
          const reservationsData = [];
          querySnapshot.forEach((doc) => {
            reservationsData.push({ id: doc.id, ...doc.data() });
          });
          setReservations(reservationsData);
        } catch (error) {  
          console.error("Error fetching reservations: ", error);
        } finally {
          setLoading(false);
        }
      }
      fetchReservations();
    }
  }, [user]);

  if (loading) {
    return (
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <CircularProgress />
        <Typography mt={2}>Memuat riwayat reservasi...</Typography>
      </Box>
    );
  }
  
  const handleCancellation = (reservationId) => {
    setSelectedReservationId(reservationId);
    setOpenCancellationModal(true);
  };

  return (
    <>
      <Box sx={{ p: 2, width: '90%', mx: 'auto', my: 4 }}>  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ '& > td, & > th': { fontWeight: 'bold', textAlign: 'center' } }}>
                <TableCell>Nama Paket Perjalanan</TableCell>
                <TableCell>Tanggal Keberangkatan</TableCell>
                <TableCell>Nama Peserta</TableCell>
                <TableCell>Status Reservasi</TableCell>
                <TableCell>Batalkan Reservasi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1">Tidak ada riwayat reservasi.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <TableRow
                    key={reservation.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '& > td, & > th': { textAlign: 'center' } }}
                  >
                    <TableCell>{reservation.packageName}</TableCell>
                    <TableCell>{reservation.departureDate}</TableCell>
                    <TableCell>{reservation.fullName}</TableCell>
                    <TableCell>{reservation.status}</TableCell>
                    <TableCell>
                      {reservation.status !== "Dibatalkan" && (
                        <Button 
                          onClick={() => handleCancellation(reservation.id)} 
                          variant="outlined" 
                          color="error" 
                          sx={{ textTransform: 'none' }}
                        >
                          Batalkan
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <CancellationModal 
        open={openCancellationModal}
        reservationId={selectedReservationId}
        onReservationCanceled={(updateId) => {
          setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation.id === updateId ? { ...reservation, status: "Dibatalkan" } : reservation
            )
          );
        }}
        onCloseCancellation={() => {
          setOpenCancellationModal(false);
          setSelectedReservationId(null);
        }}
      />
    </>
  );
};

export default ReservationHistory;
