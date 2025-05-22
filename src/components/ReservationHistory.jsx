import { useEffect, useState } from 'react';
import { useAuth } from './../hooks/useAuth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './../firebase/db';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CancellationModal from './modals/CancellationModal';

// komponen untuk menampilkan riwayat reservasi pengguna
const ReservationHistory = () => {
  // state untuk menyimpan data user
  const { user } = useAuth();

  // state untuk menyimpan data reservasi dan status loading
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // state untuk menangani modal pembatalan reservasi
  const [openCancellationModal, setOpenCancellationModal] = useState(false);
  // state untuk menyimpan ID reservasi yang dipilih
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  // mengambil data reservasi dari Firestore saat user sudah login
  useEffect(() => {
    if (user) {
      const fetchReservations = async () => {
        try {
          const response = query(
            collection(db, 'reservations'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc'),
          );

          const querySnapshot = await getDocs(response);
          const reservationsData = [];

          // menyimpan data reservasi ke dalam array object
          querySnapshot.forEach((doc) => {
            reservationsData.push({ id: doc.id, ...doc.data() });
          });

          setReservations(reservationsData);
        } catch (error) {  
          console.error('Error fetching reservations: ', error);
        } finally {
          setLoading(false);
        }
      };

      fetchReservations();
    }
  }, [user]);

  // jika data masih dimuat, tampilkan loading spinner
  if (loading) {
    return (
      <Box mt={4} display='flex' flexDirection='column' alignItems='center'>
        <CircularProgress />
        <Typography mt={2}>Memuat riwayat reservasi...</Typography>
      </Box>
    );
  }
  
  // fungsi untuk membuka modal pembatalan reservasi
  const handleCancellation = (reservationId) => {
    setSelectedReservationId(reservationId);
    setOpenCancellationModal(true);
  };

  return (
    <>
      <Box sx={{ width: '90%', mx: 'auto', p: 2, my: 4 }}>  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
                  <TableCell colSpan={5} align='center'>
                    <Typography variant='body1'>Tidak ada riwayat reservasi.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <TableRow
                    key={reservation.id}
                    hover
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 }, 
                      '& > td, & > th': { textAlign: 'center' },
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell>{reservation.packageName}</TableCell>
                    <TableCell>{reservation.departureDate}</TableCell>
                    <TableCell>{reservation.fullName}</TableCell>
                    <TableCell>{reservation.status}</TableCell>
                    <TableCell>
                      {reservation.status !== 'Dibatalkan' && (
                        <Button 
                          onClick={() => handleCancellation(reservation.id)} 
                          variant='outlined' 
                          color='error' 
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
              reservation.id === updateId ? { ...reservation, status: 'Dibatalkan' } : reservation
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
